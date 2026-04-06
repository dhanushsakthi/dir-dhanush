/* ============================================
   DHANUSH S — CINEMATIC PORTFOLIO
   JavaScript — Interactions & Audio Player
   ============================================ */

// ========== PRELOADER ==========
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('loaded');
    }, 1800);
});

// ========== CUSTOM CURSOR ==========
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor && follower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX - 5 + 'px';
        cursor.style.top = mouseY - 5 + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX - 20) * 0.12;
        followerY += (mouseY - followerY - 20) * 0.12;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Cursor hover effect on interactive elements
    const interactives = document.querySelectorAll('a, button, .skill-card, .ai-card, .software-card, .gallery-item, .timeline-card, .contact-card, .stat');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            follower.style.transform = 'scale(1.5)';
            follower.style.borderColor = 'var(--red-primary)';
            follower.style.opacity = '0.8';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            follower.style.transform = 'scale(1)';
            follower.style.borderColor = 'var(--gold-primary)';
            follower.style.opacity = '0.5';
        });
    });
}

// ========== NAVBAR ==========
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// Scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
    revealOnScroll();
    animateSkillBars();
});

// Mobile toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// Active nav link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ========== SCROLL REVEAL ==========
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 120;
        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('visible');
        }
    });
}

// Add reveal class to elements
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll(
        '.about-grid, .about-image-wrapper, .about-content, ' +
        '.timeline-item, ' +
        '.skill-card, ' +
        '.ai-card, ' +
        '.software-card, ' +
        '.education-card, ' +
        '.audio-showcase, .portfolio-gallery, .resume-section, ' +
        '.contact-card, .contact-cta'
    );
    revealElements.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = (i % 6) * 0.1 + 's';
    });

    // Initial check
    revealOnScroll();
    animateSkillBars();
});

// ========== SKILL BAR ANIMATION ==========
let skillsAnimated = false;
function animateSkillBars() {
    if (skillsAnimated) return;
    const skillSection = document.getElementById('skills');
    if (!skillSection) return;

    const rect = skillSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        const fills = document.querySelectorAll('.skill-fill');
        fills.forEach(fill => {
            const width = fill.getAttribute('data-width');
            fill.style.width = width + '%';
        });
        skillsAnimated = true;
    }
}

// ========== AUDIO PLAYER ==========
let currentAudio = null;
let currentTrackEl = null;

function togglePlay(btn) {
    const trackEl = btn.closest('.audio-track');
    const src = trackEl.getAttribute('data-src');
    const iconPlay = btn.querySelector('.icon-play');
    const iconPause = btn.querySelector('.icon-pause');

    // If clicking same track that's playing, pause it
    if (currentTrackEl === trackEl && currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
        trackEl.classList.remove('playing');
        return;
    }

    // If another track is playing, stop it
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        if (currentTrackEl) {
            currentTrackEl.classList.remove('playing');
            const prevPlay = currentTrackEl.querySelector('.icon-play');
            const prevPause = currentTrackEl.querySelector('.icon-pause');
            if (prevPlay) prevPlay.style.display = 'block';
            if (prevPause) prevPause.style.display = 'none';
            const prevFill = currentTrackEl.querySelector('.progress-fill');
            if (prevFill) prevFill.style.width = '0%';
        }
    }

    // Create new audio or resume
    if (currentTrackEl !== trackEl) {
        currentAudio = new Audio(src);
    }

    currentTrackEl = trackEl;

    currentAudio.play().then(() => {
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
        trackEl.classList.add('playing');
    }).catch(err => {
        console.log('Audio playback error:', err);
        // Show a message if file not found
        const trackName = trackEl.querySelector('.track-name');
        if (trackName) {
            trackName.textContent = '⚠ File not found — Add audio to music/ folder';
            trackName.style.color = '#e63956';
        }
    });

    // Update progress
    currentAudio.addEventListener('timeupdate', () => {
        if (currentAudio.duration) {
            const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
            const fill = trackEl.querySelector('.progress-fill');
            if (fill) fill.style.width = progress + '%';

            const durationEl = trackEl.querySelector('.track-duration');
            if (durationEl) {
                const minutes = Math.floor(currentAudio.currentTime / 60);
                const seconds = Math.floor(currentAudio.currentTime % 60);
                durationEl.textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
            }
        }
    });

    // When track ends
    currentAudio.addEventListener('ended', () => {
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
        trackEl.classList.remove('playing');
        const fill = trackEl.querySelector('.progress-fill');
        if (fill) fill.style.width = '0%';
        const durationEl = trackEl.querySelector('.track-duration');
        if (durationEl) durationEl.textContent = '0:00';
    });
}

function seekAudio(event, container) {
    if (!currentAudio || !currentTrackEl) return;
    const trackEl = container.closest('.audio-track');
    if (trackEl !== currentTrackEl) return;

    const rect = container.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = clickX / rect.width;
    currentAudio.currentTime = percentage * currentAudio.duration;
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========== PARALLAX EFFECT ON HERO ==========
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    if (hero) {
        const scrollY = window.scrollY;
        hero.style.transform = `translateY(${scrollY * 0.3}px)`;
        hero.style.opacity = 1 - scrollY / 800;
    }
});

// ========== TYPEWRITER EFFECT FOR HERO TAGLINE ==========
document.addEventListener('DOMContentLoaded', () => {
    const tagline = document.querySelector('.hero-tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.style.borderRight = '2px solid var(--gold-primary)';

        setTimeout(() => {
            let i = 0;
            const typeInterval = setInterval(() => {
                tagline.textContent += text.charAt(i);
                i++;
                if (i >= text.length) {
                    clearInterval(typeInterval);
                    setTimeout(() => {
                        tagline.style.borderRight = 'none';
                    }, 1000);
                }
            }, 50);
        }, 2000);
    }
});

// ========== COUNTER ANIMATION FOR STATS ==========
function animateCounter(el, target, duration = 2000) {
    let start = 0;
    const isFloat = target.toString().includes('.');
    const increment = target / (duration / 16);

    function update() {
        start += increment;
        if (start >= target) {
            el.textContent = isFloat ? target.toFixed(2) : target;
            return;
        }
        el.textContent = isFloat ? start.toFixed(2) : Math.floor(start);
        requestAnimationFrame(update);
    }
    update();
}

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (!isNaN(parseFloat(text)) && !stat.dataset.animated) {
                    stat.dataset.animated = 'true';
                    animateCounter(stat, parseFloat(text));
                }
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ========== TILT EFFECT ON CARDS ==========
document.querySelectorAll('.ai-card, .skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

console.log('🎬 Dhanush S — Portfolio Loaded Successfully');
console.log('📧 Contact: s46dhanush2005@gmail.com');
