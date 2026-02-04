// Система SEO оптимизации
class SEOOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.addStructuredData();
        this.optimizeImages();
        this.addBreadcrumbs();
        this.setupSitemap();
        this.addRichSnippets();
    }

    // Добавление структурированных данных JSON-LD
    addStructuredData() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Никс",
            "jobTitle": "Фотограф",
            "description": "Профессиональный фотограф, специализирующийся на портретной съёмке и уличной фотографии",
            "url": "https://niks-artphoto.ru",
            "image": "https://niks-artphoto.ru/images/niks.png",
            "sameAs": [
                "https://t.me/objektivniksa"
            ],
            "contactPoint": {
                "@type": "ContactPoint",
                "email": "niksfotograf@gmail.com",
                "contactType": "customer service"
            },
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Калининград",
                "addressCountry": "RU"
            },
            "offers": [
                {
                    "@type": "Offer",
                    "name": "Портретная съёмка",
                    "description": "Профессиональная портретная фотосъёмка"
                },
                {
                    "@type": "Offer",
                    "name": "Уличная фотография",
                    "description": "Художественная уличная фотосъёмка"
                }
            ]
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }

    // Оптимизация изображений для SEO
    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Добавляем alt если отсутствует
            if (!img.alt) {
                const figcaption = img.closest('figure')?.querySelector('figcaption');
                const title = img.closest('.portfolio-item')?.querySelector('h3');
                img.alt = figcaption?.textContent || title?.textContent || 'Фотография от Никса';
            }

            // Добавляем loading="lazy" если отсутствует
            if (!img.hasAttribute('loading')) {
                img.loading = 'lazy';
            }

            // Добавляем размеры если отсутствуют
            if (!img.width && !img.height) {
                img.addEventListener('load', function() {
                    this.width = this.naturalWidth;
                    this.height = this.naturalHeight;
                }, { once: true });
            }
        });
    }

    // Добавление хлебных крошек
    addBreadcrumbs() {
        const path = window.location.pathname;
        const breadcrumbContainer = document.createElement('nav');
        breadcrumbContainer.className = 'breadcrumbs';
        breadcrumbContainer.setAttribute('aria-label', 'Навигация');

        const breadcrumbs = this.generateBreadcrumbs(path);
        
        const breadcrumbList = document.createElement('ol');
        breadcrumbList.className = 'breadcrumb-list';

        breadcrumbs.forEach((crumb, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'breadcrumb-item';
            
            if (index === breadcrumbs.length - 1) {
                listItem.textContent = crumb.name;
                listItem.setAttribute('aria-current', 'page');
            } else {
                const link = document.createElement('a');
                link.href = crumb.url;
                link.textContent = crumb.name;
                listItem.appendChild(link);
            }
            
            breadcrumbList.appendChild(listItem);
        });

        breadcrumbContainer.appendChild(breadcrumbList);

        // Добавляем стили
        const styles = `
            .breadcrumbs {
                padding: 10px 0;
                margin-top: 80px;
                background: rgba(245, 158, 11, 0.1);
            }
            
            .breadcrumb-list {
                display: flex;
                list-style: none;
                margin: 0;
                padding: 0;
                flex-wrap: wrap;
            }
            
            .breadcrumb-item {
                color: var(--text-light);
                font-size: 0.9rem;
            }
            
            .breadcrumb-item:not(:last-child)::after {
                content: ' › ';
                margin: 0 8px;
                color: var(--secondary-color);
            }
            
            .breadcrumb-item a {
                color: var(--secondary-color);
                text-decoration: none;
                transition: color 0.3s ease;
            }
            
            .breadcrumb-item a:hover {
                color: var(--accent-color);
            }
            
            .breadcrumb-item[aria-current="page"] {
                color: var(--text-dark);
                font-weight: 500;
            }
        `;

        if (!document.querySelector('#breadcrumb-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'breadcrumb-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }

        // Вставляем после навигации
        const navbar = document.querySelector('.navbar');
        if (navbar && breadcrumbs.length > 1) {
            navbar.insertAdjacentElement('afterend', breadcrumbContainer);
        }

        // Добавляем структурированные данные для хлебных крошек
        this.addBreadcrumbStructuredData(breadcrumbs);
    }

    generateBreadcrumbs(path) {
        const breadcrumbs = [{ name: 'Главная', url: '/' }];
        
        const pathMap = {
            '/portfolio.html': 'Портфолио',
            '/about.html': 'Обо мне',
            '/blog.html': 'Блог',
            '/contact.html': 'Контакты'
        };

        if (pathMap[path]) {
            breadcrumbs.push({ name: pathMap[path], url: path });
        }

        return breadcrumbs;
    }

    addBreadcrumbStructuredData(breadcrumbs) {
        const breadcrumbData = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": crumb.name,
                "item": `https://niks-artphoto.ru${crumb.url}`
            }))
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(breadcrumbData);
        document.head.appendChild(script);
    }

    // Создание карты сайта
    setupSitemap() {
        const pages = [
            { url: '/', priority: '1.0', changefreq: 'weekly' },
            { url: '/portfolio.html', priority: '0.9', changefreq: 'weekly' },
            { url: '/about.html', priority: '0.8', changefreq: 'monthly' },
            { url: '/blog.html', priority: '0.7', changefreq: 'weekly' },
            { url: '/contact.html', priority: '0.6', changefreq: 'monthly' }
        ];

        // В реальном проекте это должно генерироваться на сервере
        console.log('Sitemap data:', pages);
    }

    // Добавление Rich Snippets
    addRichSnippets() {
        // Для портфолио
        if (window.location.pathname.includes('portfolio')) {
            const portfolioData = {
                "@context": "https://schema.org",
                "@type": "ImageGallery",
                "name": "Портфолио фотографа Никса",
                "description": "Коллекция лучших фотографий",
                "author": {
                    "@type": "Person",
                    "name": "Никс"
                }
            };

            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(portfolioData);
            document.head.appendChild(script);
        }

        // Для контактов
        if (window.location.pathname.includes('contact')) {
            const contactData = {
                "@context": "https://schema.org",
                "@type": "ContactPage",
                "name": "Контакты фотографа Никса",
                "description": "Свяжитесь со мной для обсуждения фотосессии"
            };

            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(contactData);
            document.head.appendChild(script);
        }
    }

    // Оптимизация мета-тегов для текущей страницы
    optimizeMetaTags() {
        const path = window.location.pathname;
        const metaDescriptions = {
            '/': 'Профессиональный фотограф Никс. Портретная съёмка и уличная фотография в Калининграде. Каждый кадр — шаг к совершенству.',
            '/portfolio.html': 'Портфолио фотографа Никса. Лучшие работы в области портретной и уличной фотографии. Посмотрите примеры моих работ.',
            '/about.html': 'О фотографе Никсе. Узнайте больше о моем творческом пути, опыте и подходе к фотографии.',
            '/blog.html': 'Блог фотографа Никса. Полезные статьи о фотографии, советы по съемке и обзоры оборудования.',
            '/contact.html': 'Контакты фотографа Никса. Свяжитесь со мной для заказа фотосессии в Калининграде. Email и Telegram.'
        };

        const metaKeywords = {
            '/': 'фотограф калининград, портретная съемка, уличная фотография, профессиональный фотограф',
            '/portfolio.html': 'портфолио фотографа, примеры работ, фотогалерея, лучшие фотографии',
            '/about.html': 'о фотографе, биография фотографа, опыт работы',
            '/blog.html': 'блог фотографа, статьи о фотографии, советы по съемке',
            '/contact.html': 'контакты фотографа, заказать фотосессию, связаться с фотографом'
        };

        // Обновляем description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && metaDescriptions[path]) {
            metaDesc.content = metaDescriptions[path];
        }

        // Обновляем keywords
        let metaKeys = document.querySelector('meta[name="keywords"]');
        if (metaKeys && metaKeywords[path]) {
            metaKeys.content = metaKeywords[path];
        }

        // Обновляем Open Graph
        let ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc && metaDescriptions[path]) {
            ogDesc.content = metaDescriptions[path];
        }
    }
}

// Инициализация SEO оптимизации
document.addEventListener('DOMContentLoaded', () => {
    const seoOptimizer = new SEOOptimizer();
    seoOptimizer.optimizeMetaTags();
});