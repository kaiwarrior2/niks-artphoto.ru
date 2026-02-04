// Система аналитики и отслеживания
class AnalyticsSystem {
    constructor() {
        this.events = [];
        this.sessionStart = Date.now();
        this.init();
    }

    init() {
        this.trackPageView();
        this.trackUserInteractions();
        this.trackPerformance();
        this.trackScrollDepth();
        this.setupHeatmap();
    }

    // Отслеживание просмотров страниц
    trackPageView() {
        const pageData = {
            event: 'page_view',
            page: window.location.pathname,
            title: document.title,
            referrer: document.referrer,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
            screenResolution: `${screen.width}x${screen.height}`,
            viewportSize: `${window.innerWidth}x${window.innerHeight}`
        };
        
        this.logEvent(pageData);
    }

    // Отслеживание взаимодействий пользователя
    trackUserInteractions() {
        // Клики по кнопкам
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn, .nav-link, .portfolio-item')) {
                this.logEvent({
                    event: 'click',
                    element: e.target.tagName.toLowerCase(),
                    className: e.target.className,
                    text: e.target.textContent.trim().substring(0, 50),
                    href: e.target.href || null,
                    timestamp: Date.now()
                });
            }
        });

        // Отслеживание времени на странице
        let timeOnPage = 0;
        setInterval(() => {
            timeOnPage += 10;
            if (timeOnPage % 30 === 0) { // Каждые 30 секунд
                this.logEvent({
                    event: 'time_on_page',
                    duration: timeOnPage,
                    timestamp: Date.now()
                });
            }
        }, 10000);

        // Отслеживание ухода со страницы
        window.addEventListener('beforeunload', () => {
            this.logEvent({
                event: 'page_exit',
                timeOnPage: Date.now() - this.sessionStart,
                timestamp: Date.now()
            });
            this.sendEvents();
        });
    }

    // Отслеживание производительности
    trackPerformance() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const paintData = performance.getEntriesByType('paint');
                
                this.logEvent({
                    event: 'performance',
                    loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                    firstPaint: paintData.find(p => p.name === 'first-paint')?.startTime || 0,
                    firstContentfulPaint: paintData.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
                    timestamp: Date.now()
                });
            }, 1000);
        });
    }

    // Отслеживание глубины прокрутки
    trackScrollDepth() {
        let maxScroll = 0;
        let scrollMilestones = [25, 50, 75, 100];
        let trackedMilestones = [];

        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
            }

            scrollMilestones.forEach(milestone => {
                if (scrollPercent >= milestone && !trackedMilestones.includes(milestone)) {
                    trackedMilestones.push(milestone);
                    this.logEvent({
                        event: 'scroll_depth',
                        depth: milestone,
                        timestamp: Date.now()
                    });
                }
            });
        });
    }

    // Простая тепловая карта
    setupHeatmap() {
        const heatmapData = [];
        
        document.addEventListener('click', (e) => {
            heatmapData.push({
                x: e.clientX,
                y: e.clientY,
                timestamp: Date.now()
            });
            
            // Сохраняем в localStorage для анализа
            localStorage.setItem('heatmapData', JSON.stringify(heatmapData.slice(-100))); // Последние 100 кликов
        });
    }

    // Логирование событий
    logEvent(eventData) {
        this.events.push(eventData);
        
        // Отправляем события пачками
        if (this.events.length >= 10) {
            this.sendEvents();
        }
    }

    // Отправка событий (в реальном проекте - на сервер)
    sendEvents() {
        if (this.events.length === 0) return;
        
        // В демо версии сохраняем в localStorage
        const existingEvents = JSON.parse(localStorage.getItem('analyticsEvents') || '[]');
        const allEvents = [...existingEvents, ...this.events];
        localStorage.setItem('analyticsEvents', JSON.stringify(allEvents.slice(-1000))); // Последние 1000 событий
        
        console.log('Analytics events sent:', this.events);
        this.events = [];
    }

    // Получение статистики
    getStats() {
        const events = JSON.parse(localStorage.getItem('analyticsEvents') || '[]');
        
        return {
            totalEvents: events.length,
            pageViews: events.filter(e => e.event === 'page_view').length,
            clicks: events.filter(e => e.event === 'click').length,
            averageTimeOnPage: this.calculateAverageTime(events),
            topClickedElements: this.getTopClickedElements(events),
            performanceMetrics: this.getPerformanceMetrics(events)
        };
    }

    calculateAverageTime(events) {
        const timeEvents = events.filter(e => e.event === 'time_on_page');
        if (timeEvents.length === 0) return 0;
        
        const totalTime = timeEvents.reduce((sum, e) => sum + e.duration, 0);
        return Math.round(totalTime / timeEvents.length);
    }

    getTopClickedElements(events) {
        const clicks = events.filter(e => e.event === 'click');
        const elementCounts = {};
        
        clicks.forEach(click => {
            const key = click.className || click.element;
            elementCounts[key] = (elementCounts[key] || 0) + 1;
        });
        
        return Object.entries(elementCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([element, count]) => ({ element, count }));
    }

    getPerformanceMetrics(events) {
        const perfEvents = events.filter(e => e.event === 'performance');
        if (perfEvents.length === 0) return null;
        
        const latest = perfEvents[perfEvents.length - 1];
        return {
            loadTime: latest.loadTime,
            domContentLoaded: latest.domContentLoaded,
            firstPaint: latest.firstPaint,
            firstContentfulPaint: latest.firstContentfulPaint
        };
    }
}

