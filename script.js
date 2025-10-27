// Mobile menu toggle
const toggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.navbar nav');
toggle?.addEventListener('click', () => {
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});

// Sticky navbar style + back-to-top button
const navbar = document.getElementById('navbar');
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  const y = window.scrollY || document.documentElement.scrollTop;
  navbar.classList.toggle('scrolled', y > 10);
  toTop.classList.toggle('show', y > 350);
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Smooth internal link scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.innerWidth <= 1000) nav.style.display = 'none';
  });
});

// Reveal-on-scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible'));
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Scroll spy (active nav link)
const sections = [...document.querySelectorAll('section')];
const links = [...document.querySelectorAll('.nav-link')];
const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0.01 });
sections.forEach(s => spy.observe(s));
