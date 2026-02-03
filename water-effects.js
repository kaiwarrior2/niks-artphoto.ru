// Система капель воды для портфолио
class WaterDropSystem {
    constructor() {
        this.drops = [];
        this.isActive = true;
        this.init();
    }

    init() {
        this.createWaterDrops();
        this.addHoverEffects();
        this.addClickEffects();
    }

    createWaterDrops() {
        setInterval(() => {
            if (this.isActive && Math.random() < 0.3) {
                this.createDrop();
            }
        }, 800);
    }

    createDrop() {
        const drop = document.createElement('div');
        drop.className = 'water-drop';
        drop.style.left = Math.random() * window.innerWidth + 'px';
        drop.style.animationDelay = Math.random() * 2 + 's';
        drop.style.animationDuration = (2 + Math.random() * 2) + 's';
        
        document.body.appendChild(drop);
        
        setTimeout(() => {
            drop.remove();
        }, 5000);
    }

    addHoverEffects() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                this.createHoverDrops(e.target);
            });
        });
    }

    createHoverDrops(element) {
        const rect = element.getBoundingClientRect();
        const dropCount = 5;
        
        for (let i = 0; i < dropCount; i++) {
            setTimeout(() => {
                const drop = document.createElement('div');
                drop.className = 'water-drop';
                drop.style.position = 'fixed';
                drop.style.left = (rect.left + Math.random() * rect.width) + 'px';
                drop.style.top = rect.top + 'px';
                drop.style.animationDuration = '1.5s';
                
                document.body.appendChild(drop);
                
                setTimeout(() => {
                    drop.remove();
                }, 1500);
            }, i * 100);
        }
    }

    addClickEffects() {
        document.addEventListener('click', (e) => {
            this.createRipple(e.clientX, e.clientY);
            this.createSplash(e.clientX, e.clientY);
        });
    }

    createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'water-ripple';
        ripple.style.position = 'fixed';
        ripple.style.left = (x - 30) + 'px';
        ripple.style.top = (y - 30) + 'px';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 1500);
    }

    createSplash(x, y) {
        const splashCount = 8;
        
        for (let i = 0; i < splashCount; i++) {
            const splash = document.createElement('div');
            splash.className = 'water-splash';
            
            const angle = (i / splashCount) * Math.PI * 2;
            const distance = 30 + Math.random() * 20;
            const splashX = Math.cos(angle) * distance;
            const splashY = Math.sin(angle) * distance;
            
            splash.style.position = 'fixed';
            splash.style.left = x + 'px';
            splash.style.top = y + 'px';
            splash.style.setProperty('--splash-x', splashX + 'px');
            splash.style.setProperty('--splash-y', splashY + 'px');
            
            document.body.appendChild(splash);
            
            setTimeout(() => {
                splash.remove();
            }, 800);
        }
    }
}

// Дополнительные водные эффекты
class WaterTrailSystem {
    constructor() {
        this.trails = [];
        this.init();
    }

    init() {
        this.createTrails();
        this.addScrollEffect();
    }

    createTrails() {
        setInterval(() => {
            if (Math.random() < 0.2) {
                this.createTrail();
            }
        }, 1500);
    }

    createTrail() {
        const trail = document.createElement('div');
        trail.className = 'water-trail';
        trail.style.left = Math.random() * window.innerWidth + 'px';
        trail.style.animationDelay = Math.random() * 1 + 's';
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 3000);
    }

    addScrollEffect() {
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.createScrollDrops();
            }, 100);
        });
    }

    createScrollDrops() {
        for (let i = 0; i < 3; i++) {
            const drop = document.createElement('div');
            drop.className = 'water-drop';
            drop.style.left = Math.random() * window.innerWidth + 'px';
            drop.style.animationDuration = '1s';
            drop.style.transform = 'scale(0.7)';
            
            document.body.appendChild(drop);
            
            setTimeout(() => {
                drop.remove();
            }, 1000);
        }
    }
}

// Инициализация водных эффектов
document.addEventListener('DOMContentLoaded', () => {
    new WaterDropSystem();
    new WaterTrailSystem();
});