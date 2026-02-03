// Дополнительные интерактивные эффекты частиц
class InteractiveParticles {
    constructor() {
        this.cursorTrails = [];
        this.clickBursts = [];
        this.init();
    }

    init() {
        this.addCursorTrail();
        this.addClickBurst();
        this.addScrollParticles();
        this.addPageLoadEffect();
        this.addStarField();
    }

    // След за курсором
    addCursorTrail() {
        let lastTime = 0;
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastTime > 50) { // Ограничиваем частоту
                this.createCursorTrail(e.clientX, e.clientY);
                lastTime = now;
            }
        });
    }

    createCursorTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 1000);
    }

    // Взрыв частиц при клике
    addClickBurst() {
        document.addEventListener('click', (e) => {
            this.createClickBurst(e.clientX, e.clientY);
        });
    }

    createClickBurst(x, y) {
        const particleCount = 12;
        const colors = [
            'rgba(245, 158, 11, 1)',
            'rgba(251, 146, 60, 1)',
            'rgba(102, 126, 234, 1)',
            'rgba(255, 255, 255, 1)'
        ];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle-burst';
            
            const angle = (i / particleCount) * Math.PI * 2;
            const distance = 50 + Math.random() * 50;
            const burstX = Math.cos(angle) * distance;
            const burstY = Math.sin(angle) * distance;
            
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: ${3 + Math.random() * 3}px;
                height: ${3 + Math.random() * 3}px;
                background: radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]} 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                --burst-x: ${burstX}px;
                --burst-y: ${burstY}px;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1200);
        }
    }

    // Частицы при скролле
    addScrollParticles() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.createScrollParticles();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    createScrollParticles() {
        if (Math.random() < 0.3) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                right: ${10 + Math.random() * 30}px;
                top: ${Math.random() * window.innerHeight}px;
                width: 3px;
                height: 3px;
                background: radial-gradient(circle, rgba(102, 126, 234, 0.7) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: scrollParticleMove 1.5s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1500);
        }
    }

    // Эффект загрузки страницы
    addPageLoadEffect() {
        const loadEffect = document.createElement('div');
        loadEffect.className = 'page-load-particles';
        document.body.appendChild(loadEffect);

        // Создаем частицы загрузки
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                this.createLoadParticle();
            }, i * 100);
        }
    }

    createLoadParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            width: ${2 + Math.random() * 4}px;
            height: ${2 + Math.random() * 4}px;
            background: radial-gradient(circle, rgba(245, 158, 11, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10001;
            animation: particleFloat 2s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }

    // Звездное поле
    addStarField() {
        const starCount = 50;
        
        for (let i = 0; i < starCount; i++) {
            setTimeout(() => {
                this.createStar();
            }, Math.random() * 3000);
        }
    }

    createStar() {
        const star = document.createElement('div');
        star.className = 'star-particle';
        star.style.cssText = `
            position: fixed;
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            width: ${1 + Math.random() * 2}px;
            height: ${1 + Math.random() * 2}px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            animation: twinkle ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 3}s;
        `;
        
        document.body.appendChild(star);
        
        // Пересоздаем звезду через случайное время
        setTimeout(() => {
            star.remove();
            this.createStar();
        }, 10000 + Math.random() * 10000);
    }
}

// Эффекты для конкретных элементов
class ElementParticleEffects {
    constructor() {
        this.init();
    }

    init() {
        this.addButtonEffects();
        this.addImageEffects();
        this.addTextEffects();
    }

    addButtonEffects() {
        document.querySelectorAll('.btn, button').forEach(btn => {
            btn.addEventListener('mouseenter', (e) => {
                this.createButtonHalo(e.target);
            });
            
            btn.addEventListener('click', (e) => {
                this.createButtonRipple(e);
            });
        });
    }

    createButtonHalo(button) {
        const rect = button.getBoundingClientRect();
        const halo = document.createElement('div');
        
        halo.style.cssText = `
            position: fixed;
            left: ${rect.left - 10}px;
            top: ${rect.top - 10}px;
            width: ${rect.width + 20}px;
            height: ${rect.height + 20}px;
            border: 2px solid rgba(245, 158, 11, 0.5);
            border-radius: ${parseInt(getComputedStyle(button).borderRadius) + 10}px;
            pointer-events: none;
            z-index: 1000;
            animation: pulseGlow 1s ease-out forwards;
        `;
        
        document.body.appendChild(halo);
        
        setTimeout(() => {
            halo.remove();
        }, 1000);
    }

    createButtonRipple(e) {
        const button = e.target;
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('div');
        
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    addImageEffects() {
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('mouseenter', (e) => {
                this.createImageSparkles(e.target);
            });
        });
    }

    createImageSparkles(img) {
        const rect = img.getBoundingClientRect();
        const sparkleCount = 8;
        
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, rgba(251, 146, 60, 1) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: imageParticleFloat 2s ease-out forwards;
            `;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }
    }

    addTextEffects() {
        document.querySelectorAll('h1, h2, .section-title').forEach(title => {
            title.addEventListener('mouseenter', (e) => {
                this.createTextGlow(e.target);
            });
        });
    }

    createTextGlow(element) {
        const rect = element.getBoundingClientRect();
        const glow = document.createElement('div');
        
        glow.style.cssText = `
            position: fixed;
            left: ${rect.left - 20}px;
            top: ${rect.top - 10}px;
            width: ${rect.width + 40}px;
            height: ${rect.height + 20}px;
            background: radial-gradient(ellipse, rgba(245, 158, 11, 0.2) 0%, transparent 70%);
            pointer-events: none;
            z-index: -1;
            border-radius: 10px;
            animation: pulseGlow 1.5s ease-out forwards;
        `;
        
        document.body.appendChild(glow);
        
        setTimeout(() => {
            glow.remove();
        }, 1500);
    }
}

// Инициализация всех эффектов
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveParticles();
    new ElementParticleEffects();
    
    // Добавляем фоновый элемент с частицами
    const particleBg = document.createElement('div');
    particleBg.className = 'particle-background';
    document.body.appendChild(particleBg);
});