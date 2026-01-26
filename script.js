document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("header nav");
    const navLinks = document.querySelectorAll("header nav a");
    const sections = document.querySelectorAll("section");

    /* HEADER SCROLL + SCROLL SPY */
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 50);

        let current = "";
        sections.forEach(section => {
            const top = section.offsetTop - 160;
            const height = section.offsetHeight;
            if (window.scrollY >= top && window.scrollY < top + height) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${current}`
            );
        });
    });

    /* MOBILE NAV */
    hamburger.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    navLinks.forEach(link =>
        link.addEventListener("click", () => nav.classList.remove("active"))
    );

    /* PROJECT MODAL */
    const cards = document.querySelectorAll(".project-card");
    const modal = document.getElementById("project-modal");
    const modalImg = document.getElementById("project-modal-image");
    const closeBtn = document.querySelector(".project-modal-close");

    cards.forEach(card => {
        card.addEventListener("click", e => {
            if (e.target.closest(".project-links")) return;
            const img = card.querySelector("img");
            modalImg.src = img.src;
            modal.classList.add("open");
        });
    });

    closeBtn.addEventListener("click", () => modal.classList.remove("open"));
    modal.addEventListener("click", e => {
        if (e.target === modal) modal.classList.remove("open");
    });

    /* ✅ TYPING EFFECT (FIXED & SAFE) */
    const typingElement = document.getElementById("typing");

    if (typingElement) {
        const words = [
            "a Front-End Developer",
            "a Backend Developer",
            "an AI ML Enthusiast"
        ];

        let wordIndex = 0;
        let letterIndex = 0;
        let isDeleting = false;

        function type() {
            const word = words[wordIndex];
            letterIndex += isDeleting ? -1 : 1;

            typingElement.textContent = word.substring(0, letterIndex);

            let speed = isDeleting ? 70 : 140;

            if (!isDeleting && letterIndex === word.length) {
                speed = 1500;
                isDeleting = true;
            } else if (isDeleting && letterIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                speed = 500;
            }

            setTimeout(type, speed);
        }

        type();
    }

    /* CONTACT FORM */
    const form = document.querySelector(".contact-form");
    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();
            alert("Thank you! Your message has been received.");
            form.reset();
        });
    }

    /* ===================== SCROLL REVEAL ANIMATION ===================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // animate once
            }
        });
    },
    {
        threshold: 0.15,   // 15% visible
        rootMargin: "0px 0px -50px 0px"
    }
);

revealElements.forEach(el => revealObserver.observe(el));

});
