// Global JavaScript Effects for All Pages

// Mobile menu toggle
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

// Navbar scroll effect
function initNavbarScroll() {
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll('.animate-on-scroll, .animate-fade-left, .animate-fade-right, .animate-scale, .section-title');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add animation classes to service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    document.querySelectorAll('.stat-item').forEach((stat, index) => {
        stat.classList.add('animate-scale');
        stat.style.animationDelay = `${index * 0.1}s`;
    });
}

// Parallax effect
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background, .portfolio-hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add hover effects to images
function initImageHoverEffects() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
            img.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
}

// Add ripple effect to buttons
function initButtonRippleEffect() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add CSS for ripple effect and animations
function addGlobalCSS() {
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Scroll animations */
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .animate-on-scroll.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animate-fade-left {
            opacity: 0;
            transform: translateX(-30px);
            transition: all 0.8s ease;
        }
        
        .animate-fade-left.animated {
            opacity: 1;
            transform: translateX(0);
        }
        
        .animate-fade-right {
            opacity: 0;
            transform: translateX(30px);
            transition: all 0.8s ease;
        }
        
        .animate-fade-right.animated {
            opacity: 1;
            transform: translateX(0);
        }
        
        .animate-scale {
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.8s ease;
        }
        
        .animate-scale.animated {
            opacity: 1;
            transform: scale(1);
        }
    `;
    document.head.appendChild(style);
}

// Add hover effects to cards
function initCardHoverEffects() {
    document.querySelectorAll('.card, .service-card, .portfolio-item, .contact-method').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Create floating particles
function createParticles() {
    // Create particles container if it doesn't exist
    let particlesContainer = document.getElementById('particles');
    if (!particlesContainer) {
        particlesContainer = document.createElement('div');
        particlesContainer.id = 'particles';
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);
    }
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and animation delay
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Magnetic effect for elements
function addMagneticEffect() {
    const magneticElements = document.querySelectorAll('.magnetic, .btn-magnetic');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const titleLines = document.querySelectorAll('.title-line');
    titleLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.animation = 'slideInLeft 0.8s ease-out forwards';
        }, index * 300);
    });
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNavbarScroll();
    initScrollAnimations();
    initParallaxEffect();
    initSmoothScroll();
    initImageHoverEffects();
    initButtonRippleEffect();
    initCardHoverEffects();
    initTypingEffect();
    addGlobalCSS();
    createParticles();
    addMagneticEffect();
});