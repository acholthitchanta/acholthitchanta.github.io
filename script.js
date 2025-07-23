// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Hide all content and disable scrolling/swiping
    const contentContainer = document.querySelector('body > :not(#loading-screen)');
    if (contentContainer) {
        contentContainer.style.display = 'none';
    }
    document.body.style.overflow = 'hidden'; // Disable all scrolling/swiping
    document.body.style.overflowX = 'hidden'; // Explicitly disable horizontal
    document.body.style.overflowY = 'hidden'; // Explicitly disable vertical
    document.body.classList.add('no-touch'); // Add class to block touch events
    // Hide sidebar to prevent swipe access
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.visibility = 'hidden';
    }
});

function showSideBar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.add('open');
    document.body.classList.add('sidebar-open');
}

function hideSideBar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.remove('open');
    document.body.classList.remove('sidebar-open');
}

document.addEventListener('scroll', () => {
    const row1 = document.querySelector('#row1');
    const row2 = document.querySelector('#row2');
    const skills = document.querySelector('#skills');
    const contact = document.querySelector('#contact');
    const contactRect = contact.getBoundingClientRect();
    const gallery = document.querySelector('#gallery');
    const galleryRect = gallery.getBoundingClientRect();
    const row1Rect = row1.getBoundingClientRect();
    const row2Rect = row2.getBoundingClientRect();
    const maxTranslate = 0.7 * row1Rect.width;

    if (galleryRect.top < window.innerHeight && galleryRect.bottom > 0) {
        const scrollY = window.scrollY;
        const skillsTop = skills.offsetTop;
        const contactBottom = contact.offsetTop + contactRect.height;
        const scrollRange = contactBottom - skillsTop;
        const scrollProgress = Math.max(0, Math.min(1, (scrollY - skillsTop) / scrollRange));

        const translateX1 = maxTranslate * scrollProgress;
        row1.style.transform = `translateX(-${translateX1}px)`;

        const translateX2 = maxTranslate * scrollProgress;
        row2.style.transform = `translateX(calc(-100% + 100vw + ${translateX2}px))`;
    } else {
        row1.style.transform = 'translateX(0)';
        row2.style.transform = 'translateX(calc(-100% + 100vw))';
    }
});

window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('#loading-screen');
    const contentContainer = document.querySelector('body > :not(#loading-screen)');
    if (loadingScreen && contentContainer) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            contentContainer.style.display = 'block';
            document.body.style.overflowY = 'auto'; // Restore vertical scrolling
            document.body.style.overflowX = 'hidden'; // Keep horizontal scrolling disabled
            document.body.classList.remove('no-touch'); // Restore touch events
            // Restore sidebar visibility
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.style.visibility = 'visible';
            }

            // Trigger intro animation
            const intro = document.querySelector('.intro');
            if (intro) {
                intro.classList.add('intro-slide-in');
            }

            // Trigger typing animation
            const animatedText = document.querySelector('.animated-text span');
            if (animatedText) {
                animatedText.classList.add('typing-start');
            }

            // Trigger nav slide-down animation
            const nav = document.querySelector('nav');
            const aboutMeSection = document.querySelector('#about-me');
            if (nav && aboutMeSection) {
                // Check if about-me is in viewport to decide initial nav state
                const aboutMeRect = aboutMeSection.getBoundingClientRect();
                if (aboutMeRect.top <= window.innerHeight * 0.1 && aboutMeRect.bottom >= 0) {
                    nav.style.position = 'sticky';
                    nav.style.top = '0';
                    nav.classList.add('slide-in-animation');
                } else {
                    nav.style.position = 'static';
                    nav.classList.remove('slide-in-animation');
                    nav.style.transform = 'none';
                }

                // Set up nav observer for subsequent scroll events
                const aboutMeObserver = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                nav.style.position = 'sticky';
                                nav.style.top = '0';
                                nav.style.transform = '';
                                nav.classList.add('slide-in-animation');
                            } else if (entry.boundingClientRect.top > 0) {
                                nav.style.position = 'static';
                                nav.classList.remove('slide-in-animation');
                                nav.style.transform = 'none';
                            }
                        });
                    },
                    { 
                        root: null, 
                        threshold: 0.1,
                        rootMargin: '0px'
                    }
                );
                aboutMeObserver.observe(aboutMeSection);
            }

            // Trigger scroll animations for visible elements
            const elementsToAnimate = document.querySelectorAll(
                '#about-me > *, #skills > *, #gallery > *, #contact'
            );
            const scrollObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            scrollObserver.unobserve(entry.target);
                        }
                    });
                },
                {
                    root: null,
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                }
            );

            elementsToAnimate.forEach((element) => {
                element.classList.add('animate-on-scroll');
                // Trigger animation immediately if element is in viewport
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom >= 0) {
                    element.classList.add('visible');
                } else {
                    scrollObserver.observe(element);
                }
            });
        }, 500);
    }
});