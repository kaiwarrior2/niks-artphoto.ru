# Настройка EmailJS

## Шаг 1: Регистрация
1. Перейдите на https://www.emailjs.com/
2. Нажмите "Sign Up" (бесплатно)
3. Подтвердите email

## Шаг 2: Добавьте Email Service
1. В панели EmailJS → "Email Services"
2. Нажмите "Add New Service"
3. Выберите Gmail/Outlook/другой
4. Подключите свою почту
5. Скопируйте **Service ID**

## Шаг 3: Создайте Email Template
1. Перейдите в "Email Templates"
2. Нажмите "Create New Template"
3. Вставьте этот шаблон:

```
Subject: Подтверждение - Niks ArtPhoto

Здравствуйте, {{user_name}}!

{{message}}

С уважением,
Команда Niks ArtPhoto
```

4. Сохраните и скопируйте **Template ID**

## Шаг 4: Получите Public Key
1. Перейдите в "Account" → "General"
2. Скопируйте **Public Key**

## Шаг 5: Вставьте ключи в auth.js
Откройте `auth.js` и замените:

```javascript
const EMAILJS_CONFIG = {
    publicKey: 'ВАШ_PUBLIC_KEY',
    serviceId: 'ВАШ_SERVICE_ID',
    templateId: 'ВАШ_TEMPLATE_ID'
};
```

## Готово!
Теперь при регистрации и входе будут приходить письма на почту.

**Лимиты бесплатного тарифа:** 200 писем/месяц
