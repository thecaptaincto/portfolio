// ================================================
// CAPTAINCTO PORTFOLIO - MAIN JAVASCRIPT
// Night city · Performance-focused
// ================================================

function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function safeInit(name, initFn) {
    try {
        initFn();
    } catch (error) {
        console.error(`[init:${name}]`, error);
    }
}

class Navigation {
    constructor() {
        this.nav = document.getElementById('mainNav');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');

        if (this.nav && this.navToggle && this.navMenu) {
            this.init();
        }
    }

    init() {
        this.navToggle.setAttribute('aria-expanded', 'false');

        this.navToggle.addEventListener('click', () => {
            const isOpen = this.navMenu.classList.toggle('active');
            this.navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            document.body.classList.toggle('menu-open', isOpen);
        });

        this.navLinks.forEach((link) => {
            link.addEventListener('click', () => this.closeMenu());
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') this.closeMenu();
        });

        document.addEventListener('click', (event) => {
            if (!this.navMenu.classList.contains('active')) return;
            if (!this.nav.contains(event.target)) this.closeMenu();
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) this.closeMenu();
        }, { passive: true });
    }

    setScrolled(scrolled) {
        this.nav.classList.toggle('scrolled', scrolled);
    }

    closeMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
    }
}

class ScrollProgress {
    constructor() {
        this.progressBar = document.getElementById('scrollProgress');
    }

    update(scrollY) {
        if (!this.progressBar) return;
        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - doc.clientHeight;
        const percent = scrollable > 0 ? clamp((scrollY / scrollable) * 100, 0, 100) : 0;
        this.progressBar.style.width = `${percent}%`;
        // Hide the bar at the very top so the gradient edge doesn't show
        this.progressBar.style.opacity = percent > 0.5 ? '1' : '0';
    }
}

class Skyline {
    constructor() {
        this.buildings = Array.from(document.querySelectorAll('.building'));
        this.windowLightsContainer = document.querySelector('.window-lights');
        this.reducedMotion = prefersReducedMotion();

        if (this.buildings.length > 0 && this.windowLightsContainer) {
            this.generateWindowLights();
        }
    }

    generateWindowLights() {
        this.buildings.forEach((building) => {
            const x = parseFloat(building.getAttribute('x'));
            const y = parseFloat(building.getAttribute('y'));
            const width = parseFloat(building.getAttribute('width'));
            const height = parseFloat(building.getAttribute('height'));

            const windowsX = Math.floor(width / 15);
            const windowsY = Math.floor(height / 20);

            for (let i = 0; i < windowsX; i += 1) {
                for (let j = 0; j < windowsY; j += 1) {
                    if (Math.random() > 0.42) {
                        const windowNode = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                        windowNode.setAttribute('x', x + (i * 15) + 5);
                        windowNode.setAttribute('y', y + (j * 20) + 8);
                        windowNode.setAttribute('width', '4');
                        windowNode.setAttribute('height', '6');
                        windowNode.setAttribute('class', 'window-light');
                        this.windowLightsContainer.appendChild(windowNode);
                    }
                }
            }
        });
    }

    update(scrollY) {
        if (this.reducedMotion) return;
        this.buildings.forEach((building) => {
            const speed = parseFloat(building.getAttribute('data-speed')) || 0.3;
            building.style.transform = `translateY(${-(scrollY * speed * 0.4)}px)`;
        });
    }
}

