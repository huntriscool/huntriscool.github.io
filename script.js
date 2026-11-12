// =========================================================
// Matthew Justic portfolio: tiny bit of vanilla JavaScript
// Four jobs: mobile menu, active nav link, fade-in, footer year.
// =========================================================

// ---------- 1. Mobile menu ----------
const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#nav-links');

function setMenu(open) {
  navLinks.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
}

toggle.addEventListener('click', () => {
  setMenu(toggle.getAttribute('aria-expanded') !== 'true');
});

// Close the menu after picking a link, or when pressing Escape
navLinks.addEventListener('click', (e) => {
  if (e.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMenu(false);
});

// ---------- 2. Highlight the nav link for the section on screen ----------
const sections = document.querySelectorAll('main section[id]');
const links = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((link) => {
      const isActive = link.getAttribute('href') === '#' + entry.target.id;
      link.classList.toggle('active', isActive);
      if (isActive) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-45% 0px -50% 0px' }); // a section counts as "current" when it crosses the middle of the screen

sections.forEach((section) => navObserver.observe(section));

// ---------- 3. Fade-in on scroll ----------
// (CSS already disables this for people who prefer reduced motion)
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // only animate once
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ---------- 4. Footer year ----------
document.querySelector('#year').textContent = new Date().getFullYear();
