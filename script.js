document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('checkbox');
    const body = document.body;
    const navLinks = document.querySelectorAll('nav .nav-links li a');
    const sections = document.querySelectorAll('section[id]'); // Get all sections with an ID

    // --- Theme Toggle Functionality ---
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    }

    // Theme toggle change listener
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    // --- Smooth Scrolling for Navigation Links ---
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Calculate offset for fixed header
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 40; // Increased extra padding for better visual alignment

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }

            // Remove active class from all links and add to the clicked one
            // This is primarily for click events; Intersection Observer handles scroll.
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // --- Intersection Observer for Active Navigation Link Highlighting and Section Fade-in ---
    const observerOptions = {
        root: null, // viewport
        rootMargin: '-30% 0px -30% 0px', // Adjusted sensitivity: section is "visible" when 30% from top/bottom
        threshold: 0 // Trigger as soon as any part of the section enters/leaves
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add 'is-visible' class for fade-in animation
                entry.target.classList.add('is-visible');

                // Highlight active nav link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            } else {
                // Optional: Remove 'is-visible' if you want sections to fade out when scrolled away
                // entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });

    // Set initial active link on page load if a section is in view
    // This also triggers the fade-in for the first visible section
    const initialActiveSection = Array.from(sections).find(section => {
        const rect = section.getBoundingClientRect();
        // Check if the section is at least partially in the viewport
        return rect.top < window.innerHeight && rect.bottom > 0;
    });

    if (initialActiveSection) {
        initialActiveSection.classList.add('is-visible'); // Ensure first section is visible
        const initialActiveLink = document.querySelector(`nav .nav-links li a[href="#${initialActiveSection.id}"]`);
        if (initialActiveLink) {
            initialActiveLink.classList.add('active');
        }
    }
});