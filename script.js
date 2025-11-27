const sections = document.querySelectorAll(".section");

document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded and DOM fully parsed");

  const logo = document.getElementById("menu-logo");
  const radialMenu = document.getElementById("radial-menu");
  const navLinks = document.querySelectorAll(".nav-btn"); // moved inside

  // Toggle radial menu visibility
  logo.addEventListener("click", () => {
    radialMenu.classList.toggle("open");
    console.log("Menu toggled:", radialMenu.classList.contains("open"));
    if(radialMenu.classList.contains("open")){
      openRadialMenu();
    } else {
      closeRadialMenu();
    }
  });

  // Handle nav link clicks
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");

      // External links (starting with http) should NOT be handled
      if (href.startsWith("http")) {
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

function openRadialMenu() {
  const radialMenu = document.getElementById("radial-menu");
  const buttons = radialMenu.querySelectorAll(".nav-btn");
  let radius;
  if (window.innerWidth <= 480) radius = 110;    // small phones
  else radius = 140;                             // desktop

  const centerX = 0; // center of radial-menu (top-left of container)
  const centerY = 0;

  const total = buttons.length;
  buttons.forEach((btn, i) => {
    const angle = (i / total) * 2 * Math.PI - Math.PI/2; // start from top
    const x = centerX + radius * Math.cos(angle) - btn.offsetWidth/2;
    const y = centerY + radius * Math.sin(angle) - btn.offsetHeight/2;

    btn.style.left = `${centerX - btn.offsetWidth / 2}px`;
    btn.style.top = `${centerY - btn.offsetHeight / 2}px`;
    btn.style.opacity = 0;

    setTimeout(() => {
      btn.style.transition = "left 0.5s ease, top 0.5s ease, opacity 0.5s ease";
      btn.style.left = `${x}px`;
      btn.style.top = `${y}px`;
      btn.style.opacity = 1;
    }, 50 + i * 50); // stagger for nice effect
  });
}

function closeRadialMenu() {
  const radialMenu = document.getElementById("radial-menu");
  const buttons = radialMenu.querySelectorAll(".nav-btn");

  buttons.forEach((btn, i) => {
    // Animate back to center
    btn.style.transition = "left 0.5s ease, top 0.5s ease, opacity 0.5s ease";
    btn.style.left = `${-btn.offsetWidth / 2}px`;
    btn.style.top = `${-btn.offsetHeight / 2}px`;
    btn.style.opacity = 0;

    // Optional: remove inline styles after animation so re-opening works cleanly
    btn.addEventListener("transitionend", function handler() {
      btn.style.transition = "";
      btn.removeEventListener("transitionend", handler);
    });
  });
}

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
