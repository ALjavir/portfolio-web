export function initaddanimationtoitem() {
    const revealOptions = {
        root: null,
        threshold: 0.05, // 5% visibility triggers activation
        rootMargin: "0px 0px -20px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Stop tracking once visible
            }
        });
    }, revealOptions);

    // Track all reveal elements
    const elementsToReveal = document.querySelectorAll(".scroll-reveal");
    elementsToReveal.forEach(element => revealObserver.observe(element));

    // 💡 HERO SAFETY NET: Instantly reveal anything currently visible inside the viewport on load
    setTimeout(() => {
        elementsToReveal.forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight) {
                element.classList.add("active");
            }
        });
    }, 50); 
}