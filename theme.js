class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        this.applyTheme();
        this.createToggle();
    }

    applyTheme() {
        if (this.theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
        this.updateIcon();
    }

    createToggle() {
        const toggle = document.createElement('div');
        toggle.className = 'theme-toggle';
        toggle.innerHTML = `<div class="theme-icon">${this.theme === 'dark' ? '🌙' : '☀️'}</div>`;
        toggle.onclick = () => this.toggleTheme();
        document.body.appendChild(toggle);
    }

    updateIcon() {
        const icon = document.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = this.theme === 'dark' ? '🌙' : '☀️';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});
