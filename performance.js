// Оптимизация производительности сайта

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeImages();
        this.lazyLoadImages();
        this.preloadCriticalResources();
        this.optimizeAnimations();
        this.addServiceWorker();
    }

    // Ленивая загрузка изображений
    lazyLoadImages() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Предзагрузка критических ресурсов
    preloadCriticalResources() {
        const criticalImages = [
            'images/niks.png',
            'media/portfolio/photo_2025-12-29_08-46-03.jpg'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Оптимизация анимаций
    optimizeAnimations() {
        // Отключаем анимации для пользователей с медленным соединением
        if (navigator.connection && navigator.connection.effectiveType === 'slow-2g') {
            document.documentElement.style.setProperty('--transition-fast', '0s');
            document.documentElement.style.setProperty('--transition-medium', '0s');
        }

        // Уменьшаем анимации на слабых устройствах
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            document.documentElement.style.setProperty('--transition-fast', '0.1s ease');
            document.documentElement.style.setProperty('--transition-medium', '0.2s ease');
        }
    }

    // Оптимизация изображений
    optimizeImages() {
        // Добавляем WebP поддержку
        const supportsWebP = () => {
            const canvas = document.createElement('canvas');
            return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        };

        if (supportsWebP()) {
            document.documentElement.classList.add('webp');
        }
    }

    // Добавление Service Worker для кэширования
    addServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new PerformanceOptimizer();
});

// Дополнительные оптимизации
class UXEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.addLoadingStates();
        this.improveAccessibility();
        this.addKeyboardNavigation();
        this.optimizeForTouch();
    }

    // Состояния загрузки
    addLoadingStates() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (this.href && !this.href.startsWith('#')) {
                    this.style.opacity = '0.7';
                    this.style.pointerEvents = 'none';
                    
                    const originalText = this.textContent;
                    this.textContent = 'Загрузка...';
                    
                    setTimeout(() => {
                        this.style.opacity = '1';
                        this.style.pointerEvents = 'auto';
                        this.textContent = originalText;
                    }, 2000);
                }
            });
        });
    }

    // Улучшение доступности
    improveAccessibility() {
        // Добавляем ARIA-метки
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.classList.contains('active')) {
                link.setAttribute('aria-current', 'page');
            }
        });

        // Улучшаем фокус для клавиатурной навигации
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
        focusableElements.forEach(el => {
            el.addEventListener('focus', function() {
                this.style.outline = '2px solid #f59e0b';
                this.style.outlineOffset = '2px';
            });
            
            el.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
    }

    // Клавиатурная навигация
    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC для закрытия модальных окон
            if (e.key === 'Escape') {
                const modal = document.querySelector('.modal.active');
                if (modal) {
                    modal.style.display = 'none';
                    modal.classList.remove('active');
                }
                
                // Закрытие мобильного меню
                const navMenu = document.getElementById('nav-menu');
                const hamburger = document.getElementById('hamburger');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    }

    // Оптимизация для сенсорных устройств
    optimizeForTouch() {
        // Улучшаем touch события
        const touchElements = document.querySelectorAll('.btn, .service-card, .portfolio-item');
        
        touchElements.forEach(el => {
            el.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            el.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }, { passive: true });
        });

        // Предотвращаем двойное нажатие для увеличения
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
}

// Инициализация UX улучшений
document.addEventListener('DOMContentLoaded', () => {
    new UXEnhancements();
});