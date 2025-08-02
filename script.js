document.addEventListener('DOMContentLoaded', () => {
    /*======= Menu Icon Navbar =======*/
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };

    /*======= Scroll Sections Active Link =======*/
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');

    window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    links.classList.remove('active');
                    document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                });
            };
        });
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    };

    /*======= Scroll Reveal =======*/
    ScrollReveal({
        distance: '80px',
        duration: 2000,
        delay: 200
    });

    ScrollReveal().reveal('.home-content, .section-heading, .section-subheading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .about-cards, .skills-grid, .projects-container, .education-timeline, .contact-grid', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-text', { origin: 'left' });

    /*======= Typed JS =======*/
    const typed = new Typed('.typed-text', {
        strings: ['Agentic AI Engineer', 'Frontend Developer', 'UI/UX Designer'],
        typeSpeed: 70,
        backSpeed: 70,
        backDelay: 1000,
        loop: true
    });

    /*======= Project Filtering =======*/
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectBoxes = document.querySelectorAll('.project-box');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectBoxes.forEach(box => {
                if (filter === 'all' || box.getAttribute('data-category') === filter) {
                    box.style.display = 'block';
                } else {
                    box.style.display = 'none';
                }
            });
        });
    });
});
