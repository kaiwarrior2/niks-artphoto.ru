# 🚀 Инструкция по загрузке на GitHub

## Шаг 1: Подготовка Git репозитория

Откройте терминал/командную строку в папке проекта и выполните:

```bash
# Инициализация Git репозитория
git init

# Добавление всех файлов
git add .

# Первый коммит
git commit -m "Initial commit: Niks Photography Website with Universal Burger Menu"
```

## Шаг 2: Создание репозитория на GitHub

1. Перейдите на [GitHub.com](https://github.com)
2. Нажмите кнопку **"New"** или **"+"** → **"New repository"**
3. Заполните данные:
   - **Repository name:** `niks-artphoto` (или любое другое имя)
   - **Description:** `Modern responsive photography portfolio website with PWA support`
   - **Visibility:** Public (или Private по желанию)
   - **НЕ** ставьте галочки на "Add a README file", "Add .gitignore", "Choose a license"
4. Нажмите **"Create repository"**

## Шаг 3: Подключение к GitHub

Скопируйте команды с созданной страницы репозитория или выполните:

```bash
# Добавление удаленного репозитория (замените YOUR_USERNAME и REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Переименование основной ветки в main (если нужно)
git branch -M main

# Загрузка на GitHub
git push -u origin main
```

## Шаг 4: Настройка GitHub Pages (опционально)

Для бесплатного хостинга:

1. В репозитории перейдите в **Settings**
2. Прокрутите до раздела **Pages**
3. В **Source** выберите **"Deploy from a branch"**
4. Выберите ветку **main** и папку **/ (root)**
5. Нажмите **Save**

Сайт будет доступен по адресу: `https://YOUR_USERNAME.github.io/REPO_NAME`

## Шаг 5: Обновление файлов

Для последующих изменений:

```bash
# Добавить измененные файлы
git add .

# Создать коммит с описанием изменений
git commit -m "Update: описание изменений"

# Загрузить на GitHub
git push origin main
```

## 📋 Полезные команды Git

```bash
# Проверить статус файлов
git status

# Посмотреть историю коммитов
git log --oneline

# Создать новую ветку
git checkout -b feature/new-feature

# Переключиться между ветками
git checkout main

# Слить ветку
git merge feature/new-feature

# Клонировать репозиторий
git clone https://github.com/YOUR_USERNAME/REPO_NAME.git
```

## 🔧 Настройка для командной работы

Если работаете в команде, настройте:

```bash
# Настройка имени и email
git config --global user.name "Ваше Имя"
git config --global user.email "your.email@example.com"

# Настройка редактора по умолчанию
git config --global core.editor "code --wait"  # для VS Code
```

## 📁 Структура коммитов

Рекомендуемый формат сообщений коммитов:

```
feat: добавить новую функцию
fix: исправить ошибку
docs: обновить документацию
style: изменения стилей
refactor: рефакторинг кода
test: добавить тесты
chore: обновление зависимостей
```

Примеры:
```bash
git commit -m "feat: add universal burger menu for all pages"
git commit -m "fix: resolve mobile navigation issues"
git commit -m "docs: update README with installation guide"
```

## 🚀 Автоматический деплой

Для автоматического деплоя при каждом push создайте файл `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

## ✅ Проверка

После загрузки проверьте:
- [ ] Все файлы загружены
- [ ] README.md отображается корректно
- [ ] GitHub Pages работает (если настроен)
- [ ] Ссылки в README работают
- [ ] Изображения отображаются

## 🆘 Решение проблем

**Проблема:** `fatal: remote origin already exists`
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

**Проблема:** Большие файлы не загружаются
```bash
# Добавить в .gitignore и удалить из отслеживания
echo "large-file.zip" >> .gitignore
git rm --cached large-file.zip
git commit -m "Remove large file"
```

**Проблема:** Конфликт при push
```bash
git pull origin main --rebase
git push origin main
```

---

🎉 **Готово! Ваш сайт теперь на GitHub!**