document.addEventListener("DOMContentLoaded", function () {
    var menuBtn = document.getElementById("menu-btn");
    var menuClose = document.getElementById("menu-close");
    var navList = document.querySelector("nav .nav-list ul");
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var body = document.body;

    if (menuBtn && navList) {
        menuBtn.addEventListener("click", function () {
            navList.classList.add("active");
        });
    }

    if (menuClose && navList) {
        menuClose.addEventListener("click", function () {
            navList.classList.remove("active");
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            var targetId = this.getAttribute("href");
            var target = null;

            if (!targetId || targetId === "#") {
                return;
            }

            try {
                target = document.querySelector(targetId);
            } catch (error) {
                return;
            }

            if (!target) {
                return;
            }

            event.preventDefault();
            var targetTop = target.getBoundingClientRect().top + window.scrollY - 80;

            window.scrollTo({
                top: targetTop,
                behavior: reducedMotion ? "auto" : "smooth"
            });

            if (navList) {
                navList.classList.remove("active");
            }
        });
    });

    if (body && !reducedMotion) {
        body.classList.add("home-intro-ready");
        window.requestAnimationFrame(function () {
            body.classList.add("home-intro-start");
        });
    }

    var revealGroups = [
        { selector: "section:not(#home)", variant: "" },
        { selector: ".about-info, .contact-info, .skill-badges-image, .resume-column:first-child", variant: "scroll-reveal-left" },
        { selector: ".education-cards, .resume-column:last-child, .contact-form, .skill-badges-content", variant: "scroll-reveal-right" },
        { selector: ".section-header, .resume-header", variant: "" },
        { selector: ".edu-card, .skill-card, .project-card, .badge-section, .info-item", variant: "scroll-reveal-zoom" }
    ];

    revealGroups.forEach(function (group) {
        document.querySelectorAll(group.selector).forEach(function (element, index) {
            element.classList.add("scroll-reveal");

            if (group.variant) {
                element.classList.add(group.variant);
            }

            var delayClass = "scroll-delay-" + ((index % 3) + 1);
            element.classList.add(delayClass);
        });
    });

    var revealElements = document.querySelectorAll(".scroll-reveal");

    if (reducedMotion || !("IntersectionObserver" in window)) {
        revealElements.forEach(function (element) {
            element.classList.add("is-visible");
        });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            } else {
                entry.target.classList.remove("is-visible");
            }
        });
    }, {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px"
    });

    revealElements.forEach(function (element) {
        observer.observe(element);
    });
});
