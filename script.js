document.addEventListener('DOMContentLoaded', () => {
    const contentContainer = document.querySelector('body > :not(#loading-screen)');
    if (contentContainer) {
        contentContainer.style.display = 'none';
    }

    document.body.style.overflow = 'hidden';
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
    const skillsRect = skills.getBoundingClientRect();
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
            document.body.style.overflowY = 'auto';
            const intro = document.querySelector('.intro');
            if (intro) {
                intro.classList.add('intro-slide-in');
            }

            const animatedText = document.querySelector('.animated-text span');
            if (animatedText) {
                animatedText.classList.add('typing-start');
            }
        }, 500);
    }


});

const scrollElements = document.querySelectorAll(
    ' #about-me > *, #main-pic, #skills > *, #gallery h2, #contact > *:not(#social-media), #social-media'
);

const elementInView= (el, scrollOffset = 20) =>{
    const elementTop = el.getBoundingClientRect().top;

    return(
        elementTop <= ((window.innerHeight || document.documentElement.clientHeight) - scrollOffset)
    );
};

const displayScrollElement = (element, animation) => {
    element.classList.add(animation);
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el,20)){
            if (el.matches('#about-me > *') || el.matches('#gallery') || el.matches('#social-media')) displayScrollElement(el, "shift-right");
            else if (el.matches('#skills > *')) displayScrollElement(el, "shift-left");
            else if (el.matches('#contact > *')) displayScrollElement(el, "shift-up");
            el.style.opacity = '1';
        }


    })
}

window.addEventListener('scroll', () => {
    handleScrollAnimation();
})


const nav = document.querySelector('nav');
const aboutMeSection = document.querySelector('#about-me');

const aboutMeObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                nav.style.top = "0";
                nav.style.transform = "";
                nav.classList.add('slide-in-animation');
                nav.style.position = "sticky";
            } else if (entry.boundingClientRect.top > 0) {
                nav.style.position = "static";
                nav.classList.remove('slide-in-animation');
                nav.style.transform = "none";
            }
        });
    },
    { 
        root: null, 
        threshold: 0.1,
        rootMargin: '0px'
    }
);

if (aboutMeSection) {
    aboutMeObserver.observe(aboutMeSection);
}