function toggleMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.top-nav');
    if (btn) btn.classList.toggle('active');
    if (nav) nav.classList.toggle('active');
}
