// ================================================
// HOME PAGE - Interactive Features
// ================================================

document.addEventListener('DOMContentLoaded', () => {
    initHomePage();
});

function initHomePage() {
    // Interactive tech tags
    initTechTags();
    
    // Project card click effects
    initProjectCards();
    
    // Philosophy quote interactions
    initPhilosophyQuote();
    
    console.log('🏮 Home page initialized');
}

// Make tech tags clickable and show info
function initTechTags() {
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const tech = this.textContent.trim();
            showTechInfo(this, tech);
            
            // Flash effect
            this.style.background = 'rgba(255, 179, 71, 0.3)';
            setTimeout(() => {
                this.style.background = '';
            }, 300);
        });
    });
}

// Show tech info tooltip
function showTechInfo(element, tech) {
    const tooltip = document.createElement('div');
    tooltip.textContent = `🔧 ${tech}`;
    tooltip.style.position = 'fixed';
    tooltip.style.background = 'rgba(255, 179, 71, 0.95)';
    tooltip.style.color = '#1a1a2e';
    tooltip.style.padding = '8px 15px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.fontSize = '13px';
    tooltip.style.fontWeight = '600';
    tooltip.style.zIndex = '10000';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.animation = 'fadeIn 0.3s ease';
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.top - 40) + 'px';
    
    document.body.appendChild(tooltip);
    
    setTimeout(() => {
        tooltip.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => tooltip.remove(), 300);
    }, 1500);
}

// Enhanced project card interactions
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add ripple effect on click
        card.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A') {
                const ripple = document.createElement('div');
                const rect = this.getBoundingClientRect();
                
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 179, 71, 0.3)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s ease-out';
                ripple.style.pointerEvents = 'none';
                
                this.style.position = 'relative';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            }
        });
    });
}

// Philosophy quote interaction
function initPhilosophyQuote() {
    const quote = document.querySelector('.philosophy-quote');
    
    if (quote) {
        quote.addEventListener('click', function() {
            // Highlight effect
            this.style.background = 'rgba(255, 179, 71, 0.1)';
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                this.style.background = '';
                this.style.transform = '';
            }, 500);
        });
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
