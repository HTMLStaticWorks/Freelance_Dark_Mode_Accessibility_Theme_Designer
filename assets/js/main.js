document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-in-out-cubic'
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Theme Toggle Logic
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const rootHtml = document.documentElement;
    
    const setTheme = (theme) => {
        if (theme === 'dark') {
            rootHtml.setAttribute('data-theme', 'dark');
            rootHtml.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else if (theme === 'light') {
            rootHtml.setAttribute('data-theme', 'light');
            rootHtml.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            // System
            localStorage.removeItem('theme');
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                rootHtml.setAttribute('data-theme', 'dark');
                rootHtml.classList.add('dark');
            } else {
                rootHtml.setAttribute('data-theme', 'light');
                rootHtml.classList.remove('dark');
            }
        }
    };

    // Initial Theme Load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme('system');
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentTheme = rootHtml.getAttribute('data-theme');
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    });

    // RTL Toggle Logic
    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    
    const setDir = (dir) => {
        rootHtml.setAttribute('dir', dir);
        localStorage.setItem('dir', dir);
    };

    const savedDir = localStorage.getItem('dir');
    if (savedDir) {
        setDir(savedDir);
    }

    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentDir = rootHtml.getAttribute('dir');
            setDir(currentDir === 'rtl' ? 'ltr' : 'rtl');
        });
    });
});
