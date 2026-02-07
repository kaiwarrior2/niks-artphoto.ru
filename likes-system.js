// Система лайков для всех пользователей
class LikesSystem {
    constructor() {
        this.storageKey = 'portfolio_likes';
        this.userLikesKey = 'user_likes';
        this.init();
    }

    init() {
        this.loadLikes();
        this.updateAllCounters();
    }

    // Получить все лайки
    getLikes() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : {};
    }

    // Получить лайки пользователя
    getUserLikes() {
        const data = localStorage.getItem(this.userLikesKey);
        return data ? JSON.parse(data) : [];
    }

    // Сохранить лайки
    saveLikes(likes) {
        localStorage.setItem(this.storageKey, JSON.stringify(likes));
    }

    // Сохранить лайки пользователя
    saveUserLikes(userLikes) {
        localStorage.setItem(this.userLikesKey, JSON.stringify(userLikes));
    }

    // Получить ID фото
    getPhotoId(element) {
        const img = element.closest('.portfolio-item').querySelector('.portfolio-image');
        return img.src.split('/').pop();
    }

    // Переключить лайк
    toggleLike(btn) {
        const photoId = this.getPhotoId(btn);
        const likes = this.getLikes();
        const userLikes = this.getUserLikes();
        const img = btn.querySelector('img');
        
        const isLiked = userLikes.includes(photoId);
        
        if (isLiked) {
            // Убрать лайк
            likes[photoId] = Math.max(0, (likes[photoId] || 0) - 1);
            const index = userLikes.indexOf(photoId);
            userLikes.splice(index, 1);
            img.src = 'images/like-off.png';
            btn.classList.remove('liked');
        } else {
            // Добавить лайк
            likes[photoId] = (likes[photoId] || 0) + 1;
            userLikes.push(photoId);
            img.src = 'images/like.png';
            btn.classList.add('liked');
        }
        
        this.saveLikes(likes);
        this.saveUserLikes(userLikes);
        this.updateCounter(btn, likes[photoId]);
        
        // Анимация
        btn.classList.add('liked-animation');
        setTimeout(() => btn.classList.remove('liked-animation'), 500);
    }

    // Обновить счетчик
    updateCounter(btn, count) {
        let counter = btn.parentElement.querySelector('.like-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'like-counter';
            btn.parentElement.appendChild(counter);
        }
        counter.textContent = count || 0;
    }

    // Обновить все счетчики
    updateAllCounters() {
        const likes = this.getLikes();
        const userLikes = this.getUserLikes();
        
        document.querySelectorAll('.portfolio-item').forEach(item => {
            const btn = item.querySelector('.like-btn');
            const img = btn.querySelector('img');
            const photoId = this.getPhotoId(btn);
            const count = likes[photoId] || 0;
            
            // Установить состояние кнопки
            if (userLikes.includes(photoId)) {
                img.src = 'images/like.png';
                btn.classList.add('liked');
            }
            
            // Обновить счетчик
            this.updateCounter(btn, count);
        });
    }

    // Загрузить лайки
    loadLikes() {
        // Инициализация, если данных нет
        if (!localStorage.getItem(this.storageKey)) {
            this.saveLikes({});
        }
        if (!localStorage.getItem(this.userLikesKey)) {
            this.saveUserLikes([]);
        }
    }
}

// Глобальная функция для кнопок
function toggleLike(btn) {
    window.likesSystem.toggleLike(btn);
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    window.likesSystem = new LikesSystem();
});
