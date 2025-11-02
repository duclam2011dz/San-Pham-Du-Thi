// settings.js
const toggleAutosave = document.getElementById("toggleAutosave");
const backBtn = document.getElementById("backBtn");
const fadeOverlay = document.getElementById("fadeOverlay");

// Fade-in khi mở trang
window.addEventListener("load", () => {
    fadeOverlay.style.opacity = "0";
});

// Fade-out khi quay lại
backBtn.onclick = () => {
    fadeOverlay.style.opacity = "1";
    setTimeout(() => (window.location.href = "./menu.html"), 700);
};

// Giữ nguyên phần autosave (tạm thời)
toggleAutosave.checked = sessionStorage.getItem("editor_autosave") === "true";
toggleAutosave.addEventListener("change", (e) => {
    const enabled = e.target.checked;
    sessionStorage.setItem("editor_autosave", enabled);
    console.log("Autosave Editor:", enabled);
});