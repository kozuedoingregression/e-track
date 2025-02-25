// Function to toggle dark mode
function toggleDarkMode() {
    let body = document.body;
    body.classList.toggle("dark-mode");

    // Save theme preference in localStorage
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// Apply the saved theme when the page loads
function applySavedTheme() {
    let savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
}

// Call function to apply theme
applySavedTheme();
console.log("working");
