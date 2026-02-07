// Likes System
const likesData = {};

function toggleLike(btn) {
    const item = btn.closest('.portfolio-item');
    const img = btn.querySelector('img');
    const isLiked = btn.classList.contains('liked');
    
    // Get or create counter
    let counter = item.querySelector('.like-counter');
    if (!counter) {
        counter = document.createElement('span');
        counter.className = 'like-counter';
        counter.textContent = '0';
        item.insertBefore(counter, btn);
    }
    
    let count = parseInt(counter.textContent);
    
    if (isLiked) {
        img.src = 'images/like-off.png';
        btn.classList.remove('liked');
        count = Math.max(0, count - 1);
    } else {
        img.src = 'images/like.png';
        btn.classList.add('liked');
        count++;
        counter.classList.add('liked-animation');
        setTimeout(() => counter.classList.remove('liked-animation'), 500);
    }
    
    counter.textContent = count;
}
