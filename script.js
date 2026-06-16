const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.querySelector('.qr-body');
const themeToggle = document.getElementById('themeToggle');

let size = sizes.value;
generateBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    isEmptyInput();
});

sizes.addEventListener('change',(e)=>{
    size = e.target.value;
    isEmptyInput();
});

downloadBtn.addEventListener('click', ()=>{
    let img = document.querySelector('.qr-body img');

    if(img !== null){
        let imgAtrr = img.getAttribute('src');
        downloadBtn.setAttribute("href", imgAtrr);
    }
    else{
        downloadBtn.setAttribute("href", `${document.querySelector('canvas').toDataURL()}`);
    }
});

function isEmptyInput(){
    // if(qrText.value.length > 0){
    //     generateQRCode();
    // }
    // else{
    //     alert("Enter the text or URL to generate your QR code");
    // }
    qrText.value.length > 0 ? generateQRCode() : alert("Enter the text or URL to generate your QR code");;
}
// Theme functions
function applyTheme(theme){
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeToggle) themeToggle.textContent = theme === 'dark' ? 'Switch to Light' : 'Switch to Dark';
}

// initialize theme
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = document.body.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
    });
}
function generateQRCode(){
    qrContainer.innerHTML = "";
    // generate QR with black modules on white background
    new QRCode(qrContainer, {
        text: qrText.value,
        height: size,
        width: size,
        colorLight: "#ffffff",
        colorDark: "#000000",
    });

    // After render, flatten onto a white canvas and add a quiet zone (margin)
    const observer = new MutationObserver((mutations, obs) => {
        const canvas = qrContainer.querySelector('canvas');
        const img = qrContainer.querySelector('img');
        if (canvas || img) {
            obs.disconnect();

            // determine source canvas (if img, draw it onto canvas first)
            if (img && !canvas) {
                const tmp = document.createElement('canvas');
                const w = img.naturalWidth || size;
                const h = img.naturalHeight || size;
                tmp.width = w;
                tmp.height = h;
                const tctx = tmp.getContext('2d');
                tctx.fillStyle = '#ffffff';
                tctx.fillRect(0,0,w,h);
                tctx.drawImage(img, 0,0,w,h);
                img.parentNode.replaceChild(tmp, img);
            }

            const finalCanvas = qrContainer.querySelector('canvas');
            if (finalCanvas) {
                const w = finalCanvas.width;
                const h = finalCanvas.height;
                // add quiet zone = max(20px, 4% of size)
                const margin = Math.max(20, Math.round(w * 0.04));
                const out = document.createElement('canvas');
                out.width = w + margin * 2;
                out.height = h + margin * 2;
                const ctx = out.getContext('2d');
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, out.width, out.height);
                // draw original QR centered
                ctx.drawImage(finalCanvas, margin, margin, w, h);
                // replace in DOM
                finalCanvas.parentNode.replaceChild(out, finalCanvas);
                // ensure download uses flattened image
                downloadBtn.setAttribute('href', out.toDataURL('image/png'));
            }
        }
    });
    observer.observe(qrContainer, { childList: true, subtree: true });
}
