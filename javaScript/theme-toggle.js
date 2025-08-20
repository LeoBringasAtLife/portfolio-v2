// Theme toggle functionality
const toggleBtn = document.getElementById("toggle-dark");
const iconDark = document.getElementById("icon-dark");
const iconLight = document.getElementById("icon-light");

toggleBtn.addEventListener("click", () => {
document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        iconDark.style.display = "none";
        iconLight.style.display = "inline";
    } else {
        iconDark.style.display = "inline";
        iconLight.style.display = "none";
    }
});
