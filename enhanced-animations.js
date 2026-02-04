// Улучшенные анимации и эффекты для сайта

class EnhancedAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        this.setupHoverEffects();
        this.setupLoadingAnimations();
        this.setupCounterAnimations();
    }

    // Улучшенные анимации при скролле
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Добавляем задержку для последовательной анимации
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.style.animationDelay = '0s';
                    }, delay * 100);
                }
            });
        }, observerOptions);

        // Наблюдаем за элементами
        document.querySelectorAll('.animate-on-scroll, .animate-fade-left, .animate-scale').forEach(el => {
            observer.observe(el);
        });

        // Добавляем последовательную анимацию для карточек
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.classList.add('animate-on-scroll');
            card.dataset.delay = index;
        });
    }

    // Параллакс эффекты
    setupParallaxEffects() {
        let ticking = false;

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });

            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // Улучшенные hover эффекты
    setupHoverEffects() {
        // Магнитный эффект для кнопок
        document.querySelectorAll('.btn, .service-card').forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0) scale(1)';
            });
        });

        // Эффект наклона для изображений
        document.querySelectorAll('.portfolio-item img, .about-image img').forEach(img => {
            img.addEventListener('mousemove', (e) => {
                const rect = img.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });

            img.addEventListener('mouseleave', () => {
                img.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    // Анимации загрузки
    setupLoadingAnimations() {
        // Анимация появления элементов при загрузке страницы
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            
            // Последовательное появление элементов навигации
            document.querySelectorAll('.nav-link').forEach((link, index) => {
                setTimeout(() => {
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });

        // Прелоадер
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = `
            <div class="preloader-content">
                <div class="camera-loader">
                    <div class="camera-body"></div>
                    <div class="camera-lens"></div>
                    <div class="camera-flash"></div>
                </div>
                <p>Загрузка...</p>
            </div>
        `;
        
        // Добавляем стили для прелоадера
        const preloaderStyles = `
            .preloader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #18181b;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            }
            
            .preloader-content {
                text-align: center;
                color: white;
            }
            
            .camera-loader {
                width: 60px;
                height: 40px;
                position: relative;
                margin: 0 auto 20px;
                animation: cameraShake 1s ease-in-out infinite;
            }
            
            .camera-body {
                width: 100%;
                height: 100%;
                background: #f59e0b;
                border-radius: 8px;
                position: relative;
            }
            
            .camera-lens {
                width: 25px;
                height: 25px;
                background: #333;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: lensZoom 1s ease-in-out infinite;
            }
            
            .camera-flash {
                width: 8px;
                height: 8px;
                background: white;
                border-radius: 50%;
                position: absolute;
                top: 8px;
                right: 8px;
                animation: flash 2s ease-in-out infinite;
            }
            
            @keyframes cameraShake {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }
            
            @keyframes lensZoom {
                0%, 100% { transform: translate(-50%, -50%) scale(1); }
                50% { transform: translate(-50%, -50%) scale(1.2); }
            }
            
            @keyframes flash {
                0%, 90%, 100% { opacity: 0; }
                5%, 85% { opacity: 1; }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = preloaderStyles;
        document.head.appendChild(styleSheet);
        document.body.appendChild(preloader);

        // Убираем прелоадер после загрузки
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 1000);
        });
    }

    // Анимация счетчиков
    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = counter.textContent.replace(/\d+/, target);
                    clearInterval(timer);
                } else {
                    counter.textContent = counter.textContent.replace(/\d+/, Math.floor(current));
                }
            }, 16);
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
}

// Система частиц для фона
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }

    init() {
        this.canvas.id = 'particle-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        document.body.appendChild(this.canvas);

        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.min(50, window.innerWidth / 20);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(245, 158, 11, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedAnimations();
    
    // Запускаем частицы только на десктопе
    if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        new ParticleSystem();
    }
});