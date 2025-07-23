document.addEventListener('DOMContentLoaded', () => {

    // Existing nav slide-down observer
    const nav = document.querySelector('nav');
    const aboutMeSection = document.querySelector('#about-me');

    const intro = document.querySelector('.intro');
    if (intro) {
        intro.classList.add('intro-slide-in');
    }


    const aboutMeObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    nav.style.position = "sticky";
                    nav.style.transform = "";
                    nav.classList.add('slide-in-animation');
                }
                else if (entry.boundingClientRect.top > 0){
                    nav.style.position = "static";

                    nav.classList.remove('slide-in-animation');
                    nav.style.transform = "none";
                }
            });
        },
        { root: null, threshold: 0.1 }
    );

    aboutMeObserver.observe(aboutMeSection);

    // New observer for scroll animations
    const elementsToAnimate = document.querySelectorAll(
        '#about-me > *, #skills > *, #gallery > *, #contact'
    );

    const scrollObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: Stop observing after animation to improve performance
                    scrollObserver.unobserve(entry.target);
                }
            });
        },
        {
            root: null, // Use viewport
            threshold: 0.1, // Trigger when 10% of element is visible
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters
        }
    );

    elementsToAnimate.forEach((element) => {
        element.classList.add('animate-on-scroll');
        scrollObserver.observe(element);
    });


});


function showSideBar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.add('open');
    document.body.classList.add('sidebar-open');
}

function hideSideBar(){
    const sidebar= document.querySelector('.sidebar')
    sidebar.classList.remove('open')
    document.body.classList.remove('sidebar-open');
}




document.addEventListener('scroll', () => {
    const row1 = document.querySelector('#row1');
    const row2 = document.querySelector('#row2');

    const skills = document.querySelector('#skills');

    const contact = document.querySelector('#contact');
    const contactRect  = contact.getBoundingClientRect();

    
    const gallery = document.querySelector('#gallery');
    const galleryRect  = gallery.getBoundingClientRect();

    const row1Rect = row1.getBoundingClientRect();
    const row2Rect = row2.getBoundingClientRect();


    
    const maxTranslate = 0.7*row1Rect.width;



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



window.addEventListener('DOMContentLoaded', function() {
    const contentContainer = document.querySelector('body > :not(#loading-screen)');
    if (contentContainer) {
        contentContainer.style.display = 'none';
    }

})

window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('#loading-screen');
    const contentContainer = document.querySelector('body > :not(#loading-screen)');
    if (loadingScreen && contentContainer) {
        loadingScreen.style.display = 'none';
        contentContainer.style.display = 'block';
    }
}); 
