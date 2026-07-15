
export function initContact() {
    const contactView = document.getElementById("contact-body");
    if (!contactView) return;
    contactView.innerHTML = `
                <div class="premium-card-container scroll-reveal fade-up" style="transition-delay: 0.4s;">
                    <div class="container-left-line"></div>
                    <div class="container-bg-number">01</div>
                    <div class="container-content">
                        <div class="quote-content">
                            <span class="eyebrow">My Philosophy</span>
                            <p class="quote">
                                "Everything I build rejects the typical template. I choose
                                <strong>perfection over
                                    volume</strong> fusing clean code with unconventional design. This portfolio is
                                simply an
                                example of that mindset: turning complex engineering into something <strong>stunningly
                                    creative,
                                    yet beautifully simple.</strong>"
                            </p>
                            <div class="email-phone-info">
                                <span class="contact-divider-horizental"></span>
                                <div class="phone-email">
                                    <span>
                                        flutter.x.tonmoy@gmail.com
                                    </span>
                                    <span">
                                        01621204599
                                        </span>
                                </div>
                            </div>


                            <div class="fancy-button-cv">
                                <a href="https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE"
                                    target="_blank" class="download-cv" style="text-decoration: none;">
                                    <span>Download CV</span>
                                </a>
                            </div>


                            <div class="FancyButtonProps-desktop">
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
                                    <span class="contact-divider-vartical"></span>
                                    <a href="https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE"
                                        target="_blank" class="download-cv" style="text-decoration: none;">
                                        <span>Download CV</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          
    `;
}