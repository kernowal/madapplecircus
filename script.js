console.log("Script loaded")
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-btn");
document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded and DOM fully parsed");
  
  // Handle nav link clicks
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      showSection(targetId);
  
      // Update URL without reloading
      history.pushState(null, "", `#${targetId}`);
    });
  });

  // Handle back/forward browser buttons
  window.addEventListener("popstate", () => {
    const hash = window.location.hash.substring(1) || "home";
    console.log("Back/forward navigation detected:", hash);
    showSection(hash);
  });

  // Handle direct loading with a hash (e.g. #shop)
  const initialHash = window.location.hash.substring(1);
  if (initialHash) {
    console.log("Page loaded with hash:", initialHash);
    showSection(initialHash);
  } else {
    console.log("Page loaded without hash; showing home");
    showSection("home");
  }
});

function showSection(sectionId) {
  console.log(`Navigating to section: #${sectionId}`);

  // Hide all sections
  sections.forEach(section => section.classList.add("hidden"));

  // Show the selected section
  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.remove("hidden");
    console.log(`Section #${sectionId} shown`);
  } else {
    console.warn(`Section #${sectionId} not found`);
  }

  // Always hide the home screen unless going to home
  if (sectionId !== "home") {
    document.getElementById("home").classList.add("hidden");
  } else {
    document.getElementById("home").classList.remove("hidden");
  }
}

// Optional: fallback for autoplay blocked by browsers
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bg-audio');
  if (audio && audio.paused) {
    audio.play().catch(() => {
      console.log('Autoplay blocked — user must interact');
    });
  }
});


// // Close a section
// function closeSection(sectionId, reload_home) {
//   document.getElementById(sectionId).classList.add("hidden");

//   // Show the main menu again
//   if (reload_home) {
//     document.getElementById("home").classList.remove("hidden");
//   }
// }
function closeSection(id, reload_home = false) {
  document.getElementById(id).classList.add("hidden");
  if (reload_home) {
    showSection("home");
    history.pushState(null, "", "#home");
  }
}

// Thank you modal
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('#contact form');
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        form.reset();
        closeSection('contact', false);
        document.getElementById('thank-you-modal').classList.remove('hidden');
      } else {
        alert("Something went wrong. Please try again later.");
      }
    });
  });
});

function handleSubmit() {
  const honeypot = document.getElementById("honeypot").value;
  if (honeypot !== "") return false; // bot

  const submitBtn = document.querySelector("#mailing-list-form button");
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  // Submission handled in iframe
  return true;
}

document.getElementById('hidden_iframe').addEventListener('load', function() {
  const form = document.getElementById('mailing-list-form');
  const name = form.querySelector("#name").value;
  const email = form.querySelector("#email").value;
  if (name !== "" & email != "") {
    form.reset();
    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = false;
    submitBtn.textContent = "Subscribe";
    closeSection('signup', false);
    document.getElementById('signup-success-modal').classList.remove('hidden');
  }
});
