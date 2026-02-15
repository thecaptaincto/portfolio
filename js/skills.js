// ================================================
// SKILLS PAGE - Interactive Features
// ================================================

document.addEventListener('DOMContentLoaded', () => {
    initSkillsPage();
});

function initSkillsPage() {
    // Add animation indices
    addAnimationIndices();
    
    // Expandable skill cards
    initExpandableCards();
    
    // Animate skill bars on view
    initSkillBarsAnimation();
    
    // Interactive learning items
    initLearningItems();
    
    // Skill percentage display
    initSkillPercentages();
    
    console.log('🏮 Skills page initialized');
}

// Add CSS variable indices
function addAnimationIndices() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.setProperty('--card-index', index + 1);
    });
    
    const learningItems = document.querySelectorAll('.learning-item');
    learningItems.forEach((item, index) => {
        item.style.setProperty('--learning-index', index + 1);
    });
}

// Make skill cards expandable on click
function initExpandableCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle expanded state
            this.classList.toggle('expanded');
            
            // Collapse other cards
            skillCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.remove('expanded');
                }
            });
            
            // Animate the expansion
            if (this.classList.contains('expanded')) {
                this.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
            }
        });
        
        // Add 3D tilt effect
        card.addEventListener('mousemove', function(e) {
            if (window.innerWidth < 768) return; // Skip on mobile
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Animate skill bars when they come into view
function initSkillBarsAnimation() {
    const skillBars = document.querySelectorAll('.level-fill');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const percentage = entry.target.style.width;
                entry.target.style.width = '0%';
                
                setTimeout(() => {
                    entry.target.style.width = percentage;
                    entry.target.classList.add('animated');
                    
                    // Add particle effect
                    createParticleEffect(entry.target);
                }, 100);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Create particle effect for skill bars
function createParticleEffect(element) {
    const particles = 5;
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'var(--lantern-glow)';
        particle.style.borderRadius = '50%';
        particle.style.left = rect.right + 'px';
        particle.style.top = (rect.top + rect.height / 2) + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        document.body.appendChild(particle);
        
        // Animate particle
        const angle = (Math.random() * 120 - 60) * Math.PI / 180;
        const distance = 30 + Math.random() * 30;
        const duration = 0.8 + Math.random() * 0.4;
        
        particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }).onfinish = () => particle.remove();
    }
}

// Interactive learning items
function initLearningItems() {
    const learningItems = document.querySelectorAll('.learning-item');
    
    learningItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add clicked state
            this.classList.add('clicked');
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.width = '100%';
            ripple.style.height = '100%';
            ripple.style.top = '0';
            ripple.style.left = '0';
            ripple.style.background = 'rgba(255, 179, 71, 0.3)';
            ripple.style.borderRadius = '8px';
            ripple.style.animation = 'rippleEffect 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
                this.classList.remove('clicked');
            }, 600);
            
            // Show learning status
            showLearningStatus(this);
        });
    });
}

// Show learning status tooltip
function showLearningStatus(element) {
    const status = document.createElement('div');
    const title = element.querySelector('.learning-title').textContent;
    status.textContent = `📚 Currently learning ${title}!`;
    status.style.position = 'fixed';
    status.style.top = '50%';
    status.style.left = '50%';
    status.style.transform = 'translate(-50%, -50%)';
    status.style.background = 'rgba(255, 179, 71, 0.95)';
    status.style.color = '#1a1a2e';
    status.style.padding = '15px 30px';
    status.style.borderRadius = '8px';
    status.style.fontSize = '16px';
    status.style.fontWeight = '600';
    status.style.zIndex = '10000';
    status.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.3)';
    status.style.animation = 'fadeInScale 0.3s ease';
    
    document.body.appendChild(status);
    
    setTimeout(() => {
        status.style.animation = 'fadeOutScale 0.3s ease';
        setTimeout(() => status.remove(), 300);
    }, 2000);
}

// Display skill percentages
function initSkillPercentages() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        const levelFill = card.querySelector('.level-fill');
        const levelText = card.querySelector('.level-text');
        
        if (levelFill && levelText) {
            const percentage = levelFill.style.width;
            levelText.setAttribute('data-percent', percentage);
        }
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes fadeOutScale {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
`;
document.head.appendChild(style);
