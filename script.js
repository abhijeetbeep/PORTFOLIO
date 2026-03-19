document.addEventListener("DOMContentLoaded", () => {

    // 1. Force Background Video Autoplay
    const bgVideo = document.querySelector('video');
    if (bgVideo) {
        bgVideo.muted = true;
        bgVideo.play().catch(e => console.log("Autoplay blocked", e));
    }

    // 2. 3D Tilt Effect
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
        });
    });

    // 3. Smooth Scroll (Only for links that are NOT video triggers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if this is a card/video trigger
            if (this.classList.contains('video-trigger')) return;

            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            if (targetId === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const targetElement = document.getElementById(targetId);
                if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // =========================================
    // 4. MODAL LOGIC (FIXED)
    // =========================================
    const modals = document.querySelectorAll(".video-modal");
    const closeBtns = document.querySelectorAll(".close-btn");
    const triggers = document.querySelectorAll(".video-trigger"); 

    function openVideoModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add("show");
        }
    }

    function closeVideoModal(modal) {
        modal.classList.remove("show");
        // Stop videos by resetting SRC
        const iframes = modal.querySelectorAll("iframe");
        iframes.forEach((frame) => {
            const currentSrc = frame.src;
            frame.src = "";
            frame.src = currentSrc;
        });
    }

    // Attach Click Event to Cards
    triggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault(); 
            const targetModal = trigger.getAttribute("data-target");
            if (targetModal) {
                openVideoModal(targetModal);
            }
        });
    });

    // Close on X button
    closeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
             const modal = btn.closest('.video-modal');
             if(modal) closeVideoModal(modal);
        });
    });

    // Close on Background Click
    modals.forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeVideoModal(modal);
            }
        });
    });
    // 5. Theme Toggle Logic
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Check for saved user preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        body.classList.add("light-theme");
        themeToggle.textContent = "☯";
    }

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("light-theme");

        if (body.classList.contains("light-theme")) {
            themeToggle.textContent = "☯";
            localStorage.setItem("theme", "light");
        } else {
            themeToggle.textContent = "☯";
            localStorage.setItem("theme", "dark");
        }
    });

    // 6. Certificates Toggle Logic
    const certBtns = document.querySelectorAll(".cert-btn");
    const certCards = document.querySelectorAll(".cert-card");

    certBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            certBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            certCards.forEach(card => {
                if (card.getAttribute("data-category") === filter) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});