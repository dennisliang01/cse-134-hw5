
let toggleBtn = document.getElementById("color-mode-button");
let theme = document.getElementById("body-theme")
let darkMode = localStorage.getItem("dark-mode");

const enableDarkMode = () => {
    theme.classList.add("dark-mode-theme");
    toggleBtn.classList.remove("dark-mode-toggle");
    localStorage.setItem("dark-mode", "enabled");
};

const disableDarkMode = () => {
    theme.classList.remove("dark-mode-theme");
    toggleBtn.classList.add("dark-mode-toggle");
    localStorage.setItem("dark-mode", "disabled");
};

if (darkMode == "enabled") {
    enableDarkMode();
}

toggleBtn.addEventListener("click", (e) => {
    darkMode = localStorage.getItem("dark-mode");
    if(darkMode == "disabled") {
        enableDarkMode();
        document.getElementById("color-mode-image").src = "./assets/icons/lightMode.svg";
    } else {
        disableDarkMode();
        document.getElementById("color-mode-image").src = "./assets/icons/darkMode.svg";
    }
});
