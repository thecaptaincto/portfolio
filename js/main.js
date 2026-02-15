// ================================================
// LANTERN CITY PORTFOLIO - MAIN JAVASCRIPT
// Handles animations, parallax, interactions
// ================================================

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Throttle function for performance
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) return;
        lastCall = now;
        return func(...args);
    };
}

// Debounce function
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
    );
}

// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================

class Navigation {
    constructor() {
        this.nav = document.getElementById('mainNav');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        // Scroll effect
        window.addEventListener('scroll', throttle(() => {
            if (window.scrollY > 100) {
                this.nav.classList.add('scrolled');
            } else {
                this.nav.classList.remove('scrolled');
            }
        }, 100));
        
        // Mobile toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => {
                this.navMenu.classList.toggle('active');
            });
        }
        
        // Close menu on link click (mobile)
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
            });
        });
        
        // Active link on scroll
        this.updateActiveLink();
        window.addEventListener('scroll', throttle(() => {
            this.updateActiveLink();
        }, 200));
    }
    
    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }
}

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================

class ScrollProgress {
    constructor() {
        this.progressBar = document.getElementById('scrollProgress');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', throttle(() => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            this.progressBar.style.width = scrolled + '%';
        }, 50));
    }
}

// ============================================
// SKYLINE PARALLAX & WINDOW LIGHTS
// ============================================

class Skyline {
    constructor() {
        this.buildings = document.querySelectorAll('.building');
        this.windowLightsContainer = document.querySelector('.window-lights');
        this.init();
    }
    
    init() {
        // Generate window lights
        this.generateWindowLights();
        
        // Parallax effect on scroll
        window.addEventListener('scroll', throttle(() => {
            this.parallaxEffect();
        }, 50));
    }
    
    generateWindowLights() {
        this.buildings.forEach((building, index) => {
            const x = parseFloat(building.getAttribute('x'));
            const y = parseFloat(building.getAttribute('y'));
            const width = parseFloat(building.getAttribute('width'));
            const height = parseFloat(building.getAttribute('height'));
            
            // Calculate number of windows based on building size
            const windowsX = Math.floor(width / 15);
            const windowsY = Math.floor(height / 20);
            
            for (let i = 0; i < windowsX; i++) {
                for (let j = 0; j < windowsY; j++) {
                    // Random chance for window to be lit
                    if (Math.random() > 0.4) {
                        const windowX = x + (i * 15) + 5;
                        const windowY = y + (j * 20) + 8;
                        const delay = Math.random() * 20;
                        
                        const window = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                        window.setAttribute('x', windowX);
                        window.setAttribute('y', windowY);
                        window.setAttribute('width', '4');
                        window.setAttribute('height', '6');
                        window.setAttribute('class', 'window-light');
                        window.style.setProperty('--delay', delay);
                        
                        this.windowLightsContainer.appendChild(window);
                    }
                }
            }
        });
    }
    
    parallaxEffect() {
        const scrolled = window.scrollY;
        
        this.buildings.forEach(building => {
            const speed = parseFloat(building.getAttribute('data-speed'));
            const yOffset = -(scrolled * speed);
            building.style.transform = `translateY(${yOffset}px)`;
        });
    }
}

// ============================================
// PARTICLE SYSTEM
// ============================================

class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles');
        this.particleCount = 20;
        this.init();
    }
    
    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        const startX = Math.random() * 100;
        particle.style.left = startX + '%';
        
        // Random animation delay and duration
        const delay = Math.random() * 15;
        const duration = 15 + Math.random() * 10;
        particle.style.animationDelay = delay + 's';
        particle.style.animationDuration = duration + 's';
        
        this.container.appendChild(particle);
    }
}

// ============================================
// SECTION REVEAL ON SCROLL
// ============================================

class SectionReveal {
    constructor() {
        this.sections = document.querySelectorAll('.section-reveal');
        this.init();
    }
    
    init() {
        // Initial check
        this.checkSections();
        
        // Check on scroll
        window.addEventListener('scroll', throttle(() => {
            this.checkSections();
        }, 100));
    }
    
    checkSections() {
        this.sections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('revealed');
            }
        });
    }
}

// ============================================
// SKILL BARS ANIMATION
// ============================================

class SkillBars {
    constructor() {
        this.skillFills = document.querySelectorAll('.skill-fill');
        this.animated = false;
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', throttle(() => {
            this.animateSkills();
        }, 100));
    }
    
    animateSkills() {
        if (this.animated) return;
        
        const skillSection = document.getElementById('skills-preview');
        if (!skillSection) return;
        
        if (isInViewport(skillSection)) {
            this.skillFills.forEach(fill => {
                const skillValue = fill.getAttribute('data-skill');
                fill.style.setProperty('--skill-width', skillValue + '%');
                fill.classList.add('animated');
            });
            this.animated = true;
        }
    }
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }
    
    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Ignore empty hash
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offset = 80; // Account for fixed nav
                    const targetPosition = target.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ============================================
