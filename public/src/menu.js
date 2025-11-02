const playBtn = document.getElementById("playBtn");
const settingsBtn = document.getElementById("settingsBtn");
const quitBtn = document.getElementById("quitBtn");
const editorBtn = document.getElementById("editorBtn");
const fadeOverlay = document.getElementById("fadeOverlay");
const menuContainer = document.getElementById("menuContainer");

window.addEventListener("load", () => {
    setTimeout(() => (menuContainer.style.opacity = "1"), 50);
});

function fadeToPage(targetUrl) {
    fadeOverlay.classList.remove("pointer-events-none");
    fadeOverlay.style.opacity = "1";
    setTimeout(() => (window.location.href = targetUrl), 700);
}

playBtn.onclick = () => fadeToPage("./game.html");
settingsBtn.onclick = () => fadeToPage("./settings.html");
editorBtn.onclick = () => fadeToPage("./editor.html");

quitBtn.onclick = () => {
    if (confirm("Bạn có chắc muốn thoát game không?")) {
        window.close();
        if (!window.closed) alert("⚠️ Trình duyệt không cho phép tự tắt tab. Hãy đóng thủ công nhé!");
    }
};