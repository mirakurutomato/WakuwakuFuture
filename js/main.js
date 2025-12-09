// Utility helpers
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

// Main JavaScript functionality
class OkawaLabWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupParallaxEffect();
        this.setupIntersectionObserver();
        this.setupMagneticHover();
    }

    // Navigation functionality
    setupNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (hamburger) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Scroll animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.fade-in, .slide-in-left, .slide-in-right, .slide-in-up, .zoom-in, .fade-in-up'
        );

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Parallax effect
    setupParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.parallax-element');

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    // Intersection Observer for advanced animations
    setupIntersectionObserver() {
        const advancedObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add stagger animation to children
                    const children = entry.target.querySelectorAll('.research-card, .activity-item, .spec-item, .application-card');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('visible');
                        }, index * 100);
                    });
                }
            });
        }, {
            threshold: 0.2
        });

        // Observe sections
        const sections = document.querySelectorAll('.research-grid, .activities-timeline, .tech-specs, .applications-grid');
        sections.forEach(section => {
            advancedObserver.observe(section);
        });
    }

    // Magnetic hover for hero card and primary buttons
    setupMagneticHover() {
        const magneticElements = document.querySelectorAll('.btn-primary, .hero-pane');

        magneticElements.forEach(element => {
            const strength = element.classList.contains('hero-pane') ? 12 : 8;

            const handleMove = (event) => {
                const rect = element.getBoundingClientRect();
                const x = ((event.clientX - rect.left) - rect.width / 2) / rect.width;
                const y = ((event.clientY - rect.top) - rect.height / 2) / rect.height;
                element.style.setProperty('--mx', `${x * strength}px`);
                element.style.setProperty('--my', `${y * strength}px`);
            };

            const reset = () => {
                element.style.setProperty('--mx', '0px');
                element.style.setProperty('--my', '0px');
            };

            element.addEventListener('mousemove', handleMove);
            element.addEventListener('mouseleave', reset);
        });
    }

    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove
        setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);

        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.removeNotification(notification);
        });
    }

    removeNotification(notification) {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

}

// Advanced animations and effects
class AnimationEffects {
    static init() {
        this.setupCounters();
        this.setupProgressBars();
        this.setupTypingEffect();
        this.setupMorphingShapes();
    }

    // Animated counters
    static setupCounters() {
        const counters = document.querySelectorAll('.counter');

        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 200;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateCounter(entry.target);
                }
            });
        });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Progress bars animation
    static setupProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');

        const animateProgressBar = (bar) => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        };

        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateProgressBar(entry.target);
                }
            });
        });

        progressBars.forEach(bar => {
            progressObserver.observe(bar);
        });
    }

    // Typing effect
    static setupTypingEffect() {
        const typingElements = document.querySelectorAll('.typing-text');

        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';

            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };

            const typingObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeWriter();
                        typingObserver.unobserve(entry.target);
                    }
                });
            });

            typingObserver.observe(element);
        });
    }

    // Morphing shapes
    static setupMorphingShapes() {
        const morphingElements = document.querySelectorAll('.morph');

        morphingElements.forEach(element => {
            const morphObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            });

            morphObserver.observe(element);
        });
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main website functionality
    new OkawaLabWebsite();

    // Initialize animation effects
    AnimationEffects.init();

    // Add some interactive elements
    const researchCards = document.querySelectorAll('.research-card');
    researchCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('heartbeat');
            setTimeout(() => card.classList.remove('heartbeat'), 1500);
        });
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Performance optimization
const debouncedResize = debounce(() => {
    // Handle resize events
    console.log('Window resized');
}, 250);

window.addEventListener('resize', debouncedResize);

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScriptエラー:', e.message);
});

// Page visibility API for performance
let hiddenTime = 0;
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        hiddenTime = Date.now();
        // Pause animations when page is hidden
        document.body.style.animationPlayState = 'paused';
    } else {
        const visibleTime = Date.now() - hiddenTime;
        console.log(`ページが ${visibleTime}ms 非表示でした`);
        // Resume animations when page is visible
        document.body.style.animationPlayState = 'running';
    }
});
