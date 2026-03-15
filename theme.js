// Theme Manager
const themes = {
    dark: {
        name: 'Темная',
        colors: {
            '--primary-color': '#e4e4e7',
            '--secondary-color': '#f59e0b',
            '--accent-color': '#fb923c',
            '--text-dark': '#f4f4f5',
            '--text-light': '#a1a1aa',
            '--bg-light': '#18181b',
            '--bg-dark': '#09090b',
            '--bg-card': '#27272a',
            '--gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '--gradient-secondary': 'linear-gradient(135deg, #f59e0b 0%, #fb923c 100%)',
            '--gradient-tertiary': 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
            '--gradient-dark': 'linear-gradient(135deg, #1e1e1e 0%, #2d2d30 100%)',
            '--gradient-animated': 'linear-gradient(-45deg, #667eea, #764ba2, #f59e0b, #fb923c)',
            '--shadow-light': '0 5px 15px rgba(0, 0, 0, 0.3)',
            '--shadow-medium': '0 10px 30px rgba(0, 0, 0, 0.4)',
            '--shadow-heavy': '0 20px 60px rgba(0, 0, 0, 0.5)',
            '--shadow-glow': '0 0 20px rgba(245, 158, 11, 0.3)',
            '--shadow-neon': '0 0 5px rgba(245, 158, 11, 0.5), 0 0 10px rgba(245, 158, 11, 0.4), 0 0 15px rgba(245, 158, 11, 0.3)'
        }
    },
    light: {
        name: 'Светлая',
        colors: {
            '--primary-color': '#000000',
            '--secondary-color': '#f59e0b',
            '--accent-color': '#fb923c',
            '--text-dark': '#000000',
            '--text-light': '#000000',
            '--bg-light': '#ffffff',
            '--bg-dark': '#f4f4f5',
            '--bg-card': '#fafafa',
            '--gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '--gradient-secondary': 'linear-gradient(135deg, #f59e0b 0%, #fb923c 100%)',
            '--gradient-tertiary': 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
            '--gradient-dark': 'linear-gradient(135deg, #e5e5e5 0%, #d4d4d4 100%)',
            '--gradient-animated': 'linear-gradient(-45deg, #667eea, #764ba2, #f59e0b, #fb923c)',
            '--shadow-light': '0 5px 15px rgba(0, 0, 0, 0.1)',
            '--shadow-medium': '0 10px 30px rgba(0, 0, 0, 0.15)',
            '--shadow-heavy': '0 20px 60px rgba(0, 0, 0, 0.2)',
            '--shadow-glow': '0 0 20px rgba(245, 158, 11, 0.3)',
            '--shadow-neon': '0 0 5px rgba(245, 158, 11, 0.5), 0 0 10px rgba(245, 158, 11, 0.4), 0 0 15px rgba(245, 158, 11, 0.3)'
        }
    },
    blue: {
        name: 'Темно-синяя',
        colors: {
            '--primary-color': '#e0e7ff',
            '--secondary-color': '#3b82f6',
            '--accent-color': '#60a5fa',
            '--text-dark': '#e0e7ff',
            '--text-light': '#93c5fd',
            '--bg-light': '#0f172a',
            '--bg-dark': '#020617',
            '--bg-card': '#1e293b',
            '--gradient-primary': 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
            '--gradient-secondary': 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
            '--gradient-tertiary': 'linear-gradient(135deg, #2563eb 0%, #7dd3fc 100%)',
            '--gradient-dark': 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            '--gradient-animated': 'linear-gradient(-45deg, #3b82f6, #1e40af, #60a5fa, #2563eb)',
            '--shadow-light': '0 5px 15px rgba(0, 0, 0, 0.3)',
            '--shadow-medium': '0 10px 30px rgba(0, 0, 0, 0.4)',
            '--shadow-heavy': '0 20px 60px rgba(0, 0, 0, 0.5)',
            '--shadow-glow': '0 0 20px rgba(59, 130, 246, 0.3)',
            '--shadow-neon': '0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.4), 0 0 15px rgba(59, 130, 246, 0.3)'
        }
    }
};

function getCurrentTheme() {
    return localStorage.getItem('theme') || 'dark';
}

function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;
    
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });
    
    localStorage.setItem('theme', themeName);
}

function createThemeSwitcher() {
    const switcher = document.createElement('div');
    switcher.className = 'theme-switcher';
    switcher.innerHTML = `
        <button class="theme-btn" data-theme="dark" title="Темная тема">🌙</button>
        <button class="theme-btn" data-theme="light" title="Светлая тема">☀️</button>
        <button class="theme-btn" data-theme="blue" title="Темно-синяя тема">🌊</button>
    `;
    
    document.body.appendChild(switcher);
    
    switcher.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            applyTheme(theme);
            updateActiveButton(theme);
        });
    });
    
    updateActiveButton(getCurrentTheme());
}

function updateActiveButton(themeName) {
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === themeName);
    });
}

function addThemeSwitcherStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .theme-switcher {
            position: fixed;
            bottom: 30px;
            right: 30px;
            display: flex;
            gap: 10px;
            background: var(--bg-card);
            padding: 10px;
            border-radius: 50px;
            box-shadow: var(--shadow-medium);
            z-index: 1000;
            backdrop-filter: blur(10px);
            border: 2px solid rgba(245, 158, 11, 0.2);
        }
        
        .theme-btn {
            width: 45px;
            height: 45px;
            border: none;
            border-radius: 50%;
            background: var(--bg-light);
            cursor: pointer;
            font-size: 1.5rem;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .theme-btn:hover {
            transform: scale(1.1);
            box-shadow: var(--shadow-glow);
        }
        
        .theme-btn.active {
            background: var(--secondary-color);
            box-shadow: var(--shadow-glow);
        }
        
        @media (max-width: 768px) {
            .theme-switcher {
                bottom: 20px;
                right: 20px;
                padding: 8px;
                gap: 8px;
            }
            
            .theme-btn {
                width: 40px;
                height: 40px;
                font-size: 1.2rem;
            }
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', () => {
    addThemeSwitcherStyles();
    applyTheme(getCurrentTheme());
    createThemeSwitcher();
});