// A/B тестирование
class ABTestingSystem {
    constructor() {
        this.tests = {};
        this.init();
    }

    init() {
        this.setupTests();
        this.applyTests();
    }

    setupTests() {
        // Пример A/B теста для цвета кнопки
        this.tests.buttonColor = {
            variants: ['orange', 'blue', 'green'],
            weights: [0.5, 0.25, 0.25] // 50% оранжевый, 25% синий, 25% зеленый
        };

        // Пример теста заголовка
        this.tests.heroTitle = {
            variants: [
                'Тут надо уметь: Действовать',
                'Каждый кадр — произведение искусства',
                'Фотография как способ видеть мир'
            ],
            weights: [0.4, 0.3, 0.3]
        };
    }

    getVariant(testName) {
        const test = this.tests[testName];
        if (!test) return null;

        // Проверяем, есть ли уже сохраненный вариант для этого пользователя
        const savedVariant = localStorage.getItem(`ab_test_${testName}`);
        if (savedVariant) return savedVariant;

        // Выбираем случайный вариант на основе весов
        const random = Math.random();
        let cumulativeWeight = 0;
        
        for (let i = 0; i < test.variants.length; i++) {
            cumulativeWeight += test.weights[i];
            if (random <= cumulativeWeight) {
                const variant = test.variants[i];
                localStorage.setItem(`ab_test_${testName}`, variant);
                return variant;
            }
        }
        
        return test.variants[0]; // Fallback
    }

    applyTests() {
        // Применяем тест цвета кнопки
        const buttonVariant = this.getVariant('buttonColor');
        if (buttonVariant !== 'orange') {
            const buttons = document.querySelectorAll('.btn-primary');
            buttons.forEach(btn => {
                if (buttonVariant === 'blue') {
                    btn.style.background = 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
                } else if (buttonVariant === 'green') {
                    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                }
            });
        }

        // Применяем тест заголовка
        const titleVariant = this.getVariant('heroTitle');
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && titleVariant !== 'Тут надо уметь: Действовать') {
            heroTitle.innerHTML = `<span class="title-line highlight">${titleVariant}</span>`;
        }

        // Логируем участие в тестах
        analytics.logEvent({
            event: 'ab_test_participation',
            tests: {
                buttonColor: buttonVariant,
                heroTitle: titleVariant
            },
            timestamp: Date.now()
        });
    }

    trackConversion(testName, conversionType) {
        const variant = localStorage.getItem(`ab_test_${testName}`);
        if (variant) {
            analytics.logEvent({
                event: 'ab_test_conversion',
                testName,
                variant,
                conversionType,
                timestamp: Date.now()
            });
        }
    }
}

// Инициализация систем
const analytics = new AnalyticsSystem();
const abTesting = new ABTestingSystem();

// Экспорт для использования в других скриптах
window.analytics = analytics;
window.abTesting = abTesting;

// Отправка событий при закрытии страницы
window.addEventListener('beforeunload', () => {
    analytics.sendEvents();
});