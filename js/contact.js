// ================================================
// CONTACT FORM HANDLER - Enhanced Version
// ================================================

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        initContactPage();
    }
});

function initContactPage() {
    // Copy to clipboard for contact methods
    initCopyToClipboard();
    
    // Character counter for textarea
    initCharacterCounter();
    
    // Form field animations
    initFormAnimations();
    
    // Contact method hover effects
    initContactMethodEffects();
    
    console.log('🏮 Contact page initialized');
}

// Copy to clipboard functionality
function initCopyToClipboard() {
    const contactMethods = document.querySelectorAll('.method-detail');
    
    contactMethods.forEach(method => {
        method.addEventListener('click', function(e) {
            const text = this.textContent.trim();
            
            // Copy to clipboard
            navigator.clipboard.writeText(text).then(() => {
                showCopyTooltip(e.clientX, e.clientY, 'Copied!');
                
                // Flash effect
                this.style.background = 'rgba(16, 185, 129, 0.2)';
                setTimeout(() => {
                    this.style.background = '';
                }, 500);
            }).catch(err => {
                console.error('Failed to copy:', err);
                showCopyTooltip(e.clientX, e.clientY, 'Failed to copy');
            });
        });
    });
}

// Show copy tooltip
function showCopyTooltip(x, y, message) {
    const tooltip = document.createElement('div');
    tooltip.className = 'copy-tooltip';
    tooltip.textContent = message;
    tooltip.style.left = x + 'px';
    tooltip.style.top = (y - 40) + 'px';
    
    document.body.appendChild(tooltip);
    
    setTimeout(() => {
        tooltip.remove();
    }, 2000);
}

// Character counter for textarea
function initCharacterCounter() {
    const textarea = document.getElementById('message');
    const formGroup = textarea.closest('.form-group');
    
    if (textarea && formGroup) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        formGroup.appendChild(counter);
        
        const updateCounter = () => {
            const length = textarea.value.length;
            const maxLength = 500; // Set a reasonable max
            counter.textContent = `${length} / ${maxLength} characters`;
            
            if (length > maxLength * 0.9) {
                counter.style.color = '#ef4444';
            } else {
                counter.style.color = 'var(--text-secondary)';
            }
        };
        
        textarea.addEventListener('input', updateCounter);
        textarea.addEventListener('focus', updateCounter);
    }
}

// Form field animations
function initFormAnimations() {
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    
    inputs.forEach(input => {
        // Ripple effect on focus
        input.addEventListener('focus', function() {
            createInputRipple(this);
        });
        
        // Validation feedback
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '#10b981';
                
                setTimeout(() => {
                    this.style.borderColor = '';
                }, 2000);
            }
        });
    });
}

// Create ripple effect for inputs
function createInputRipple(element) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.top = '0';
    ripple.style.left = '0';
    ripple.style.right = '0';
    ripple.style.bottom = '0';
    ripple.style.border = '2px solid var(--warm-lantern)';
    ripple.style.borderRadius = '8px';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'rippleExpand 0.6s ease-out';
    
    element.style.position = 'relative';
    element.parentElement.style.position = 'relative';
    element.parentElement.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Contact method effects
function initContactMethodEffects() {
    const methods = document.querySelectorAll('.contact-method');
    
    methods.forEach(method => {
        method.addEventListener('mouseenter', function() {
            // Add glow effect
            this.style.boxShadow = '0 5px 30px rgba(255, 179, 71, 0.2)';
        });
        
        method.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// Original form submission handler (enhanced)
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Simple validation
    if (!validateForm(formData)) {
        showMessage('Please fill in all fields correctly.', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = document.querySelector('.form-submit');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<span>Sending...</span>';
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';
    
    // Add loading animation
    submitButton.style.animation = 'pulse 1s ease-in-out infinite';
    
    // Simulate form submission (replace with actual backend call)
    setTimeout(() => {
        console.log('Form Data:', formData);
        showMessage('✨ Message sent successfully! I\'ll get back to you soon.', 'success');
        document.getElementById('contactForm').reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
        submitButton.style.animation = '';
        
        // Confetti effect on success
        createConfetti();
    }, 1500);
}

function validateForm(data) {
    // Check if all fields are filled
    if (!data.name || !data.email || !data.subject || !data.message) {
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }
    
    return true;
}

function showMessage(message, type) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message-${type}`;
    messageEl.textContent = message;
    
    // Add styles
    messageEl.style.padding = '15px 20px';
    messageEl.style.marginTop = '20px';
    messageEl.style.borderRadius = '8px';
    messageEl.style.fontSize = '15px';
    messageEl.style.textAlign = 'center';
    messageEl.style.fontWeight = '500';
    
    if (type === 'success') {
        messageEl.style.background = 'rgba(16, 185, 129, 0.1)';
        messageEl.style.border = '1px solid rgba(16, 185, 129, 0.3)';
        messageEl.style.color = '#10b981';
    } else {
        messageEl.style.background = 'rgba(239, 68, 68, 0.1)';
        messageEl.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        messageEl.style.color = '#ef4444';
    }
    
    // Insert message
    const form = document.getElementById('contactForm');
    form.appendChild(messageEl);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateY(-20px)';
        messageEl.style.transition = 'all 0.3s ease';
        setTimeout(() => messageEl.remove(), 300);
    }, 5000);
}

// Confetti effect on successful submission
function createConfetti() {
    const colors = ['#ffb347', '#00d9ff', '#a855f7', '#10b981', '#ffd700'];
    const confettiCount = 30;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = '50%';
            confetti.style.top = '50%';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '10000';
            
            document.body.appendChild(confetti);
            
            const angle = (Math.random() * 360) * Math.PI / 180;
            const velocity = 100 + Math.random() * 200;
            const x = Math.cos(angle) * velocity;
            const y = Math.sin(angle) * velocity;
            
            confetti.animate([
                {
                    transform: 'translate(0, 0) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translate(${x}px, ${y}px) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ], {
                duration: 1000 + Math.random() * 500,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }).onfinish = () => confetti.remove();
        }, i * 30);
    }
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleExpand {
        from {
            transform: scale(1);
            opacity: 1;
        }
        to {
            transform: scale(1.05);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
    }
`;
document.head.appendChild(style);
