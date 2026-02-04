# 🚀 Быстрый деплой на GitHub

## Команды для терминала

Скопируйте и выполните по порядку в папке проекта:

```bash
# 1. Инициализация Git
git init

# 2. Добавление всех файлов
git add .

# 3. Первый коммит
git commit -m "Initial commit: Niks Photography Website with Universal Burger Menu"

# 4. Подключение к GitHub (замените YOUR_USERNAME и REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 5. Загрузка на GitHub
git branch -M main
git push -u origin main
```

## Перед выполнением команд:

1. **Создайте репозиторий на GitHub:**
   - Перейдите на github.com
   - Нажмите "New repository"
   - Назовите репозиторий (например: `niks-artphoto`)
   - НЕ добавляйте README, .gitignore или лицензию
   - Нажмите "Create repository"

2. **Замените в команде выше:**
   - `YOUR_USERNAME` - ваш логин на GitHub
   - `REPO_NAME` - название созданного репозитория

## Пример:
Если ваш логин `photographer123` и репозиторий `niks-website`:
```bash
git remote add origin https://github.com/photographer123/niks-website.git
```

## После загрузки:

**Настройка GitHub Pages (бесплатный хостинг):**
1. В репозитории → Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: main, folder: / (root)
4. Save

Сайт будет доступен: `https://YOUR_USERNAME.github.io/REPO_NAME`

## Обновление файлов в будущем:
```bash
git add .
git commit -m "Описание изменений"
git push origin main
```

---
✅ **Готово! Ваш сайт на GitHub!**