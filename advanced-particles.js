// Эффект дождя из частиц
class ParticleRain {
    constructor() {
        this.rainDrops = [];
        this.isActive = false;
        this.init();
    }

    init() {
        this.addRainTrigger();
    }

    addRainTrigger() {
        // Активируем дождь при скролле до определенной секции
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            
            if (scrollPercent > 20 && scrollPercent < 80 && !this.isActive) {
                this.startRain();
            } else if ((scrollPercent <= 20 || scrollPercent >= 80) && this.isActive) {
                this.stopRain();
            }
        });
    }

    startRain() {
        this.isActive = true;
        this.rainInterval = setInterval(() => {
            this.createRainDrop();
        }, 200);
    }

    stopRain() {
        this.isActive = false;
        if (this.rainInterval) {
            clearInterval(this.rainInterval);
        }
    }

    createRainDrop() {
        const drop = document.createElement('div');
        drop.className = 'particle-rain';
        drop.style.left = Math.random() * window.innerWidth + 'px';
        drop.style.animationDuration = (2 + Math.random() * 2) + 's';
        drop.style.opacity = 0.3 + Math.random() * 0.4;
        
        document.body.appendChild(drop);
        
        setTimeout(() => {
            drop.remove();
        }, 4000);
    }
}

// Эффект магнитного притяжения частиц к курсору
class MagneticParticles {
    constructor() {
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.createMagneticField();
        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.updateMagneticField();
        });
    }

    createMagneticField() {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'magnetic-particle';
            particle.style.cssText = `
                position: fixed;
                width: 3px;
                height: 3px;
                background: radial-gradient(circle, rgba(102, 126, 234, 0.8) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
                transition: all 0.3s ease;
            `;
            
            document.body.appendChild(particle);
            this.particles.push({
                element: particle,
                baseX: Math.random() * window.innerWidth,
                baseY: Math.random() * window.innerHeight,
                currentX: Math.random() * window.innerWidth,
                currentY: Math.random() * window.innerHeight
            });
        }
    }

    updateMagneticField() {
        this.particles.forEach(particle => {
            const dx = this.mouse.x - particle.currentX;
            const dy = this.mouse.y - particle.currentY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                particle.currentX += dx * force * 0.1;
                particle.currentY += dy * force * 0.1;
            } else {
                // Возвращаем к базовой позиции
                particle.currentX += (particle.baseX - particle.currentX) * 0.05;
                particle.currentY += (particle.baseY - particle.currentY) * 0.05;
            }
            
            particle.element.style.left = particle.currentX + 'px';
            particle.element.style.top = particle.currentY + 'px';
        });
    }
}

// Эффект взрыва частиц при загрузке секций
class SectionLoadBurst {
    constructor() {
        this.init();
    }

    init() {
        this.observeSections();
    }

    observeSections() {
        const sections = document.querySelectorAll('section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.burstTriggered) {
                    this.createSectionBurst(entry.target);
                    entry.target.dataset.burstTriggered = 'true';
                }
            });
        }, { threshold: 0.3 });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    createSectionBurst(section) {
        const rect = section.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                this.createBurstParticle(centerX, centerY);
            }, i * 50);
        }
    }

    createBurstParticle(x, y) {
        const particle = document.createElement('div');
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 100;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;
        
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, rgba(245, 158, 11, 1) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: sectionBurst 1.5s ease-out forwards;
            --end-x: ${endX}px;
            --end-y: ${endY}px;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1500);
    }
}

// Эффект частиц при наведении на текст
class TextParticleEffect {
    constructor() {
        this.init();
    }

    init() {
        this.addTextEffects();
    }

    addTextEffects() {
        const textElements = document.querySelectorAll('h1, h2, h3, .hero-title, .section-title');
        
        textElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.createTextParticles(e.target);
            });
        });
    }

    createTextParticles(element) {
        const rect = element.getBoundingClientRect();
        const particleCount = Math.min(20, element.textContent.length);
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                width: 2px;
                height: 2px;
                background: radial-gradient(circle, rgba(251, 146, 60, 0.8) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: textParticleFloat 2s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }
    }
}

// Добавляем CSS анимации для новых эффектов
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes sectionBurst {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(calc(var(--end-x) - 50vw), calc(var(--end-y) - 50vh)) scale(0.3);
        }
    }
    
    @keyframes textParticleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        50% {
            opacity: 0.7;
            transform: translateY(-20px) scale(1.2);
        }
        100% {
            opacity: 0;
            transform: translateY(-40px) scale(0.5);
        }
    }
    
    .magnetic-particle {
        transition: all 0.1s ease-out;
    }
    
    .particle-rain {
        animation-timing-function: linear;
    }
`;
document.head.appendChild(additionalStyles);

// Инициализация всех дополнительных эффектов
document.addEventListener('DOMContentLoaded', () => {
    new ParticleRain();
    new MagneticParticles();
    new SectionLoadBurst();
    new TextParticleEffect();
});