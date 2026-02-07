// Likes Database System
class LikesDB {
    constructor() {
        this.storageKey = 'portfolio_likes';
        this.init();
    }
    
    init() {
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify({}));
        }
        this.loadLikes();
    }
    
    getData() {
        return JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    }
    
    saveData(data) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }
    
    getLikes(imageId) {
        const data = this.getData();
        return data[imageId] || { count: 0, liked: false };
    }
    
    setLike(imageId, liked) {
        const data = this.getData();
        if (!data[imageId]) {
            data[imageId] = { count: 0, liked: false };
        }
        
        if (liked && !data[imageId].liked) {
            data[imageId].count++;
            data[imageId].liked = true;
        } else if (!liked && data[imageId].liked) {
            data[imageId].count = Math.max(0, data[imageId].count - 1);
            data[imageId].liked = false;
        }
        
        this.saveData(data);
        return data[imageId];
    }
    
    loadLikes() {
        document.querySelectorAll('.portfolio-item').forEach((item, index) => {
            const imageId = `image_${index}`;
            const likeData = this.getLikes(imageId);
            
            const btn = item.querySelector('.like-btn');
            const img = btn.querySelector('img');
            
            let counter = item.querySelector('.like-counter');
            if (!counter) {
                counter = document.createElement('span');
                counter.className = 'like-counter';
                item.insertBefore(counter, btn);
            }
            
            counter.textContent = likeData.count;
            
            if (likeData.liked) {
                btn.classList.add('liked');
                img.src = 'images/like.png';
            }
            
            btn.setAttribute('data-image-id', imageId);
        });
    }
}

const likesDB = new LikesDB();

function toggleLike(btn) {
    const imageId = btn.getAttribute('data-image-id');
    const item = btn.closest('.portfolio-item');
    const img = btn.querySelector('img');
    const isLiked = btn.classList.contains('liked');
    
    const newLikeData = likesDB.setLike(imageId, !isLiked);
    
    const counter = item.querySelector('.like-counter');
    counter.textContent = newLikeData.count;
    
    if (newLikeData.liked) {
        img.src = 'images/like.png';
        btn.classList.add('liked');
        counter.classList.add('liked-animation');
        setTimeout(() => counter.classList.remove('liked-animation'), 500);
    } else {
        img.src = 'images/like-off.png';
        btn.classList.remove('liked');
    }
}
