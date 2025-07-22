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
}

function hideSideBar(){
    const sidebar= document.querySelector('.sidebar')
    sidebar.classList.remove('open')
}






