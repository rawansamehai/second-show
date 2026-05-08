document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Theme Toggling (Dark/Light Mode) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        body.className = savedTheme;
    } else {
        // Default is dark mode, set it explicitly to be safe
        body.className = 'dark-mode';
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        }
    });

    // --- 2. Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 3. Gallery Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hide');
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    if (item.classList.contains(filterValue)) {
                        item.classList.remove('hide');
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.classList.add('hide');
                            item.style.display = 'none';
                        }, 400); // match transition duration
                    }
                }
            });
        });
    });

    // --- 4. Scroll Reveal Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial state for sections to be revealed
    const revealElements = document.querySelectorAll('.section-header, .artist-card, .timeline-node, .about-text');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Stagger animation for artist cards
    const artistCards = document.querySelectorAll('.artist-card');
    artistCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });
});
