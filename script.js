// ===========================
// NAWIGACJA - Aktywny link & Hamburger
// ===========================

const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Sticky navbar shadow on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===========================
// PŁYNNE PRZEWIJANIE & AKTYWNY LINK
// ===========================

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // 80px offset for navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Update active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===========================
// ANIMACJE POJAWIENIA SIĘ (FADE-IN)
// ===========================

const fadeElements = document.querySelectorAll('.fade-in');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: przestań obserwować po animacji
            // fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// ===========================
// FORMULARZ KONTAKTOWY
// ===========================

const contactForm = document.getElementById('contact-form');

const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('omnie');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ===========================
// PARALLAX EFEKT (OPCJONALNIE)
// ===========================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        // Subtelny parallax dla hero
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// ===========================
// INICJALIZACJA
// ===========================

// Sprawdź aktywny link przy załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
    updateActiveLink();
    
    // Dodaj delay do pierwszych animacji na hero
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
        }
    }, 300);
});

// ===========================
// DODATKOWE FUNKCJE
// ===========================

// Native lazy loading – przeglądarka obsługuje loading="lazy" automatycznie

console.log('🚀 BioCoach website loaded successfully!');

// ===========================
// BLOG CAROUSEL
// ===========================

const blogCarousel = document.getElementById('blogCarousel');
const blogPrev = document.getElementById('blogPrev');
const blogNext = document.getElementById('blogNext');
const carouselDots = document.getElementById('carouselDots');

if (blogCarousel && blogPrev && blogNext) {
    const blogCards = Array.from(blogCarousel.querySelectorAll('.blog-card'));
    let currentPage = 0;
    let cardsPerView = 3;
    
    // Responsywność - ile kart na widoku
    function updateCardsPerView() {
        if (window.innerWidth <= 480) {
            cardsPerView = 1;
            blogCarousel.style.gridTemplateColumns = `repeat(1, 1fr)`;
        } else if (window.innerWidth <= 768) {
            cardsPerView = 2;
            blogCarousel.style.gridTemplateColumns = `repeat(2, 1fr)`;
        } else {
            cardsPerView = 6;
            blogCarousel.style.gridTemplateColumns = `repeat(3, 1fr)`;
        }
        
        createDots();
        showPage(0);
    }
    
    // Tworzenie kropek (dots)
    function createDots() {
        carouselDots.innerHTML = '';
        const totalPages = Math.ceil(blogCards.length / cardsPerView);
        
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showPage(i));
            carouselDots.appendChild(dot);
        }
    }
    
    // Pokaż stronę
    function showPage(pageIndex) {
        const totalPages = Math.ceil(blogCards.length / cardsPerView);
        
        // Zapętlenie
        if (pageIndex < 0) {
            pageIndex = totalPages - 1;
        } else if (pageIndex >= totalPages) {
            pageIndex = 0;
        }
        
        currentPage = pageIndex;
        const startIndex = currentPage * cardsPerView;
        
        // Ukryj wszystkie karty
        blogCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Pokaż tylko karty na obecnej stronie
        for (let i = startIndex; i < startIndex + cardsPerView && i < blogCards.length; i++) {
            blogCards[i].style.display = 'block';
        }
        
        // Aktualizuj kropki
        const dots = carouselDots.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });
    }
    
    // Poprzednia strona
    blogPrev.addEventListener('click', () => {
        showPage(currentPage - 1);
    });
    
    // Następna strona
    blogNext.addEventListener('click', () => {
        showPage(currentPage + 1);
    });
    
    // Inicjalizacja
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
}

// ===========================
// TESTIMONIALS CAROUSEL
// ===========================

const testimonialsCarousel = document.getElementById('testimonialsCarousel');
const testimonialsPrev = document.getElementById('testimonialsPrev');
const testimonialsNext = document.getElementById('testimonialsNext');
const testimonialsDots = document.getElementById('testimonialsDots');

if (testimonialsCarousel && testimonialsPrev && testimonialsNext) {
    const testimonialCards = Array.from(testimonialsCarousel.querySelectorAll('.testimonial-card'));
    let currentPageT = 0;
    let cardsPerViewT = 3;
    
    // Responsywność - ile kart na widoku
    function updateCardsPerViewT() {
        if (window.innerWidth <= 480) {
            cardsPerViewT = 1;
        } else if (window.innerWidth <= 768) {
            cardsPerViewT = 2;
        } else {
            cardsPerViewT = 3;
        }
        
        // Aktualizuj grid
        testimonialsCarousel.style.gridTemplateColumns = `repeat(${cardsPerViewT}, 1fr)`;
        
        createDotsT();
        showPageT(0);
    }
    
    // Tworzenie kropek (dots)
    function createDotsT() {
        testimonialsDots.innerHTML = '';
        const totalPages = Math.ceil(testimonialCards.length / cardsPerViewT);
        
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showPageT(i));
            testimonialsDots.appendChild(dot);
        }
    }
    
    // Pokaż stronę
    function showPageT(pageIndex) {
        const totalPages = Math.ceil(testimonialCards.length / cardsPerViewT);
        
        // Zapętlenie
        if (pageIndex < 0) {
            pageIndex = totalPages - 1;
        } else if (pageIndex >= totalPages) {
            pageIndex = 0;
        }
        
        currentPageT = pageIndex;
        const startIndex = currentPageT * cardsPerViewT;
        
        // Ukryj wszystkie karty
        testimonialCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Pokaż tylko karty na obecnej stronie
        for (let i = startIndex; i < startIndex + cardsPerViewT && i < testimonialCards.length; i++) {
            testimonialCards[i].style.display = 'block';
        }
        
        // Aktualizuj kropki
        const dots = testimonialsDots.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPageT);
        });
    }
    
    // Poprzednia strona
    testimonialsPrev.addEventListener('click', () => {
        showPageT(currentPageT - 1);
    });
    
    // Następna strona
    testimonialsNext.addEventListener('click', () => {
        showPageT(currentPageT + 1);
    });
    
    // Inicjalizacja
    updateCardsPerViewT();
    window.addEventListener('resize', updateCardsPerViewT);
}
