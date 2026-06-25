/* ==========================================================================
   NAVIGATION CONTROLLER MODULE (Replaces navBar_route.dart state behaviors)
   ========================================================================== */

export function initNavbar() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const navLinks = document.querySelectorAll('.nav-item-desktop, .nav-item-mobile');

    // 1. Interactive Drawer Open/Close Handler (Replaces showModalBottomSheet())
    if (menuBtn && mobileDrawer) {
        menuBtn.addEventListener('click', () => {
            // Toggle active visibility styling hook flags
            menuBtn.classList.toggle('open');
            mobileDrawer.classList.toggle('active');
        });
    }

    // 2. Smooth Section View Intercepts & Self-Closing Overlay Behavior
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Stop raw jumping behaviors

            // Pull anchor target section element hook reference out from parsing href strings
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Calculate position offsets slightly below sticky header boundary boxes
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                // Fire smooth window animation tracking views down to elements
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }

            // Clean up state tracking overlays if an option link selection fires while active
            if (mobileDrawer.classList.contains('active')) {
                menuBtn.classList.remove('open');
                mobileDrawer.classList.remove('active');
            }
        });
    });

    console.log("🔹 Navbar module initialized with clean single-page scroll routes.");
}