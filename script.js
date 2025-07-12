const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

navButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const target = btn.getAttribute('href').substring(1);
    sections.forEach(sec => {
      if (sec.id === target) {
        sec.classList.remove('hidden');
      } else {
        sec.classList.add('hidden');
      }
    });
  });
});

// Optional: fallback for autoplay blocked by browsers
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bg-audio');
  if (audio && audio.paused) {
    audio.play().catch(() => {
      console.log('Autoplay blocked — user must interact');
    });
  }
});

// Dummy signup
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('signup-message').textContent = 'Thanks! (This is a demo.)';
  });
}

// Close a section
function closeSection(sectionId) {
  document.getElementById(sectionId).classList.add("hidden");

  // Show the main menu again if it was hidden
  const mainMenu = document.getElementById("main-menu");
  if (mainMenu) {
    mainMenu.classList.remove("hidden");
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
        closeSection('contact');
        document.getElementById('thank-you-modal').classList.remove('hidden');
      } else {
        alert("Something went wrong. Please try again later.");
      }
    });
  });
});
