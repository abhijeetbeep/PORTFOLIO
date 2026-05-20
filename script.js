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

    const modals = document.querySelectorAll(".video-modal");
    const closeBtns = document.querySelectorAll(".close-btn");
    const triggers = document.querySelectorAll(".video-trigger"); 

    function openVideoModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add("show");
            document.body.classList.add("modal-open");
        }
    }

    function closeVideoModal(modal) {
        modal.classList.remove("show");
        document.body.classList.remove("modal-open");
        
        if (modal.id === 'videoPlayerModal') {
            const playerIframe = document.getElementById('youtubePlayerIframe');
            if (playerIframe) playerIframe.src = "";
            const localVideo = document.getElementById('localVideoPlayer');
            if (localVideo) {
                localVideo.pause();
                localVideo.currentTime = 0;
            }
        } else {
            // Stop videos by resetting SRC
            const iframes = modal.querySelectorAll("iframe");
            iframes.forEach((frame) => {
                const currentSrc = frame.src;
                frame.src = "";
                frame.src = currentSrc;
            });
        }
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
             if(modal) {
                 closeVideoModal(modal);
                 if (modal.id === 'videoPlayerModal' && typeof previousModalId !== 'undefined' && previousModalId) {
                     openVideoModal(previousModalId);
                     previousModalId = null;
                 }
             }
        });
    });

    // Close on Background Click
    modals.forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeVideoModal(modal);
                if (modal.id === 'videoPlayerModal' && typeof previousModalId !== 'undefined' && previousModalId) {
                    openVideoModal(previousModalId);
                    previousModalId = null;
                }
            }
        });
    });

    // Premium Video Cards Lazy Load Logic
    const premiumCards = document.querySelectorAll('.premium-video-card');
    const playerModal = document.getElementById('videoPlayerModal');
    const playerIframe = document.getElementById('youtubePlayerIframe');
    const localVideo = document.getElementById('localVideoPlayer');

    let previousModalId = null;

    premiumCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const videoSrc = card.getAttribute('data-video-src');
            
            // Remember which modal is currently open
            const openModal = document.querySelector('.video-modal.show');
            if (openModal && openModal.id !== 'videoPlayerModal') {
                previousModalId = openModal.id;
            }

            // Close any currently open modals (e.g. videoModalLong or videoModalShort)
            document.querySelectorAll('.video-modal.show').forEach(m => {
                closeVideoModal(m);
            });

            // Set the iframe or local video src
            if (videoSrc) {
                const wrapper = playerModal.querySelector('.player-wrapper');
                if (videoSrc.includes('youtube')) {
                    if (wrapper) wrapper.classList.remove('short-format');
                    if (playerIframe) {
                        playerIframe.src = videoSrc;
                        playerIframe.style.display = 'block';
                    }
                    if (localVideo) localVideo.style.display = 'none';
                } else {
                    if (wrapper) wrapper.classList.add('short-format');
                    if (localVideo) {
                        localVideo.src = videoSrc;
                        localVideo.style.display = 'block';
                        localVideo.play().catch(e => console.log("Play interrupted", e));
                    }
                    if (playerIframe) playerIframe.style.display = 'none';
                }
            }

            // Open the player modal
            if (playerModal) {
                openVideoModal('videoPlayerModal');
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

    // 5.5 Skills Progress Infinite Scroll Logic
    const progressCardsContainer = document.querySelector(".progress-cards");
    const progressWrapper = document.querySelector(".skills-progress-container");
    
    // Duplicate cards for infinite scroll
    if (progressCardsContainer) {
        const originalProgressCards = Array.from(document.querySelectorAll(".progress-card"));
        originalProgressCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            progressCardsContainer.appendChild(clone);
        });
    }

    // Pause/Resume floating animation on click (mobile support)
    if (progressWrapper && progressCardsContainer) {
        progressWrapper.addEventListener("click", () => {
            progressCardsContainer.classList.toggle("paused");
        });
    }

    // 6. Certificates & Graphic Work Toggle/Scroll Logic
    const certBtns = document.querySelectorAll(".cert-btn");
    
    // Duplicate cards for infinite scroll (supports multiple grids)
    const certGrids = document.querySelectorAll(".cert-grid");
    certGrids.forEach(grid => {
        const originalCards = Array.from(grid.querySelectorAll(".cert-card"));
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            grid.appendChild(clone);
        });

        // Pause/Resume floating animation on click
        const wrapper = grid.closest('.cert-wrapper');
        if (wrapper) {
            wrapper.addEventListener("click", () => {
                grid.classList.toggle("paused");
            });
        }
    });

    // Select only certificates section cards for toggle (prevents hiding Graphic Work cards)
    const certCards = document.querySelectorAll("#certificates .cert-card");

    certBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            certBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            certCards.forEach(card => {
                if (card.getAttribute("data-category") === filter) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 7. Mobile Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.getElementById('nav-overlay');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            if (navOverlay) navOverlay.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                if (navOverlay) navOverlay.classList.remove('active');
            });
        });

        // Close menu when overlay is clicked
        if (navOverlay) {
            navOverlay.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
            });
        }
    }

    // 8. Image Gallery Lightbox Logic
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    let imagePaths = [];

    if (galleryItems.length > 0 && lightboxModal) {
        imagePaths = Array.from(galleryItems).map(img => img.src);

        function openLightbox(index) {
            currentImageIndex = index;
            updateLightboxImage();
            lightboxModal.classList.add('show');
            document.body.classList.add('modal-open'); // Prevent background scrolling
        }

        let isAnimating = false;

        function updateLightboxImage() {
            const src = imagePaths[currentImageIndex];
            lightboxImg.src = src;
        }

        function changeImageWithTransition(newIndex) {
            if (isAnimating) return;
            isAnimating = true;
            
            // Fade out
            lightboxImg.classList.add('fade-out');
            
            // Wait for fade out transition (300ms)
            setTimeout(() => {
                currentImageIndex = newIndex;
                const src = imagePaths[currentImageIndex];
                
                // When new image loads, fade it back in
                lightboxImg.onload = () => {
                    lightboxImg.classList.remove('fade-out');
                    isAnimating = false;
                    lightboxImg.onload = null; // cleanup
                };
                
                lightboxImg.onerror = () => {
                    lightboxImg.classList.remove('fade-out');
                    isAnimating = false;
                    lightboxImg.onerror = null;
                };

                // Set new source
                lightboxImg.src = src;
            }, 300);
        }

        function closeLightbox() {
            lightboxModal.classList.remove('show');
            // Remove src after modal fade out (300ms)
            setTimeout(() => {
                lightboxImg.src = "";
                lightboxImg.classList.remove('fade-out');
            }, 300);
            document.body.classList.remove('modal-open');
            isAnimating = false;
        }

        function showNextImage() {
            changeImageWithTransition((currentImageIndex + 1) % imagePaths.length);
        }

        function showPrevImage() {
            changeImageWithTransition((currentImageIndex - 1 + imagePaths.length) % imagePaths.length);
        }

        galleryItems.forEach((img, index) => {
            // Anti-save protection
            img.addEventListener('contextmenu', e => e.preventDefault());
            img.setAttribute('draggable', 'false');

            img.addEventListener('click', () => {
                openLightbox(index);
            });
        });

        if (lightboxImg) {
            // Anti-save protection for lightbox image
            lightboxImg.addEventListener('contextmenu', e => e.preventDefault());
            lightboxImg.setAttribute('draggable', 'false');
        }

        lightboxClose.addEventListener('click', closeLightbox);
        lightboxNext.addEventListener('click', showNextImage);
        lightboxPrev.addEventListener('click', showPrevImage);

        // Close on background click
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightboxModal.classList.contains('show')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
        });
    }

    // 9. Ambient Particles Generator
    const animatedSections = document.querySelectorAll('.skills-section, .resume-section, .certificates-section, .enquiry-section, .about-section');
    
    // Colors matching the theme: purple, blue, cyan, pink
    const particleColors = [
        'rgba(90, 75, 218, 0.4)',  // accent-color (purple-blue)
        'rgba(167, 139, 250, 0.4)', // light purple
        'rgba(56, 189, 248, 0.3)',  // cyan/light blue
        'rgba(236, 72, 153, 0.3)'   // pink
    ];

    const tinyParticleColors = [
        'rgba(90, 75, 218, 0.8)',  // purple
        'rgba(56, 189, 248, 0.8)', // blue/cyan
        'rgba(236, 72, 153, 0.8)', // pink
        'rgba(255, 255, 255, 0.8)' // white
    ];

    animatedSections.forEach(section => {
        // Create container for particles to isolate them and prevent overflow
        const container = document.createElement('div');
        container.classList.add('particles-container');
        section.appendChild(container);

        // 1. Create 4 to 7 extra floating blobs per section to increase density
        const numParticles = Math.floor(Math.random() * 4) + 4;
        
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.classList.add('ambient-particle');
            
            // Random properties for natural look
            const size = Math.random() * 150 + 150; // 150px to 300px
            const color = particleColors[Math.floor(Math.random() * particleColors.length)];
            const left = Math.random() * 100; // 0 to 100%
            const top = Math.random() * 100; // 0 to 100%
            
            // Custom CSS variables for animation
            const duration = Math.random() * 10 + 15; // 15s to 25s
            const delay = Math.random() * 5; // 0 to 5s delay
            const moveX = (Math.random() * 20 - 10) + 'vw'; // -10vw to 10vw
            const moveY = (Math.random() * 20 - 10) + 'vh'; // -10vh to 10vh
            const scale = Math.random() * 0.5 + 1; // 1 to 1.5 scale

            // Set properties as CSS variables for flexible responsive control
            particle.style.setProperty('--width', `${size}px`);
            particle.style.setProperty('--height', `${size}px`);
            particle.style.setProperty('--left', `${left}%`);
            particle.style.setProperty('--top', `${top}%`);
            particle.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
            
            // Set CSS variables for keyframes
            particle.style.setProperty('--duration', `${duration}s`);
            particle.style.setProperty('--delay', `${delay}s`);
            particle.style.setProperty('--move-x', moveX);
            particle.style.setProperty('--move-y', moveY);
            particle.style.setProperty('--scale', scale);
            
            container.appendChild(particle);
        }

        // 2. Create 15 to 25 tiny glowing sparks per section
        const numTinyParticles = Math.floor(Math.random() * 11) + 15;
        
        for (let i = 0; i < numTinyParticles; i++) {
            const tiny = document.createElement('div');
            tiny.classList.add('tiny-particle');
            
            const size = Math.random() * 4 + 2; // 2px to 6px
            const color = tinyParticleColors[Math.floor(Math.random() * tinyParticleColors.length)];
            const left = Math.random() * 100; // 0 to 100%
            const top = Math.random() * 100; // 0 to 100%
            
            // Faster animation than large blobs
            const duration = Math.random() * 8 + 7; // 7s to 15s
            const delay = Math.random() * 5; 
            const moveX = (Math.random() * 30 - 15) + 'vw'; 
            const moveY = (Math.random() * 30 - 15) + 'vh'; 
            const opacity = Math.random() * 0.5 + 0.3; // 0.3 to 0.8

            // Set properties as CSS variables for flexible responsive control
            tiny.style.setProperty('--width', `${size}px`);
            tiny.style.setProperty('--height', `${size}px`);
            tiny.style.setProperty('--left', `${left}%`);
            tiny.style.setProperty('--top', `${top}%`);
            tiny.style.backgroundColor = color;
            tiny.style.boxShadow = `0 0 ${size * 2}px ${size * 0.5}px ${color}`;
            tiny.style.opacity = opacity;
            
            // Set CSS variables for keyframes
            tiny.style.setProperty('--duration', `${duration}s`);
            tiny.style.setProperty('--delay', `${delay}s`);
            tiny.style.setProperty('--move-x', moveX);
            tiny.style.setProperty('--move-y', moveY);
            tiny.style.setProperty('--scale', 1); // no scale needed
            
            container.appendChild(tiny);
        }
    });
});