// Authentication System
class AuthSystem {
    constructor() {
        this.currentUser = this.loadUser();
        this.init();
    }

    init() {
        this.setupLoginForm();
        this.setupRegisterForm();
        this.updateNavigation();
    }

    setupLoginForm() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
    }

    setupRegisterForm() {
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }
    }

    handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            this.currentUser = { name: user.name, email: user.email };
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.showMessage('Вход выполнен успешно!', 'success');
            setTimeout(() => window.location.href = 'index.html', 1000);
        } else {
            this.showMessage('Неверный email или пароль', 'error');
        }
    }

    handleRegister() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            this.showMessage('Пароли не совпадают', 'error');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.find(u => u.email === email)) {
            this.showMessage('Пользователь с таким email уже существует', 'error');
            return;
        }

        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        
        this.showMessage('Регистрация успешна! Перенаправление...', 'success');
        setTimeout(() => window.location.href = 'login.html', 1500);
    }

    loadUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        window.location.href = 'index.html';
    }

    updateNavigation() {
        const navMenu = document.getElementById('nav-menu');
        if (!navMenu) return;

        const existingUserMenu = document.querySelector('.user-menu');
        if (existingUserMenu) existingUserMenu.remove();

        if (this.currentUser) {
            const userMenu = document.createElement('li');
            userMenu.className = 'user-menu';
            userMenu.innerHTML = `
                <div class="user-avatar" id="userAvatar">${this.currentUser.name.charAt(0).toUpperCase()}</div>
                <div class="user-dropdown" id="userDropdown">
                    <a href="#">${this.currentUser.name}</a>
                    <button id="logoutBtn">Выйти</button>
                </div>
            `;
            navMenu.appendChild(userMenu);

            document.getElementById('userAvatar').addEventListener('click', () => {
                document.getElementById('userDropdown').classList.toggle('active');
            });

            document.getElementById('logoutBtn').addEventListener('click', () => {
                this.logout();
            });
        } else {
            const loginLink = document.createElement('li');
            loginLink.innerHTML = '<a href="login.html" class="nav-link">🔐 Вход</a>';
            navMenu.appendChild(loginLink);
        }
    }

    showMessage(text, type) {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        message.textContent = text;
        document.body.appendChild(message);

        setTimeout(() => {
            message.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }
}

// Initialize auth system
document.addEventListener('DOMContentLoaded', () => {
    window.authSystem = new AuthSystem();
});

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);
