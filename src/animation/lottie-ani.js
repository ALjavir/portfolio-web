export function initlottie(_idHtml, _path) {
    const container = document.getElementById(_idHtml);
    
    // 🚨 If the div doesn't exist, scream at us in the console!
    if (!container) {
        console.error(`❌ LOTTIE ERROR: Cannot find '<div id="${_idHtml}">'. The HTML is either missing, malformed, or hasn't loaded yet.`);
        return; 
    }

    lottie.loadAnimation({
        container: container,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: _path
    });
    
    console.log(`✅ Lottie loaded perfectly into: ${_idHtml}`);
}