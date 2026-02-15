// ================================================
// PROJECTS PAGE - Interactive Features
// ================================================

document.addEventListener('DOMContentLoaded', () => {
    initProjectsPage();
});

function initProjectsPage() {
    // Add animation indices
    addAnimationIndices();
    
    // Reveal projects on scroll
    initScrollReveal();
    
    // Interactive feature list
    initFeatureList();
    
    // Tech grid interactions
    initTechGrid();
    
    // Ripple effect on buttons
    initRippleEffects();
    
    // Project section highlighting
    initProjectHighlighting();
    
    console.log('🏮 Projects page initialized');
}

// Add CSS variable indices for staggered animations
function addAnimationIndices() {
    // Feature lists
    document.querySelectorAll('.project-detail').forEach(project => {
        const features = project.querySelectorAll('.feature-list li');
        features.forEach((feature, index) => {
            feature.style.setProperty('--feature-index', index + 1);
        });
        
        const techItems = project.querySelectorAll('.tech-item');
        techItems.forEach((item, index) => {
            item.style.setProperty('--tech-index', index + 1);
        });
    });
}

// Scroll reveal for project sections
function initScrollReveal() {
    const projectSections = document.querySelectorAll('.project-detail');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Reveal child elements
                const blocks = entry.target.querySelectorAll('.project-description-block');
                blocks.forEach((block, index) => {
                    setTimeout(() => {
                        block.classList.add('revealed');
                    }, index * 200);
                });
            }
        });
    }, observerOptions);
    
    projectSections.forEach(section => observer.observe(section));
}

// Interactive feature list - click to check off
function initFeatureList() {
    const features = document.querySelectorAll('.feature-list li');
    
    features.forEach(feature => {
        feature.addEventListener('click', function() {
            this.classList.toggle('checked');
            
            // Animate the check
            if (this.classList.contains('checked')) {
                this.style.color = '#10b981';
                this.style.transform = 'translateX(15px) scale(1.05)';
                
                setTimeout(() => {
                    this.style.transform = 'translateX(15px) scale(1)';
                }, 200);
            } else {
                this.style.color = '';
                this.style.transform = 'translateX(0)';
            }
        });
    });
}

// Tech grid with click to highlight
function initTechGrid() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('click', function() {
            // Create highlight effect
            const highlight = document.createElement('div');
            highlight.style.position = 'absolute';
            highlight.style.top = '0';
            highlight.style.left = '0';
            highlight.style.right = '0';
            highlight.style.bottom = '0';
            highlight.style.background = 'rgba(255, 179, 71, 0.2)';
            highlight.style.pointerEvents = 'none';
            highlight.style.animation = 'flashHighlight 0.6s ease';
            
            this.style.position = 'relative';
            this.appendChild(highlight);
            
            setTimeout(() => {
                highlight.remove();
            }, 600);
        });
        
        // Add tilt effect on mouse move
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale(1.05)`;
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Ripple effect for buttons
function initRippleEffects() {
    const buttons = document.querySelectorAll('.project-link-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Highlight active project section
function initProjectHighlighting() {
    const projectSections = document.querySelectorAll('.project-detail');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -200px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove highlight from all
                projectSections.forEach(section => {
                    section.style.borderLeft = '3px solid transparent';
                });
                
                // Add highlight to active
                entry.target.style.borderLeft = '3px solid var(--warm-lantern)';
                entry.target.style.transition = 'border 0.3s ease';
            }
        });
    }, observerOptions);
    
    projectSections.forEach(section => observer.observe(section));
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes flashHighlight {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(1.5);
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for project sections
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;
    
    document.querySelectorAll('.project-detail').forEach((section, index) => {
        const speed = 0.1 + (index * 0.05);
        const currentTransform = section.style.transform || 'translateY(0px)';
        const currentY = parseFloat(currentTransform.match(/translateY\(([-\d.]+)px\)/) ? 
                        currentTransform.match(/translateY\(([-\d.]+)px\)/)[1] : 0);
        const newY = currentY - (delta * speed);
        
        section.style.transform = `translateY(${newY}px)`;
    });
    
    lastScrollY = currentScrollY;
});
