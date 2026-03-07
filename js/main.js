// ================================================
// TECH CITY PORTFOLIO - MAIN JAVASCRIPT
// Smooth interactions + accessibility improvements
// ================================================

function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall < delay) return;
        lastCall = now;
        return func(...args);
    };
}

function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 && rect.bottom >= 0;
}

class Navigation {
    constructor() {
        this.nav = document.getElementById('mainNav');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');

        if (this.nav) this.init();
    }

    init() {
        window.addEventListener('scroll', throttle(() => {
            this.nav.classList.toggle('scrolled', window.scrollY > 100);
        }, 100), { passive: true });

        if (this.navToggle && this.navMenu) {
            this.navToggle.setAttribute('aria-expanded', 'false');
            this.navToggle.addEventListener('click', () => {
                const isOpen = this.navMenu.classList.toggle('active');
                this.navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            });
        }

        this.navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                if (this.navMenu) this.navMenu.classList.remove('active');
                if (this.navToggle) this.navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.navMenu && this.navMenu.classList.contains('active')) {
                this.navMenu.classList.remove('active');
                if (this.navToggle) this.navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

class ScrollProgress {
    constructor() {
        this.progressBar = document.getElementById('scrollProgress');
        if (this.progressBar) this.init();
    }

    init() {
        window.addEventListener('scroll', throttle(() => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (windowHeight <= 0) {
                this.progressBar.style.width = '0%';
                return;
            }
            const scrolled = (window.scrollY / windowHeight) * 100;
            this.progressBar.style.width = `${Math.max(0, Math.min(100, scrolled))}%`;
        }, 50), { passive: true });
    }
}

class Skyline {
    constructor() {
        this.buildings = document.querySelectorAll('.building');
        this.windowLightsContainer = document.querySelector('.window-lights');

        if (this.buildings.length > 0 && this.windowLightsContainer) this.init();
    }

    init() {
        this.generateWindowLights();

        if (!prefersReducedMotion()) {
            window.addEventListener('scroll', throttle(() => {
                this.parallaxEffect();
            }, 50), { passive: true });
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

            for (let i = 0; i < windowsX; i++) {
                for (let j = 0; j < windowsY; j++) {
                    if (Math.random() > 0.4) {
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

    parallaxEffect() {
        const scrolled = window.scrollY;
        this.buildings.forEach((building) => {
            const speed = parseFloat(building.getAttribute('data-speed')) || 0.3;
            building.style.transform = `translateY(${-(scrolled * speed)}px)`;
        });
    }
}

class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles');
        this.particleCount = prefersReducedMotion() ? 0 : (window.innerWidth < 768 ? 8 : 16);
        if (this.container && this.particleCount > 0) this.init();
    }

    init() {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < this.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            const size = 2 + Math.random() * 3;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.animationDelay = `${Math.random() * 20}s`;
            particle.style.animationDuration = `${18 + Math.random() * 14}s`;
            particle.style.setProperty('--drift', `${-70 + Math.random() * 140}px`);
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
            this.sections.forEach((section) => section.classList.add('revealed'));
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('revealed');
                obs.unobserve(entry.target);
            });
        }, {
            threshold: 0.16,
            rootMargin: '0px 0px -8% 0px'
        });

        this.sections.forEach((section) => observer.observe(section));
    }
}

class SkillBars {
    constructor() {
        this.skillFills = document.querySelectorAll('.skill-fill');
        this.animated = false;
        if (this.skillFills.length > 0) this.init();
    }

    init() {
        if (prefersReducedMotion()) {
            this.animateSkills(true);
            return;
        }

        this.animateSkills(false);
        window.addEventListener('scroll', throttle(() => {
            this.animateSkills(false);
        }, 100), { passive: true });
    }

    animateSkills(immediate) {
        if (this.animated) return;

        const skillSection = document.getElementById('skills-preview') || document.querySelector('.skills-categories');
        if (!skillSection) return;

        if (immediate || isInViewport(skillSection)) {
            this.skillFills.forEach((fill, index) => {
                const delay = immediate ? 0 : index * 100;
                setTimeout(() => {
                    const value = fill.getAttribute('data-skill') || '0';
                    fill.style.setProperty('--skill-width', `${value}%`);
                    fill.classList.add('animated');
                }, delay);
            });
            this.animated = true;
        }
    }
}

class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }

    init() {
        this.links.forEach((link) => {
            link.addEventListener('click', (event) => {
                const href = link.getAttribute('href');
                if (!href || href === '#' || href === '#!') return;

                const target = document.querySelector(href);
                if (!target) return;

                event.preventDefault();
                const offset = 86;
                const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetTop,
                    behavior: prefersReducedMotion() ? 'auto' : 'smooth'
                });
            });
        });
    }
}

class ProjectCards {
    constructor() {
        this.cards = document.querySelectorAll('.project-card');
        this.isTouch = window.matchMedia('(pointer: coarse)').matches;
        if (this.cards.length > 0 && !this.isTouch) this.init();
    }

    init() {
        this.cards.forEach((card) => {
            let rafId = null;
            let mx = 50;
            let my = 50;

            const paint = () => {
                card.style.setProperty('--mouse-x', `${mx}%`);
                card.style.setProperty('--mouse-y', `${my}%`);
                rafId = null;
            };

            card.addEventListener('pointermove', (event) => {
                const rect = card.getBoundingClientRect();
                mx = ((event.clientX - rect.left) / rect.width) * 100;
                my = ((event.clientY - rect.top) / rect.height) * 100;

                if (rafId === null) rafId = requestAnimationFrame(paint);
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
        let px = 0;
        let py = 0;

        const paint = () => {
            this.hero.style.setProperty('--hero-parallax-x', `${px}px`);
            this.hero.style.setProperty('--hero-parallax-y', `${py}px`);
            rafId = null;
        };

        this.hero.addEventListener('pointermove', (event) => {
            const rect = this.hero.getBoundingClientRect();
            const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
            const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
            px = nx * 6;
            py = ny * 6;
            if (rafId === null) rafId = requestAnimationFrame(paint);
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

        const paint = () => {
            this.glow.style.left = `${x}px`;
            this.glow.style.top = `${y}px`;
            rafId = null;
        };

        document.addEventListener('pointermove', (event) => {
            x = event.clientX;
            y = event.clientY;
            this.glow.style.opacity = '1';
            if (rafId === null) rafId = requestAnimationFrame(paint);
        }, { passive: true });

        document.addEventListener('pointerleave', () => {
            this.glow.style.opacity = '0';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
    new ScrollProgress();
    new Skyline();
    new ParticleSystem();
    new SectionReveal();
    new SkillBars();
    new SmoothScroll();
    new CursorGlow();
    new ProjectCards();
    // Lantern parallax removed with lantern elements.
});
