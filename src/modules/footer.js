
export function initFooter() {
    const footerView = document.getElementById("footer-View");
    if (!footerView) return;
    footerView.innerHTML = `
    <footer class="site-footer">
        <div class="massive-text">AL JAVIR</div>
        <div class="copyright-info">
            <div class="copyright">© 2026 AL JAVIR. ALL RIGHTS RESERVED.</div>
            <div class="FancyButtonProps">
              <a href="https://www.facebook.com/share/1G5s1AB5Bp/" 
                class="fancy-button" 
                aria-label="Facebook Link" 
                target="_blank" 
                rel="noopener noreferrer">
                
                    <div class="shimmer"></div>
                    <div class="icon-content">
                        <img src="/assets/icons/facebook.svg" alt="Facebook" class="icon" />
                    </div>
             </a>
                <a href="https://wa.me/01621204599" class="fancy-button green" aria-label="WhatsApp Link" target="_blank" rel="noopener noreferrer">
    <div class="shimmer"></div>
    <div class="icon-content">
        <img src="/assets/icons/whatsapp.svg" alt="whatsapp" class="icon" />
    </div>
</a>

<a href="https://www.linkedin.com/in/al-javir-724178396?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" class="fancy-button indigo" aria-label="LinkedIn Link" target="_blank" rel="noopener noreferrer">
    <div class="shimmer"></div>
    <div class="icon-content">
        <img src="/assets/icons/linkedin.svg" alt="linkedin" class="icon" />
    </div>
</a>

<a href="https://github.com/ALjavir" class="fancy-button red" aria-label="GitHub Link" target="_blank" rel="noopener noreferrer">
    <div class="shimmer"></div>
    <div class="icon-content">
        <img src="/assets/icons/github.svg" alt="github" class="icon" />
    </div>
</a>
            </div>
            <a href="#" class="btn-carfted-by">
                CRAFTED WITH <span class="heart-blink">❤️</span> BY <span class="logo-footer">JAVIR</span>
            </a>
        </div>
    </footer>
    `;
}