// EmailJS Configuration
const EMAILJS_CONFIG = {
    publicKey: 'LSwA-xzB45bKDupMQ',
    serviceId: 'service_d81puuy',
    templateId: 'template_jz3059x'
};

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_CONFIG.publicKey);
}

function sendEmail(toEmail, userName, type) {
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS не загружен');
        return;
    }
    
    const code = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem('verificationCode', code);
    
    const templateParams = {
        'Электронная почта': toEmail,
        'пароль': code,
        'Время': new Date().toLocaleString('ru-RU')
    };
    
    console.log('Отправка email...', templateParams);
    
    emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
        .then((response) => {
            console.log('Email отправлен!', response);
            alert('Код отправлен на ' + toEmail);
        })
        .catch((err) => {
            console.error('Ошибка отправки:', err);
            alert('Ошибка отправки письма: ' + err.text);
        });
}

function sendVerificationCode() {
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    
    if (!email || !name || !password) {
        alert('Заполните все поля');
        return;
    }
    
    sendEmail(email, name, 'register');
    document.getElementById('codeField').style.display = 'block';
    document.getElementById('registerBtn').style.display = 'block';
}

function sendLoginCode() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        alert('Введите email и пароль');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        alert('Неверный email или пароль');
        return;
    }
    
    const code = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem('loginCode_' + email, code);
    
    const templateParams = {
        'Электронная почта': email,
        'пароль': code,
        'Время': new Date().toLocaleString('ru-RU')
    };
    
    emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
        .then(() => {
            alert('Код отправлен на ' + email);
            document.getElementById('codeFieldLogin').style.display = 'block';
            document.getElementById('loginBtn').style.display = 'block';
        })
        .catch((err) => {
            alert('Ошибка отправки: ' + err.text);
        });
}

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
        const code = document.getElementById('code').value;
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            alert('Неверный email или пароль');
            return;
        }
        
        const savedCode = localStorage.getItem('loginCode_' + email);
        if (code !== savedCode) {
            alert('Неверный код подтверждения');
            return;
        }
        
        localStorage.setItem('currentUser', JSON.stringify({name: user.name, email: user.email}));
        localStorage.removeItem('loginCode_' + email);
        alert('Вход выполнен!');
        window.location.href = 'index.html';
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
        const code = document.getElementById('code').value;
        
        const savedCode = localStorage.getItem('verificationCode');
        
        if (code !== savedCode) {
            alert('Неверный код подтверждения');
            return;
        }
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.find(u => u.email === email)) {
            alert('Пользователь с таким email уже существует');
            return;
        }
        
        users.push({name, email, password});
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.removeItem('verificationCode');
        alert('Регистрация успешна!');
        window.location.href = 'login.html';
    });
}
