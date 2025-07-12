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


// Close a section
function closeSection(sectionId) {
  document.getElementById(sectionId).classList.add("hidden");

  // Show the main menu again
  document.getElementById("home").classList.remove("hidden");
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
    closeSection('signup');
    document.getElementById('signup-success-modal').classList.remove('hidden');
  }
});
