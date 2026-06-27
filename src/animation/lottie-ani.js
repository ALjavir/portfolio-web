export function initlottie(_idHtml, _path) {
    const smileContainer = document.getElementById(_idHtml);
    
    if (smileContainer) {
        
    
        lottie.loadAnimation({
            container: smileContainer,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: _path
        });
    }
}