# Django Backend для niks-artphoto.ru

## Установка

1. Активируйте виртуальное окружение:
```bash
cd backend
venv\Scripts\activate
```

2. База данных уже создана и настроена

3. Создайте суперпользователя:
```bash
python manage.py createsuperuser
```

4. Запустите сервер:
```bash
python manage.py runserver
```

## Доступные страницы

- `http://127.0.0.1:8000/` - Главная страница (index.html)
- `http://127.0.0.1:8000/portfolio/` - Портфолио (portfolio.html)
- `http://127.0.0.1:8000/admin/` - Админка Django

## API Endpoints

- `/api/categories/` - Категории фото
- `/api/photos/` - Фотографии
- `/api/photos/{id}/like/` - Лайкнуть фото (POST)
- `/api/team/` - Команда
- `/api/blog/` - Блог посты
- `/api/contact/` - Контактные сообщения (GET, POST)

## Быстрый запуск

Из корневой папки проекта:
```bash
start_server.bat
```

## Модели БД

- **Category** - Категории фотографий (портреты, уличные)
- **Photo** - Фотографии с лайками
- **TeamMember** - Члены команды (Макар, Яна, Артур)
- **BlogPost** - Посты блога
- **ContactMessage** - Сообщения от пользователей

## Примечания

- HTML файлы берутся из корневой папки проекта
- Статические файлы (CSS, JS, изображения) также из корневой папки
- База данных SQLite находится в `backend/db.sqlite3`
