// ================================================
// ABOUT PAGE - Interactive Features
// ================================================

document.addEventListener('DOMContentLoaded', () => {
    initAboutPage();
});

function initAboutPage() {
    // Add animation indices
    addAnimationIndices();
    
    // Interactive sidebar cards
    initSidebarCards();
    
    // Reveal content blocks on scroll
    initScrollReveal();
    
    // Add hover effects to list items
    initListItemEffects();
    
    console.log('🏮 About page initialized');
}

// Add CSS variable indices for staggered animations
function addAnimationIndices() {
    // Facts list
    const factsList = document.querySelectorAll('.facts-list li');
    factsList.forEach((item, index) => {
        item.style.setProperty('--i', index + 1);
    });
    
    // Learning list
    const learningList = document.querySelectorAll('.learning-list li');
    learningList.forEach((item, index) => {
        item.style.setProperty('--i', index + 1);
        item.style.animationDelay = `${0.1 * (index + 1)}s`;
    });
    
    // Interests list
    const interestsList = document.querySelectorAll('.interests-list li');
    interestsList.forEach((item, index) => {
        item.style.setProperty('--i', index + 1);
        item.style.animationDelay = `${0.1 * (index + 1)}s`;
    });
    
    // Values list
    const valuesList = document.querySelectorAll('.values-list li');
    valuesList.forEach((item, index) => {
        item.style.setProperty('--i', index + 1);
        item.style.animationDelay = `${0.1 * (index + 1)}s`;
    });
    
    // Content blocks
    const contentBlocks = document.querySelectorAll('.content-block');
    contentBlocks.forEach((block, index) => {
        block.style.setProperty('--block-index', index + 1);
    });
}

// Interactive sidebar cards - click to highlight
function initSidebarCards() {
    const sidebarCards = document.querySelectorAll('.sidebar-card');
    
    sidebarCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active from all cards
            sidebarCards.forEach(c => c.classList.remove('active'));
            
            // Add active to clicked card
            this.classList.add('active');
            
            // Animate the card
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
        });
        
        // Add subtle rotation on hover
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(10px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Scroll reveal for content blocks
function initScrollReveal() {
    const contentBlocks = document.querySelectorAll('.content-block');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Trigger animation
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, observerOptions);
    
    contentBlocks.forEach(block => {
        // Reset initial state
        block.style.opacity = '0';
        observer.observe(block);
    });
}

// Add interactive effects to list items
function initListItemEffects() {
    const allListItems = document.querySelectorAll('.facts-list li, .learning-list li, .interests-list li, .values-list li');
    
    allListItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.color = 'var(--warm-lantern)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = '';
        });
        
        // Click to emphasize
        item.addEventListener('click', function() {
            // Flash effect
            this.style.background = 'rgba(255, 179, 71, 0.2)';
            this.style.padding = '5px 10px';
            this.style.borderRadius = '5px';
            this.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                this.style.background = '';
                this.style.padding = '';
            }, 1000);
        });
    });
}

// Add parallax effect to sidebar on scroll
window.addEventListener('scroll', () => {
    const sidebar = document.querySelector('.about-sidebar');
    if (sidebar && window.innerWidth > 1024) {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.3;
        sidebar.style.transform = `translateY(${rate}px)`;
    }
});
