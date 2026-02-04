// Система уведомлений и обратной связи
class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.init();
    }

    init() {
        this.createContainer();
        this.addStyles();
        this.setupInstallPrompt();
        this.setupOfflineDetection();
    }

    createContainer() {
        const container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
        this.container = container;
    }

    addStyles() {
        const styles = `
            .notification-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10001;
                pointer-events: none;
            }
            
            .notification {
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                margin-bottom: 10px;
                min-width: 300px;
                max-width: 400px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                backdrop-filter: blur(10px);
                border-left: 4px solid #f59e0b;
                transform: translateX(100%);
                opacity: 0;
                transition: all 0.3s ease;
                pointer-events: auto;
                position: relative;
            }
            
            .notification.show {
                transform: translateX(0);
                opacity: 1;
            }
            
            .notification.success {
                border-left-color: #10b981;
            }
            
            .notification.error {
                border-left-color: #ef4444;
            }
            
            .notification.info {
                border-left-color: #3b82f6;
            }
            
            .notification-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 5px;
            }
            
            .notification-title {
                font-weight: 600;
                font-size: 0.9rem;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                opacity: 0.7;
                transition: opacity 0.3s ease;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
            
            .notification-message {
                font-size: 0.85rem;
                opacity: 0.9;
                line-height: 1.4;
            }
            
            .notification-actions {
                margin-top: 10px;
                display: flex;
                gap: 10px;
            }
            
            .notification-btn {
                background: #f59e0b;
                color: white;
                border: none;
                padding: 5px 12px;
                border-radius: 5px;
                font-size: 0.8rem;
                cursor: pointer;
                transition: background 0.3s ease;
            }
            
            .notification-btn:hover {
                background: #d97706;
            }
            
            .notification-btn.secondary {
                background: transparent;
                border: 1px solid rgba(255, 255, 255, 0.3);
            }
            
            .notification-btn.secondary:hover {
                background: rgba(255, 255, 255, 0.1);
            }
            
            .install-prompt {
                background: linear-gradient(135deg, #f59e0b, #fb923c);
                border-left-color: #f59e0b;
            }
            
            @media (max-width: 768px) {
                .notification-container {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                }
                
                .notification {
                    min-width: auto;
                    max-width: none;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    show(options) {
        const notification = document.createElement('div');
        notification.className = `notification ${options.type || 'info'}`;
        
        notification.innerHTML = `
            <div class="notification-header">
                <div class="notification-title">${options.title || 'Уведомление'}</div>
                <button class="notification-close">&times;</button>
            </div>
            <div class="notification-message">${options.message}</div>
            ${options.actions ? `<div class="notification-actions">${options.actions}</div>` : ''}
        `;
        
        this.container.appendChild(notification);
        
        // Показываем уведомление
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Автоматическое скрытие
        if (options.duration !== 0) {
            setTimeout(() => this.hide(notification), options.duration || 5000);
        }
        
        // Закрытие по клику
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.hide(notification);
        });
        
        return notification;
    }

    hide(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    success(title, message, duration) {
        return this.show({
            type: 'success',
            title,
            message,
            duration
        });
    }

    error(title, message, duration) {
        return this.show({
            type: 'error',
            title,
            message,
            duration
        });
    }

    info(title, message, duration) {
        return this.show({
            type: 'info',
            title,
            message,
            duration
        });
    }

    setupInstallPrompt() {
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Показываем уведомление об установке
            const notification = this.show({
                type: 'info',
                title: 'Установить приложение',
                message: 'Установите сайт как приложение для быстрого доступа',
                duration: 0,
                actions: `
                    <button class="notification-btn" onclick="installApp()">Установить</button>
                    <button class="notification-btn secondary" onclick="dismissInstall()">Позже</button>
                `
            });
            
            notification.classList.add('install-prompt');
            
            window.installApp = () => {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        this.success('Успешно!', 'Приложение установлено');
                    }
                    deferredPrompt = null;
                });
                this.hide(notification);
            };
            
            window.dismissInstall = () => {
                this.hide(notification);
                localStorage.setItem('installPromptDismissed', Date.now());
            };
            
            // Не показываем, если недавно отклонили
            const dismissed = localStorage.getItem('installPromptDismissed');
            if (dismissed && Date.now() - dismissed < 7 * 24 * 60 * 60 * 1000) {
                this.hide(notification);
            }
        });
    }

    setupOfflineDetection() {
        window.addEventListener('online', () => {
            this.success('Подключение восстановлено', 'Вы снова онлайн');
        });
        
        window.addEventListener('offline', () => {
            this.info('Нет подключения', 'Сайт работает в офлайн режиме');
        });
    }
}

// Система обратной связи
class FeedbackSystem {
    constructor() {
        this.init();
    }

    init() {
        this.createFeedbackButton();
        this.setupFormHandlers();
    }

    createFeedbackButton() {
        const button = document.createElement('button');
        button.className = 'feedback-button';
        button.innerHTML = '💬';
        button.title = 'Обратная связь';
        
        const styles = `
            .feedback-button {
                position: fixed;
                bottom: 20px;
                left: 20px;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(135deg, #f59e0b, #fb923c);
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(245, 158, 11, 0.4);
                transition: all 0.3s ease;
                z-index: 1000;
                animation: pulse 2s infinite;
            }
            
            .feedback-button:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 25px rgba(245, 158, 11, 0.6);
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            @media (max-width: 768px) {
                .feedback-button {
                    bottom: 80px;
                    right: 20px;
                    left: auto;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
        
        button.addEventListener('click', () => {
            this.showFeedbackForm();
        });
        
        document.body.appendChild(button);
    }

    showFeedbackForm() {
        // Простая реализация - переход к контактной форме
        const contactSection = document.querySelector('.contact-cta');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = 'contact.html';
        }
    }

    setupFormHandlers() {
        // Улучшаем обработку форм
        document.addEventListener('submit', (e) => {
            if (e.target.matches('form')) {
                e.preventDefault();
                
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData);
                
                // Показываем состояние загрузки
                const submitBtn = e.target.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Отправка...';
                submitBtn.disabled = true;
                
                // Имитация отправки
                setTimeout(() => {
                    notifications.success('Сообщение отправлено!', 'Спасибо за обращение. Я свяжусь с вами в ближайшее время.');
                    e.target.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
}

// Глобальные экземпляры
const notifications = new NotificationSystem();
const feedback = new FeedbackSystem();

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    // Приветственное уведомление
    setTimeout(() => {
        notifications.info('Добро пожаловать!', 'Изучите мое портфолио и свяжитесь для сотрудничества', 4000);
    }, 2000);
});