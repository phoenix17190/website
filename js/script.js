// ========================================
// Theme Toggle Functionality
// ========================================
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add rotation animation
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 300);
});

// ========================================
// Mobile Menu Toggle
// ========================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ========================================
// Smooth Scroll & Active Navigation
// ========================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Highlight active section in navigation
const sections = document.querySelectorAll('section');
const navLinksArray = Array.from(navLinks);

function highlightNavigation() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ========================================
// Navbar Scroll Effect
// ========================================
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ========================================
// Tab Functionality for Experience Section
// ========================================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding content
        const tabId = button.getAttribute('data-tab');
        const targetContent = document.getElementById(tabId);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// ========================================
// Intersection Observer for Scroll Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
const animatedElements = document.querySelectorAll('.skill-category, .timeline-item, .project-card');
animatedElements.forEach(el => {
    // Reset initial state
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    observer.observe(el);
});

// ========================================
// Parallax Effect for Hero Background
// ========================================
const heroBackground = document.querySelector('.hero-background');

function handleParallax() {
    const scrolled = window.pageYOffset;
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroBackground.style.opacity = 1 - (scrolled / window.innerHeight);
    }
}

// ========================================
// Scroll to Top on Logo Click
// ========================================
const logo = document.querySelector('.logo');
logo.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// Dynamic Year in Footer (if needed)
// ========================================
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-content p');
if (footerText) {
    footerText.innerHTML = footerText.innerHTML.replace('2025', currentYear);
}

// ========================================
// Add Hover Effect to Project Cards
// ========================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ========================================
// Smooth Reveal for Section Headers
// ========================================
const sectionHeaders = document.querySelectorAll('.section-header');
const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const number = entry.target.querySelector('.section-number');
            const title = entry.target.querySelector('.section-title');
            
            if (number) {
                number.style.animation = 'fadeInUp 0.6s ease forwards';
            }
            if (title) {
                title.style.animation = 'fadeInUp 0.6s ease 0.1s forwards';
            }
        }
    });
}, observerOptions);

sectionHeaders.forEach(header => observer.observe(header));

// ========================================
// Typing Effect for Hero Subtitle (Optional Enhancement)
// ========================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect on hero tagline
// const heroTagline = document.querySelector('.hero-tagline');
// if (heroTagline) {
//     const originalText = heroTagline.textContent;
//     window.addEventListener('load', () => {
//         setTimeout(() => {
//             typeWriter(heroTagline, originalText, 50);
//         }, 1000);
//     });
// }

// ========================================
// Custom Cursor Effect (Optional Enhancement)
// ========================================
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
}

// Uncomment to enable custom cursor (requires additional CSS)
// initCustomCursor();

// ========================================
// Loading Animation
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.style.animation = 'fadeInUp 0.8s ease 0.2s forwards';
    }
});

// ========================================
// Event Listeners
// ========================================
window.addEventListener('scroll', () => {
    handleNavbarScroll();
    highlightNavigation();
    handleParallax();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    highlightNavigation();
    handleNavbarScroll();
});

// ========================================
// Prevent Animation on Page Resize
// ========================================
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// ========================================
// Accessibility: Skip to Content
// ========================================
document.addEventListener('keydown', (e) => {
    // Press '/' to focus on first section
    if (e.key === '/') {
        e.preventDefault();
        const firstSection = document.querySelector('section');
        if (firstSection) {
            firstSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ========================================
// Console Easter Egg
// ========================================
console.log('%c👋 Hi there!', 'font-size: 20px; font-weight: bold; color: #C17767;');
console.log('%cLooking for something? Let\'s connect!', 'font-size: 14px; color: #4A4A4A;');
console.log('%c📧 shashwatshrestha31@gmail.com', 'font-size: 12px; color: #7A7A7A;');

// ========================================
// Performance: Lazy Load Images (when added)
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    // Observe all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// Scroll Progress Indicator (Optional)
// ========================================
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--accent-primary);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Uncomment to enable scroll progress indicator
// createScrollProgress();