
export function initFooter() {
    const footerView = document.getElementById("footer-View");
    if (!footerView) return;
    footerView.innerHTML = `
    <footer class="site-footer">
        <div class="massive-text">AL JAVIR</div>
        <div class="copyright-info">
            <div class="copyright">© 2026 AL JAVIR. ALL RIGHTS RESERVED.</div>
            <div class="FancyButtonProps">
                <button class="fancy-button" aria-label="Facebook Button">
                    <div class="shimmer"></div>
                    <div class="icon-content">
                        <img src="/assets/icons/facebook.svg" alt="Facebook" class="icon" />
                    </div>
                </button>
                <button class="fancy-button green" aria-label="WhatsApp Button">
                    <div class="shimmer"></div>
                    <div class="icon-content">
                        <img src="/assets/icons/whatsapp.svg" alt="whatsapp" class="icon" />
                    </div>
                </button>
                <button class="fancy-button indigo" aria-label="LinkedIn Button">
                    <div class="shimmer"></div>
                    <div class="icon-content">
                        <img src="/assets/icons/linkedin.svg" alt="linkedin" class="icon" />
                    </div>
                </button>
                <button class="fancy-button red" aria-label="GitHub Button">
                    <div class="shimmer"></div>
                    <div class="icon-content">
                        <img src="/assets/icons/github.svg" alt="github" class="icon" />
                    </div>
                </button>
            </div>
            <a href="#" class="btn-carfted-by">
                CRAFTED WITH <span class="heart-blink">❤️</span> BY <span class="logo-footer">JAVIR</span>
            </a>
        </div>
    </footer>
    `;
}