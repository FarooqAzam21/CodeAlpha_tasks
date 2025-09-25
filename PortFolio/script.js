// Smooth reveal using IntersectionObserver
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('inview');
  });
}, { threshold: 0.12 });

reveals.forEach(r => io.observe(r));

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
navToggle.addEventListener('click', () => navList.classList.toggle('show'));

// Update year
document.getElementById('year').textContent = new Date().getFullYear();

// Download CV button (replace path with your PDF)
document.getElementById('downloadCV').addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = 'Your_CV.pdf'; // put your CV in project root or change path
  link.download = 'YourName_CV.pdf';
  link.click();
});

// Optional: simple form validation before letting mailto open
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  // browser will open mail client using action="mailto:..."
  // optionally validate fields here
});