class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles');
        this.count = prefersReducedMotion() ? 0 : (window.innerWidth < 768 ? 12 : 24);

        if (this.container && this.count > 0) {
            this.init();
        }
    }

    init() {
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < this.count; i += 1) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const size = (2 + Math.random() * 3).toFixed(2);
            const delay = (Math.random() * 16).toFixed(2);
            const duration = (18 + Math.random() * 12).toFixed(2);
            const drift = (-80 + Math.random() * 160).toFixed(2);

            particle.style.left = `${(Math.random() * 100).toFixed(2)}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.setProperty('--drift', `${drift}px`);

            fragment.appendChild(particle);
        }

        this.container.appendChild(fragment);
    }
}

class SectionReveal {
    constructor() {
        this.sections = document.querySelectorAll('.section-reveal');
        if (this.sections.length > 0) this.init();
    }

    init() {
        if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
            this.sections.forEach((s) => s.classList.add('revealed'));
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('revealed');
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

        this.sections.forEach((s) => observer.observe(s));
    }
}

class SkillBars {
    constructor() {
        this.skillFills = document.querySelectorAll('.skill-fill');
        this.skillSection = document.getElementById('skills-preview') || document.querySelector('.skills-categories');

        if (this.skillFills.length > 0 && this.skillSection) {
            this.init();
        }
    }

    init() {
        const revealSkills = () => {
            this.skillFills.forEach((fill, index) => {
                const value = fill.getAttribute('data-skill') || '0';
                const delay = prefersReducedMotion() ? 0 : index * 100;
                window.setTimeout(() => {
                    fill.style.setProperty('--skill-width', `${value}%`);
                    fill.classList.add('animated');
                }, delay);
            });
        };

        if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
            revealSkills();
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            if (!entries.some((e) => e.isIntersecting)) return;
            revealSkills();
            obs.disconnect();
        }, { threshold: 0.2 });

        observer.observe(this.skillSection);
    }
}

class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        if (this.links.length > 0) this.init();
    }

    init() {
        this.links.forEach((link) => {
            link.addEventListener('click', (event) => {
                const href = link.getAttribute('href');
                if (!href || href === '#' || href === '#!') return;
                const target = document.querySelector(href);
                if (!target) return;
                event.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
            });
        });
    }
}

class ProjectCards {
    constructor() {
        this.cards = document.querySelectorAll('.project-card');
        this.isTouch = window.matchMedia('(pointer: coarse)').matches;
        if (!this.isTouch && this.cards.length > 0) this.init();
    }

    init() {
        this.cards.forEach((card) => {
            let rafId = null;
            let mouseX = 50;
            let mouseY = 50;

            const update = () => {
                card.style.setProperty('--mouse-x', `${mouseX}%`);
                card.style.setProperty('--mouse-y', `${mouseY}%`);
                rafId = null;
            };

            card.addEventListener('pointermove', (event) => {
                const rect = card.getBoundingClientRect();
                mouseX = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
                mouseY = clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100);
                if (rafId === null) rafId = window.requestAnimationFrame(update);
            });

            card.addEventListener('pointerleave', () => {
                card.style.setProperty('--mouse-x', '50%');
                card.style.setProperty('--mouse-y', '50%');
            });
        });
    }
}

class HeroParallax {
    constructor() {
        this.hero = document.getElementById('hero');
        this.isTouch = window.matchMedia('(pointer: coarse)').matches;
        if (this.hero && !this.isTouch && !prefersReducedMotion()) this.init();
    }

    init() {
        let rafId = null;
        let x = 0;
        let y = 0;

        const paint = () => {
            this.hero.style.setProperty('--hero-parallax-x', `${x}px`);
            this.hero.style.setProperty('--hero-parallax-y', `${y}px`);
            rafId = null;
        };

        this.hero.addEventListener('pointermove', (event) => {
            const rect = this.hero.getBoundingClientRect();
            const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
            const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
            x = nx * 10;
            y = ny * 10;
            if (rafId === null) rafId = window.requestAnimationFrame(paint);
        });

        this.hero.addEventListener('pointerleave', () => {
            this.hero.style.setProperty('--hero-parallax-x', '0px');
            this.hero.style.setProperty('--hero-parallax-y', '0px');
        });
    }
}

class CursorGlow {
    constructor() {
        this.isTouch = window.matchMedia('(pointer: coarse)').matches;
        if (!this.isTouch && !prefersReducedMotion()) this.init();
    }

    init() {
        this.glow = document.createElement('div');
        this.glow.className = 'cursor-glow';
        document.body.appendChild(this.glow);

        let x = 0;
        let y = 0;
        let rafId = null;

        const draw = () => {
            this.glow.style.left = `${x}px`;
            this.glow.style.top = `${y}px`;
            rafId = null;
        };

        document.addEventListener('pointermove', (event) => {
            x = event.clientX;
            y = event.clientY;
            this.glow.style.opacity = '1';
            if (rafId === null) rafId = window.requestAnimationFrame(draw);
        }, { passive: true });

        document.addEventListener('pointerleave', () => {
            this.glow.style.opacity = '0';
        });
    }
}

class ScrollEngine {
    constructor(modules) {
        this.modules = modules;
        this.ticking = false;
        this.onScroll = this.onScroll.bind(this);
        this.update();
        window.addEventListener('scroll', this.onScroll, { passive: true });
        window.addEventListener('resize', this.onScroll, { passive: true });
    }

    onScroll() {
        if (this.ticking) return;
        this.ticking = true;
        window.requestAnimationFrame(() => {
            this.update();
            this.ticking = false;
        });
    }

    update() {
        const scrollY = window.scrollY || window.pageYOffset || 0;
        if (this.modules.navigation) this.modules.navigation.setScrolled(scrollY > 100);
        if (this.modules.progress)   this.modules.progress.update(scrollY);
        if (this.modules.skyline)    this.modules.skyline.update(scrollY);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let modules = {};

    safeInit('navigation',    () => { modules.navigation = new Navigation(); });
    safeInit('progress',      () => { modules.progress   = new ScrollProgress(); });
    safeInit('skyline',       () => { modules.skyline    = new Skyline(); });
    safeInit('particles',     () => { new ParticleSystem(); });
    safeInit('section-reveal',() => { new SectionReveal(); });
    safeInit('skills',        () => { new SkillBars(); });
    safeInit('smooth-scroll', () => { new SmoothScroll(); });
    safeInit('project-cards', () => { new ProjectCards(); });
    safeInit('hero-parallax', () => { new HeroParallax(); });
    safeInit('cursor-glow',   () => { new CursorGlow(); });
    safeInit('scroll-engine', () => { new ScrollEngine(modules); });

    document.querySelectorAll('.discord-username, .discord-copy-btn').forEach(el => {
        el.addEventListener('click', () => {
            navigator.clipboard.writeText('@captaincto').then(() => {
                const original = el.textContent;
                if (el.classList.contains('discord-username')) {
                    el.textContent = 'Copied!';
                    setTimeout(() => { el.textContent = original; }, 2000);
                } else {
                    el.title = 'Copied!';
                    setTimeout(() => { el.title = 'Copy @captaincto'; }, 2000);
                }
            });
        });
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.form-submit');
            btn.disabled = true;
            btn.querySelector('span').textContent = 'Sending…';
            try {
                const res = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });
                if (res.ok) {
                    contactForm.innerHTML = '<p class="form-success">Message sent — I\'ll get back to you within 24–48 hours.</p>';
                } else {
                    btn.disabled = false;
                    btn.querySelector('span').textContent = 'Send message';
                    const err = document.querySelector('.form-error') || document.createElement('p');
                    err.className = 'form-error';
                    err.textContent = 'Something went wrong. Try emailing me directly.';
                    contactForm.appendChild(err);
                }
            } catch {
                btn.disabled = false;
                btn.querySelector('span').textContent = 'Send message';
                const err = document.querySelector('.form-error') || document.createElement('p');
                err.className = 'form-error';
                err.textContent = 'Something went wrong. Try emailing me directly.';
                contactForm.appendChild(err);
            }
        });
    }

    modules = {};
});
