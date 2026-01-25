document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("header nav");
    const navLinks = document.querySelectorAll("header nav a");
    const sections = document.querySelectorAll("section");

    /* HEADER SCROLL + SCROLL SPY (ONE LISTENER) */
    
    window.addEventListener("scroll", () => {
        // Header style on scroll
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        // Scroll spy
        let currentSection = "";
        sections.forEach(section => {
            const top = section.offsetTop - 160;
            const height = section.offsetHeight;

            if (window.scrollY >= top && window.scrollY < top + height) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${currentSection}`
            );
        });
    });

    /* HAMBURGER / MOBILE NAV */
    hamburger.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
        });
    });

    /* PROJECT IMAGE MODAL */

    const projectCards = document.querySelectorAll(".project-card");
    const projectModal = document.getElementById("project-modal");
    const projectModalImg = document.getElementById("project-modal-image");
    const projectModalClose = document.querySelector(".project-modal-close");

    projectCards.forEach(card => {
        card.addEventListener("click", e => {
            // avoid triggering when clicking on buttons (View Code / Live Demo)
            if (e.target.closest(".project-links")) return;

            const img = card.querySelector(".project-image img");
            if (!img) return;

            projectModalImg.src = img.src;
            projectModalImg.alt = img.alt || "";
            projectModal.classList.add("open");
            projectModal.setAttribute("aria-hidden", "false");
        });
    });

    projectModalClose.addEventListener("click", () => {
        projectModal.classList.remove("open");
        projectModal.setAttribute("aria-hidden", "true");
    });

    projectModal.addEventListener("click", e => {
        if (e.target === projectModal) {
            projectModal.classList.remove("open");
            projectModal.setAttribute("aria-hidden", "true");
        }
    });

    window.addEventListener("keydown", e => {
        if (e.key === "Escape"){
            projectModal.classList.remove("open");
            projectModal.setAttribute("aria-hidden", "true");
        }
    });

    /* TYPING EFFECT */
    const typingElement = document.getElementById("typing");
    const words = ["a Front-End Developer","a Backend Developer", "an AI ML Enthusiast"];
    let wordIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            letterIndex--;
        } else {
            letterIndex++;
        }

        typingElement.textContent = currentWord.substring(0, letterIndex);

        let typeSpeed = 150;
        if (isDeleting) typeSpeed /= 2;

        if (!isDeleting && letterIndex === currentWord.length) {
            typeSpeed = 1800;
            isDeleting = true;
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();

    /* OPTIONAL: prevent contact form reload */
                    
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", e => {
            e.preventDefault();
            alert("Thank you! Your message has been received.");
            contactForm.reset();
        });
    }
});
