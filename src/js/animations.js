// Inicialização do GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animação dos números nas estatísticas
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const targetValue = parseInt(stat.getAttribute('data-value'));
        let currentValue = 0;
        const duration = 2000; // 2 segundos
        const steps = 60;
        const increment = targetValue / steps;
        const stepDuration = duration / steps;
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                stat.textContent = targetValue.toLocaleString();
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(currentValue).toLocaleString();
            }
        }, stepDuration);
    });
}

// Animações de scroll
function initScrollAnimations() {
    // Hero Content
    gsap.from('.hero-content', {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: '.hero-content',
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // Stats Cards
    gsap.from('.stat-card', {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
            trigger: '.hero-stats',
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
            onEnter: animateStats
        }
    });

    // Feature Cards
    gsap.from('.feature-card', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // Process Steps
    gsap.from('.step', {
        opacity: 0,
        x: -50,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
            trigger: '.process-steps',
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Background Spheres Animation
function animateBackgroundSpheres() {
    const spheres = document.querySelectorAll('.gradient-sphere');
    
    spheres.forEach((sphere, index) => {
        gsap.to(sphere, {
            x: `random(-100, 100)`,
            y: `random(-100, 100)`,
            duration: `random(10, 20)`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.5
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            navActions.classList.toggle('active');
        });
    }
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
}

// Classe para animações de números
class NumberAnimation {
    constructor() {
        this.numberElements = document.querySelectorAll('.stat-number');
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const endValue = parseInt(target.getAttribute('data-value'));
                    this.animateValue(target, 0, endValue, 2000);
                    this.observer.unobserve(target);
                }
            });
        }, {
            threshold: 0.5
        });

        this.numberElements.forEach(el => {
            const value = el.textContent.replace('+', '');
            el.setAttribute('data-value', value);
            el.textContent = '0+';
            this.observer.observe(el);
        });
    }

    animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current + '+';
            
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    animateBackgroundSpheres();
    initMobileMenu();
    initHeaderScroll();
    new NumberAnimation();
});
