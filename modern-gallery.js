// Современная галерея с лайтбоксом
class ModernGallery {
    constructor() {
        this.currentIndex = 0;
        this.images = [];
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createLightbox();
        this.bindEvents();
        this.setupImageObserver();
    }

    createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'modern-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-container">
                <button class="lightbox-close" aria-label="Закрыть">&times;</button>
                <button class="lightbox-prev" aria-label="Предыдущее">‹</button>
                <button class="lightbox-next" aria-label="Следующее">›</button>
                <div class="lightbox-content">
                    <img class="lightbox-image" src="" alt="">
                    <div class="lightbox-info">
                        <h3 class="lightbox-title"></h3>
                        <p class="lightbox-description"></p>
                        <div class="lightbox-counter">
                            <span class="current">1</span> / <span class="total">1</span>
                        </div>
                    </div>
                </div>
                <div class="lightbox-thumbnails"></div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        this.lightbox = lightbox;
        this.addLightboxStyles();
    }

    addLightboxStyles() {
        const styles = `
            .modern-lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .modern-lightbox.active {
                display: flex;
                opacity: 1;
            }
            
            .lightbox-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                backdrop-filter: blur(10px);
            }
            
            .lightbox-container {
                position: relative;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            
            .lightbox-content {
                position: relative;
                max-width: 90vw;
                max-height: 90vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: lightboxZoom 0.3s ease;
            }
            
            .lightbox-image {
                max-width: 100%;
                max-height: 70vh;
                object-fit: contain;
                border-radius: 10px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
            }
            
            .lightbox-info {
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 20px;
                border-radius: 10px;
                margin-top: 20px;
                text-align: center;
                min-width: 300px;
            }
            
            .lightbox-title {
                font-size: 1.5rem;
                margin-bottom: 10px;
                color: #f59e0b;
            }
            
            .lightbox-description {
                margin-bottom: 15px;
                opacity: 0.9;
            }
            
            .lightbox-counter {
                font-size: 0.9rem;
                opacity: 0.7;
            }
            
            .lightbox-close, .lightbox-prev, .lightbox-next {
                position: absolute;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                border: none;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                font-size: 1.5rem;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .lightbox-close {
                top: 20px;
                right: 20px;
                font-size: 2rem;
            }
            
            .lightbox-prev {
                left: 20px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 2rem;
            }
            
            .lightbox-next {
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 2rem;
            }
            
            .lightbox-close:hover, .lightbox-prev:hover, .lightbox-next:hover {
                background: rgba(245, 158, 11, 0.8);
                transform: scale(1.1);
            }
            
            .lightbox-prev:hover {
                transform: translateY(-50%) scale(1.1);
            }
            
            .lightbox-next:hover {
                transform: translateY(-50%) scale(1.1);
            }
            
            .lightbox-thumbnails {
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                gap: 10px;
                max-width: 80%;
                overflow-x: auto;
                padding: 10px;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 25px;
            }
            
            .lightbox-thumbnail {
                width: 60px;
                height: 60px;
                object-fit: cover;
                border-radius: 8px;
                cursor: pointer;
                opacity: 0.6;
                transition: all 0.3s ease;
                border: 2px solid transparent;
            }
            
            .lightbox-thumbnail.active {
                opacity: 1;
                border-color: #f59e0b;
                transform: scale(1.1);
            }
            
            @keyframes lightboxZoom {
                from {
                    transform: scale(0.8);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }
            
            @media (max-width: 768px) {
                .lightbox-info {
                    min-width: auto;
                    width: 100%;
                    padding: 15px;
                }
                
                .lightbox-thumbnails {
                    display: none;
                }
                
                .lightbox-prev, .lightbox-next {
                    width: 40px;
                    height: 40px;
                    font-size: 1.2rem;
                }
                
                .lightbox-close {
                    width: 40px;
                    height: 40px;
                    top: 10px;
                    right: 10px;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    bindEvents() {
        // Клик по изображениям в галерее
        document.addEventListener('click', (e) => {
            if (e.target.matches('.portfolio-image, .gallery-image')) {
                e.preventDefault();
                this.openLightbox(e.target);
            }
        });

        // События лайтбокса
        this.lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.closeLightbox());
        this.lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.prevImage());
        this.lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.nextImage());
        this.lightbox.querySelector('.lightbox-overlay').addEventListener('click', () => this.closeLightbox());

        // Клавиатурная навигация
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;
            
            switch(e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.prevImage();
                    break;
                case 'ArrowRight':
                    this.nextImage();
                    break;
            }
        });

        // Свайпы на мобильных
        let startX = 0;
        this.lightbox.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        this.lightbox.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextImage();
                } else {
                    this.prevImage();
                }
            }
        }, { passive: true });
    }

    setupImageObserver() {
        // Ленивая загрузка изображений
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    openLightbox(clickedImage) {
        this.collectImages();
        this.currentIndex = this.images.findIndex(img => img.src === clickedImage.src);
        this.isOpen = true;
        
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        this.updateLightbox();
        this.createThumbnails();
    }

    collectImages() {
        this.images = Array.from(document.querySelectorAll('.portfolio-image, .gallery-image')).map(img => ({
            src: img.src,
            title: img.closest('.portfolio-item')?.querySelector('h3')?.textContent || img.alt,
            description: img.closest('.portfolio-item')?.querySelector('p')?.textContent || ''
        }));
    }

    updateLightbox() {
        const image = this.lightbox.querySelector('.lightbox-image');
        const title = this.lightbox.querySelector('.lightbox-title');
        const description = this.lightbox.querySelector('.lightbox-description');
        const current = this.lightbox.querySelector('.current');
        const total = this.lightbox.querySelector('.total');

        const currentImage = this.images[this.currentIndex];
        
        image.src = currentImage.src;
        image.alt = currentImage.title;
        title.textContent = currentImage.title;
        description.textContent = currentImage.description;
        current.textContent = this.currentIndex + 1;
        total.textContent = this.images.length;

        // Обновляем активную миниатюру
        this.updateActiveThumbnail();
    }

    createThumbnails() {
        const container = this.lightbox.querySelector('.lightbox-thumbnails');
        container.innerHTML = '';

        this.images.forEach((img, index) => {
            const thumb = document.createElement('img');
            thumb.className = 'lightbox-thumbnail';
            thumb.src = img.src;
            thumb.alt = img.title;
            if (index === this.currentIndex) thumb.classList.add('active');
            
            thumb.addEventListener('click', () => {
                this.currentIndex = index;
                this.updateLightbox();
            });
            
            container.appendChild(thumb);
        });
    }

    updateActiveThumbnail() {
        const thumbnails = this.lightbox.querySelectorAll('.lightbox-thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === this.currentIndex);
        });
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateLightbox();
    }

    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateLightbox();
    }

    closeLightbox() {
        this.isOpen = false;
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    new ModernGallery();
});