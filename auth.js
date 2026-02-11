// Регистрация
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Проверка существующих пользователей
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.find(u => u.email === email)) {
            showMessage('Пользователь с таким email уже существует', 'error');
            return;
        }
        
        // Сохранение пользователя
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        
        showMessage('Регистрация успешна! Перенаправление...', 'success');
        setTimeout(() => window.location.href = 'login.html', 1500);
    });
}

// Вход
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            showMessage('Вход выполнен! Перенаправление...', 'success');
            setTimeout(() => window.location.href = 'index.html', 1500);
        } else {
            showMessage('Неверный email или пароль', 'error');
        }
    });
}

// Показ сообщений
function showMessage(text, type) {
    const existing = document.querySelector('.error, .success');
    if (existing) existing.remove();
    
    const msg = document.createElement('div');
    msg.className = type;
    msg.textContent = text;
    document.querySelector('form').prepend(msg);
}

// Проверка авторизации на других страницах
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user;
}

// Выход
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
