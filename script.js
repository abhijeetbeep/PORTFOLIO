document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Force Background Video Autoplay
    const bgVideo = document.querySelector('video');
    if(bgVideo) {
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
            const targetElement = document.getElementById(targetId);
            if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // =========================================
    // 4. MODAL LOGIC (FIXED)
    // =========================================
    const videoModal = document.getElementById("videoModal");
    const closeBtn = videoModal.querySelector(".close-btn");
    const videoIframes = videoModal.querySelectorAll("iframe");
    const triggers = document.querySelectorAll(".video-trigger"); // Selects the cards

    // Store original URLs to reset them later
    const originalSrcs = Array.from(videoIframes).map((frame) => frame.src);

    function openVideoModal() {
        videoModal.classList.add("show");
    }

    function closeVideoModal() {
        videoModal.classList.remove("show");
        // Stop videos by resetting SRC
        videoIframes.forEach((frame, index) => {
            frame.src = "";           
            frame.src = originalSrcs[index]; 
        });
    }

    // Attach Click Event to Cards
    triggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault(); // Stop page from jumping to top
            openVideoModal();
        });
    });

    // Close on X button
    closeBtn.addEventListener("click", closeVideoModal);

    // Close on Background Click
    videoModal.addEventListener("click", (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
});