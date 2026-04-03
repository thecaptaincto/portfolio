/* ============================================================
   captaincto portfolio — main.js
   ============================================================ */

const THEME_KEY = 'cto-theme';
const root = document.documentElement;

/* ---- THEME ---- */

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  syncThemeBtn(theme);
}

function syncThemeBtn(theme) {
  const btn = document.getElementById('themeBtn');
  if (!btn) return;
  const isDark = theme === 'dark';
  btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  const sun  = btn.querySelector('.icon-sun');
  const moon = btn.querySelector('.icon-moon');
  if (sun)  sun.style.display  = isDark ? 'block' : 'none';
  if (moon) moon.style.display = isDark ? 'none'  : 'block';
}

// Apply saved or system preference immediately to avoid flash
(function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const theme = saved
    ? saved
    : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);
})();

/* ---- DOM READY ---- */

document.addEventListener('DOMContentLoaded', () => {

  /* Theme button */
  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    const current = root.getAttribute('data-theme') || 'light';
    syncThemeBtn(current);
    themeBtn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  /* Mobile nav */
  const navToggle = document.getElementById('navToggle');
  const navDrawer = document.getElementById('navDrawer');

  function closeNav() {
    if (!navToggle || !navDrawer) return;
    navToggle.classList.remove('open');
    navDrawer.classList.remove('open');
    document.body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && navDrawer) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navDrawer.classList.contains('open');
      if (isOpen) {
        closeNav();
      } else {
        navToggle.classList.add('open');
        navDrawer.classList.add('open');
        document.body.classList.add('nav-open');
        navToggle.setAttribute('aria-expanded', 'true');
      }
    });

    navDrawer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navDrawer.contains(e.target)) {
        closeNav();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* Scroll progress */
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    const updateProgress = () => {
      const scrolled  = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct       = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
      progressBar.style.width = pct + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* Reveal on scroll */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.07,
      rootMargin: '0px 0px -32px 0px',
    });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

});