// LANTERN FLOAT ANIMATION ENHANCEMENT
// ============================================

class LanternAnimation {
    constructor() {
        this.lanterns = document.querySelectorAll('.lantern');
        this.init();
    }
    
    init() {
        this.lanterns.forEach(lantern => {
            const floatSpeed = parseFloat(lantern.getAttribute('data-float'));
            
            // Add random movement
            setInterval(() => {
                const randomX = (Math.random() - 0.5) * 20;
                const randomY = (Math.random() - 0.5) * 30;
                lantern.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomX * 0.1}deg)`;
            }, 3000 + Math.random() * 2000);
        });
    }
}

// ============================================
// CURSOR GLOW EFFECT (Desktop only)
// ============================================

class CursorGlow {
    constructor() {
        this.glow = null;
        this.isMobile = window.innerWidth < 768;
        if (!this.isMobile) {
            this.init();
        }
    }
    
    init() {
        // Create glow element
        this.glow = document.createElement('div');
        this.glow.style.position = 'fixed';
        this.glow.style.width = '300px';
        this.glow.style.height = '300px';
        this.glow.style.borderRadius = '50%';
        this.glow.style.background = 'radial-gradient(circle, rgba(255, 179, 71, 0.15), transparent 70%)';
        this.glow.style.pointerEvents = 'none';
        this.glow.style.zIndex = '9999';
        this.glow.style.transform = 'translate(-50%, -50%)';
        this.glow.style.transition = 'opacity 0.3s ease';
        this.glow.style.opacity = '0';
        document.body.appendChild(this.glow);
        
        // Track mouse movement
        document.addEventListener('mousemove', throttle((e) => {
            this.glow.style.left = e.clientX + 'px';
            this.glow.style.top = e.clientY + 'px';
            this.glow.style.opacity = '1';
        }, 16));
        
        // Hide on mouse leave
        document.addEventListener('mouseleave', () => {
            this.glow.style.opacity = '0';
        });
    }
}

// ============================================
// PROJECT CARDS HOVER EFFECT
// ============================================

class ProjectCards {
    constructor() {
        this.cards = document.querySelectorAll('.project-card');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createGlowEffect(e.currentTarget);
            });
        });
    }
    
    createGlowEffect(card) {
        // Add subtle glow animation
        card.style.transition = 'all 0.4s ease';
    }
}

// ============================================
// PARALLAX ON MOUSE MOVE (Hero Section)
// ============================================

class HeroParallax {
    constructor() {
        this.hero = document.getElementById('hero');
        this.lanterns = document.querySelectorAll('.lantern');
        this.isMobile = window.innerWidth < 768;
        
        if (!this.isMobile && this.hero) {
            this.init();
        }
    }
    
    init() {
        this.hero.addEventListener('mousemove', throttle((e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            // Calculate position as percentage
            const xPercent = (clientX / innerWidth - 0.5) * 2;
            const yPercent = (clientY / innerHeight - 0.5) * 2;
            
            // Apply subtle parallax to lanterns
            this.lanterns.forEach((lantern, index) => {
                const speed = 0.5 + (index * 0.1);
                const x = xPercent * 20 * speed;
                const y = yPercent * 20 * speed;
                lantern.style.transform = `translate(${x}px, ${y}px)`;
            });
        }, 50));
    }
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        // Reduce animations on low-power devices
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.disableAnimations();
        }
        
        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });
    }
    
    disableAnimations() {
        document.body.style.setProperty('--animation-duration', '0.01s');
    }
    
    pauseAnimations() {
        document.body.style.animationPlayState = 'paused';
    }
    
    resumeAnimations() {
        document.body.style.animationPlayState = 'running';
    }
}

// ============================================
// INITIALIZE ALL MODULES ON DOM LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    new Navigation();
    new ScrollProgress();
    new Skyline();
    new ParticleSystem();
    new SectionReveal();
    new SkillBars();
    new SmoothScroll();
    new LanternAnimation();
    new CursorGlow();
    new ProjectCards();
    new HeroParallax();
    new PerformanceOptimizer();
    
    console.log('🏮 Lantern City Portfolio initialized');
});

// ============================================
// UTILITY: HANDLE WINDOW RESIZE
// ============================================

let resizeTimer;
window.addEventListener('resize', debounce(() => {
    // Reload certain modules on significant resize
    const newWidth = window.innerWidth;
    if (Math.abs(newWidth - window.lastWidth) > 100) {
        window.location.reload();
    }
    window.lastWidth = newWidth;
}, 500));

window.lastWidth = window.innerWidth;
