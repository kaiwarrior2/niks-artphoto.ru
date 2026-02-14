// Система комментариев для портфолио
class CommentsSystem {
    constructor() {
        this.comments = JSON.parse(localStorage.getItem('portfolioComments') || '{}');
    }

    // Получить комментарии для фото
    getComments(photoId) {
        return this.comments[photoId] || [];
    }

    // Добавить комментарий
    addComment(photoId, text) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            alert('Войдите, чтобы оставить комментарий');
            return false;
        }

        if (!this.comments[photoId]) {
            this.comments[photoId] = [];
        }

        this.comments[photoId].push({
            user: currentUser.name,
            text: text,
            date: new Date().toLocaleString('ru-RU')
        });

        localStorage.setItem('portfolioComments', JSON.stringify(this.comments));
        return true;
    }

    // Показать комментарии в модальном окне
    renderComments(photoId) {
        const comments = this.getComments(photoId);
        let html = '<div class="comments-section">';
        
        comments.forEach(comment => {
            html += `
                <div class="comment">
                    <div class="comment-header">
                        <strong>${comment.user}</strong>
                        <span class="comment-date">${comment.date}</span>
                    </div>
                    <p>${comment.text}</p>
                </div>
            `;
        });

        html += '</div>';
        return html;
    }
}

const commentsSystem = new CommentsSystem();

// Добавить комментарий
function addComment(photoId) {
    const input = document.getElementById('commentInput');
    const text = input.value.trim();
    
    if (!text) {
        alert('Введите текст комментария');
        return;
    }

    if (commentsSystem.addComment(photoId, text)) {
        input.value = '';
        updateCommentsDisplay(photoId);
    }
}

// Обновить отображение комментариев
function updateCommentsDisplay(photoId) {
    const container = document.getElementById('commentsContainer');
    container.innerHTML = commentsSystem.renderComments(photoId);
}
