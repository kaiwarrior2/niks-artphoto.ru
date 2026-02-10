// Accessibility Mode Toggle
class AccessibilityMode {
    constructor() {
        this.isActive = localStorage.getItem('accessibilityMode') === 'true';
        this.init();
    }

    init() {
        this.createToggleButton();
        if (this.isActive) {
            this.enable();
        }
    }

    createToggleButton() {
        const button = document.createElement('button');
        button.className = 'accessibility-toggle';
        button.innerHTML = '👁️ Режим для слабовидящих';
        button.setAttribute('aria-label', 'Переключить режим для слабовидящих');
        button.onclick = () => this.toggle();
        document.body.appendChild(button);
    }

    toggle() {
        this.isActive = !this.isActive;
        localStorage.setItem('accessibilityMode', this.isActive);
        
        if (this.isActive) {
            this.enable();
        } else {
            this.disable();
        }
    }

    enable() {
        document.body.classList.add('accessibility-mode');
    }

    disable() {
        document.body.classList.remove('accessibility-mode');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new AccessibilityMode();
});
