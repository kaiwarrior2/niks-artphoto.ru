// Simple Auth System
(function() {
    const authNavItem = document.getElementById('authNavItem');
    if (!authNavItem) return;

    const currentUser = localStorage.getItem('currentUser');
    
    if (currentUser) {
        const user = JSON.parse(currentUser);
        authNavItem.innerHTML = `
            <a href="#" class="nav-link" onclick="logout(); return false;">
                👤 ${user.name} (Выйти)
            </a>
        `;
    } else {
        authNavItem.innerHTML = `
            <a href="login.html" class="nav-link">🔐 Войти</a>
        `;
    }
})();

function logout() {
    localStorage.removeItem('currentUser');
    window.location.reload();
}

// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify({name: user.name, email: user.email}));
            alert('Вход выполнен!');
            window.location.href = 'index.html';
        } else {
            alert('Неверный email или пароль');
        }
    });
}

// Register Form Handler
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.find(u => u.email === email)) {
            alert('Пользователь с таким email уже существует');
            return;
        }
        
        users.push({name, email, password});
        localStorage.setItem('users', JSON.stringify(users));
        alert('Регистрация успешна!');
        window.location.href = 'login.html';
    });
}
