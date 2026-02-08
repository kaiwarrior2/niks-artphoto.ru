@echo off
cd backend
call venv\Scripts\activate
python manage.py runserver
