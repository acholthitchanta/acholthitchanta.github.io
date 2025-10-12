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
    const contact = document.querySelector('#contact');
    const contactRect = contact.getBoundingClientRect();
    const gallery = document.querySelector('#gallery');
    const galleryRect = gallery.getBoundingClientRect();
    const row1Rect = row1.getBoundingClientRect();
    const maxTranslate = 0.5*row1Rect.width;

    if (galleryRect.top < window.innerHeight && galleryRect.bottom > 0) {
       const scrollY = window.scrollY;
        const skillsTop = skills.offsetTop;
        const contactBottom = contact.offsetTop + contactRect.height;
        const scrollRange = contactBottom - skillsTop;
        const scrollProgress = Math.max(0, Math.min(1, (scrollY - skillsTop) / scrollRange));

        const translateX1 = maxTranslate * scrollProgress;
        row1.style.transform = `translateX(-${translateX1}px)`;
        row2.style.transform = `translateX(calc(-100% + 100vw + ${translateX1}px))`;
    } else {
        row1.style.transform = 'translateX(0)';
        row2.style.transform = 'translateX(calc(-100% + 100vw))';

    }
});

window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('#loading-screen');
    const contentContainer = document.querySelector('body > :not(#loading-screen)');
    if (loadingScreen && contentContainer) {
        // Add transition for smooth fade-out
        loadingScreen.style.transition = 'opacity 0.5s ease-out';
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            contentContainer.style.display = 'block';
            document.body.style.overflowY = 'auto';

            const intro = document.querySelector('.intro');
            if (intro) {
                var typed = new Typed('.auto-type', {
                strings: ['software developer', 'graphic designer', 'problem solver', 'creator', 'lifelong learner'],
                typeSpeed: 90,
                backSpeed: 50,
                loop: true
                });
                const introElements = document.querySelectorAll('.intro h1, .intro h2, .intro h2 > span, .intro p');
                introElements.forEach((element, i) => {
                    setTimeout(() => {
                        displayScrollElement(element, "shift-left");
                        element.style.opacity= '1';
                    }, i * 50);
                });

                const code = document.querySelector('#code')
                displayScrollElement(code, 'shift-up')
                code.style.opacity = '1'

            }

        }, 500); 
    }
});

const elementInView= (el, scrollOffset = 20) =>{
    const elementTop = el.getBoundingClientRect().top;

    return(
        elementTop <= ((window.innerHeight || document.documentElement.clientHeight) - scrollOffset)
    );
};

const displayScrollElement = (element, animation) => {
    element.classList.add(animation);
};

const removeScrollElement = (element, animation) =>{
    element.classList.remove(animation);


}

function oneByOne(elements, action, delay){
    const logoSlider = document.querySelectorAll(elements);
    logoSlider.forEach((logo, i) => {
        setTimeout(() => {
            displayScrollElement(logo, action);
            logo.style.opacity = '1';
        }, i * delay); 
    })
}

function oneByOneRemove(elements, action, delay){
    const logoSlider = document.querySelectorAll(elements);
    logoSlider.forEach((logo, i) => {
        setTimeout(() => {
            logo.classList.remove(action)
            logo.style.opacity = '0';
        }, i * delay); 
    })
}


const observerOptions = {
  threshold: 0,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const el = entry.target;
    const isVisible = entry.isIntersecting;

    if (isVisible) {
      // === ENTER VIEWPORT ===
      el.classList.remove('fade-out');
      if (el.matches('#about-me > * ')) {
        displayScrollElement(document.querySelector('#main-pic'), 'shift-right');
        oneByOne('.info h2, .bio p', 'shift-left', 100);
      } 
      else if (el.matches('#skills h2')) {
        displayScrollElement(el, "shift-down");
      } 
      else if (el.matches('#skills > *')){
        oneByOne('.logo', 'shift-up', 100);
    }
      else if (el.matches('#contact > *:not(social-media')) {
        displayScrollElement(el,'shift-up');
      }
      else if (el.matches('#social-media')){
        oneByOne('#social-media', 'shift-up',50);
      }
      el.style.opacity = 1;
    } else {
      // === LEAVE VIEWPORT ===
        el.classList.add('fade-out')
        el.style.opacity = '0'
      if (el.matches('#about-me > * ')) {
        removeScrollElement(document.querySelector('#main-pic'), 'shift-right');
        oneByOneRemove('.info h2, .bio p, .bio li a', 'shift-left', 100);
      } 
      else if (el.matches('#skills h2')) {
        removeScrollElement(el, "shift-down");
      } 
      else if (el.matches('#skills > *')){
        oneByOneRemove('.logo', 'shift-up', 100)
    }
      else if (el.matches('#contact > *:not(social-media')) {
        removeScrollElement(el,'shift-up')
      }
      else if (el.matches('#social-media')){
        oneByOneRemove('#social-media', 'shift-up', 50)
      }
      el.classList.remove('shift-up', 'shift-down', 'shift-left', 'shift-right');
    }
  });
}, observerOptions);

document.querySelectorAll('#about-me > *, #skills h2, #skills > *, #gallery h2, #contact > *:not(#social-media), #social-media').forEach((section) => {
  sectionObserver.observe(section);
});



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
                nav.classList.add('hover-effect'); 
            } else if (entry.boundingClientRect.top > 0) {
                nav.style.position = "static";
                nav.classList.remove('slide-in-animation');
                nav.style.transform = "none";
                nav.classList.remove('hover-effect');

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