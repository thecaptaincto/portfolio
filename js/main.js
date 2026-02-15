// ================================================
// LANTERN CITY PORTFOLIO - MAIN JAVASCRIPT
// Fixed version with improved animations
// ================================================

// ============================================
// UTILITY FUNCTIONS
// ============================================

function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) return;
        lastCall = now;
        return func(...args);
    };
}

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
    );
}

// ============================================
// NAVIGATION - ALWAYS VISIBLE
// ============================================

class Navigation {
    constructor() {
        this.nav = document.getElementById('mainNav');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        if (this.nav) {
            this.init();
        }
    }
    
    init() {
        // Scroll effect - nav always visible, just changes appearance
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
    }
}

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================

class ScrollProgress {
    constructor() {
        this.progressBar = document.getElementById('scrollProgress');
        if (this.progressBar) {
            this.init();
        }
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
        
        if (this.buildings.length > 0 && this.windowLightsContainer) {
            this.init();
        }
    }
    
    init() {
        this.generateWindowLights();
        
        window.addEventListener('scroll', throttle(() => {
            this.parallaxEffect();
        }, 50));
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
                        const windowX = x + (i * 15) + 5;
                        const windowY = y + (j * 20) + 8;
                        
                        const window = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                        window.setAttribute('x', windowX);
                        window.setAttribute('y', windowY);
                        window.setAttribute('width', '4');
                        window.setAttribute('height', '6');
                        window.setAttribute('class', 'window-light');
                        
                        this.windowLightsContainer.appendChild(window);
                    }
                }
            }
        });
    }
    
    parallaxEffect() {
        const scrolled = window.scrollY;
        
        this.buildings.forEach(building => {
            const speed = parseFloat(building.getAttribute('data-speed')) || 0.3;
            const yOffset = -(scrolled * speed);
            building.style.transform = `translateY(${yOffset}px)`;
        });
    }
}

// ============================================
// ENHANCED PARTICLE SYSTEM
// ============================================

class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles');
        this.particleCount = 30;
        
        if (this.container) {
            this.init();
        }
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
        
        // Random size
        const size = 2 + Math.random() * 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation delay and duration
        const delay = Math.random() * 20;
        const duration = 20 + Math.random() * 15;
        particle.style.animationDelay = delay + 's';
        particle.style.animationDuration = duration + 's';
        
        // Random horizontal drift
        const drift = -50 + Math.random() * 100;
        particle.style.setProperty('--drift', drift + 'px');
        
        this.container.appendChild(particle);
    }
}

// ============================================
// IMPROVED LANTERN ANIMATION
// ============================================

class LanternAnimation {
    constructor() {
        this.lanterns = document.querySelectorAll('.lantern');
        
        if (this.lanterns.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.lanterns.forEach((lantern, index) => {
            // Add subtle random movement
            this.animateLantern(lantern, index);
        });
    }
    
    animateLantern(lantern, index) {
        const baseDelay = index * 500;
        
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 15;
            const randomRotate = (Math.random() - 0.5) * 4;
            
            lantern.style.transition = 'transform 3s ease-in-out';
            lantern.style.transform = `translate(${randomX}px, 0) rotate(${randomRotate}deg)`;
        }, 4000 + baseDelay);
    }
}

// ============================================
// SECTION REVEAL ON SCROLL
// ============================================

class SectionReveal {
    constructor() {
        this.sections = document.querySelectorAll('.section-reveal');
        
        if (this.sections.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.checkSections();
        
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
        
        if (this.skillFills.length > 0) {
            this.init();
        }
    }
    
    init() {
        window.addEventListener('scroll', throttle(() => {
            this.animateSkills();
        }, 100));
    }
    
    animateSkills() {
        if (this.animated) return;
        
        const skillSection = document.getElementById('skills-preview') || 
                            document.querySelector('.skills-categories');
        
        if (!skillSection) return;
        
        if (isInViewport(skillSection)) {
            this.skillFills.forEach((fill, index) => {
                setTimeout(() => {
                    const skillValue = fill.getAttribute('data-skill');
                    fill.style.setProperty('--skill-width', skillValue + '%');
                    fill.classList.add('animated');
                }, index * 100);
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
                
                if (href === '#' || href === '#!') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offset = 80;
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
// PROJECT CARDS MOUSE EFFECT
// ============================================

class ProjectCards {
    constructor() {
        this.cards = document.querySelectorAll('.project-card');
        
        if (this.cards.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                card.style.setProperty('--mouse-x', x + '%');
                card.style.setProperty('--mouse-y', y + '%');
            });
        });
    }
}

// ============================================
// HERO PARALLAX ON MOUSE MOVE
// ============================================

class HeroParallax {
    constructor() {
        this.hero = document.getElementById('hero');
        this.lanterns = document.querySelectorAll('.lantern');
        this.isMobile = window.innerWidth < 768;
        
        if (!this.isMobile && this.hero && this.lanterns.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.hero.addEventListener('mousemove', throttle((e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPercent = (clientX / innerWidth - 0.5) * 2;
            const yPercent = (clientY / innerHeight - 0.5) * 2;
            
            this.lanterns.forEach((lantern, index) => {
                const speed = 0.3 + (index * 0.05);
                const x = xPercent * 15 * speed;
                const y = yPercent * 15 * speed;
                
                const currentTransform = lantern.style.transform || '';
                const rotateMatch = currentTransform.match(/rotate\([^)]+\)/);
                const rotate = rotateMatch ? rotateMatch[0] : 'rotate(0deg)';
                
                lantern.style.transform = `translate(${x}px, ${y}px) ${rotate}`;
            });
        }, 50));
    }
}

// ============================================
// CURSOR GLOW EFFECT (Desktop)
// ============================================

class CursorGlow {
    constructor() {
        this.isMobile = window.innerWidth < 768;
        
        if (!this.isMobile) {
            this.init();
        }
    }
    
    init() {
        this.glow = document.createElement('div');
        this.glow.style.cssText = `
            position: fixed;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 179, 71, 0.12), transparent 70%);
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
            opacity: 0;
        `;
        document.body.appendChild(this.glow);
        
        document.addEventListener('mousemove', throttle((e) => {
            this.glow.style.left = e.clientX + 'px';
            this.glow.style.top = e.clientY + 'px';
            this.glow.style.opacity = '1';
        }, 16));
        
        document.addEventListener('mouseleave', () => {
            this.glow.style.opacity = '0';
        });
    }
}

// ============================================
// INITIALIZE ALL MODULES
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🏮 Initializing Lantern City Portfolio...');
    
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
    
    console.log('✅ Lantern City Portfolio loaded successfully!');
});

// Handle window resize
window.addEventListener('resize', debounce(() => {
    const newWidth = window.innerWidth;
    if (Math.abs(newWidth - (window.lastWidth || 0)) > 200) {
        window.location.reload();
    }
    window.lastWidth = newWidth;
}, 500));
