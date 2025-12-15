const sections = document.querySelectorAll(".section");

document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded and DOM fully parsed");

  const navLinks = document.querySelectorAll(".nav-btn"); // moved inside

  // Handle nav link clicks
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");

      // Only handle relative links
      if (!href.startsWith("#")) {
        return; // Allow normal navigation
      }

      e.preventDefault();

      const targetId = href.substring(1);
      showSection(targetId);

      // Update URL
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

function closeSection(id) {
  document.getElementById(id).classList.add("hidden");
  hideForm(id+"-form");
  showSection("home");
  history.pushState(null, "", "#home");
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

function handleSubmit(id) {
  const honeypot = document.getElementById(id+"-honeypot").value;
  if (honeypot !== "") return false; // bot

  const submitBtn = document.getElementById(id+"-btn")
  submitBtn.disabled = true;
  submitBtn.textContent = "SUBMITTING...";

  // Submission handled in iframe
  return true;
}

document.getElementById('signup_hidden_iframe').addEventListener('load', function() {
  const form = document.getElementById('mailing-list-form');
  const name = form.querySelector("#signup-name").value;
  const email = form.querySelector("#signup-email").value;
  if (name !== "" && email != "") {
    form.reset();
    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = false;
    submitBtn.textContent = "SUBSCRIBE";
    closeSection('signup', false);
    document.getElementById('signup-success-modal').classList.remove('hidden');
  }
});

document.getElementById('contact_hidden_iframe').addEventListener('load', function() {
  const form = document.getElementById('contact-form');
  const name = form.querySelector("#contact-name").value;
  const email = form.querySelector("#contact-email").value;
  const message = form.querySelector("#contact-message").value;

  if (name !== "" && email != "" && message != "") {
    form.reset();
    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = false;
    submitBtn.textContent = "SEND MESSAGE";
    closeSection('contact', false);
    document.getElementById('thank-you-modal').classList.remove('hidden');
  }
});

const burger = document.getElementById('burger');
const sidenav = document.getElementById('sidenav');
const logo = document.getElementById('mac-logo');

burger.addEventListener('click', () => {
  const isOpen = sidenav.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  logo.classList.toggle('nav-open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
});

function hideForm(id) {
  const container = document.getElementById(id);
  const form = container.querySelector('form');
  
  if (form) {
    form.reset();
    // Disable all form controls
    [...form.elements].forEach(el => el.disabled = true);
  }
  
  container.style.display = 'none';
}

function showForm(id) {
  const container = document.getElementById(id);
  const form = container.querySelector('form');

  container.style.display = 'flex';

  // Re-enable controls
  [...form.elements].forEach(el => el.disabled = false);
}
