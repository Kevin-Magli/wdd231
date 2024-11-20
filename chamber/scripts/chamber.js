// Hamburger menu!
const hamburgerButton = document.getElementById('hamburger-menu');
const navLinks = document.querySelectorAll('.nav-link');


function activateHamburgerMenu() {

    navLinks.forEach((link) => {
        link.classList.toggle('active');
    })
    hamburgerButton.classList.toggle('active')
    if (hamburgerButton.classList.contains('active')) {
        hamburgerButton.innerHTML = "✕";
    } else {
        hamburgerButton.innerHTML = "&#9776";
    }
    
}

hamburgerButton.addEventListener('click', activateHamburgerMenu)

//GetDates
const year = new Date().getFullYear();
document.getElementById("currentYear").innerHTML = year

// last modified
document.getElementById("lastModified").innerHTML = document.lastModified

// Dark mode
const darkButton = document.getElementById("dark-mode");

function switchDarkMode() {
    const root = document.documentElement;
    const theme = localStorage.getItem('theme');

    if (theme === 'dark') {
        // Switch to light mode
        root.style.setProperty('--background-color', '#ffffff');
        root.style.setProperty('--text-color', '#000000');
        root.style.setProperty('--border-color', '#6e6f72');
        root.style.setProperty('--nav-footer-background', '#ffffff');
        darkButton.textContent = "☾"; // Moon symbol for light mode
    
        localStorage.setItem('theme', 'light');
    } else {
        // Switch to dark mode
        root.style.setProperty('--background-color', '#1E1E1E');
        root.style.setProperty('--text-color', '#E0E0E0');
        root.style.setProperty('--border-color', '#E0E0E0');
        root.style.setProperty('--nav-footer-background', '#383838');
        darkButton.textContent = "☼"; // Sun symbol for dark mode
        localStorage.setItem('theme', 'dark');
    }
}

// Apply the saved theme on page load
function applySavedTheme() {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light theme

    if (savedTheme === 'dark') {
        root.style.setProperty('--background-color', '#1E1E1E');
        root.style.setProperty('--text-color', '#E0E0E0');
        root.style.setProperty('--border-color', '#E0E0E0');
        root.style.setProperty('--nav-footer-background', '#383838');
        darkButton.textContent = "☼"; // Sun symbol for dark mode

    } else {
        root.style.setProperty('--background-color', '#ffffff');
        root.style.setProperty('--text-color', '#000000');
        root.style.setProperty('--border-color', '#6e6f72');
        root.style.setProperty('--nav-footer-background', '#ffffff');
        darkButton.textContent = "☾"; // Moon symbol for light mode
    }
}

// Apply theme on page load
document.addEventListener('DOMContentLoaded', applySavedTheme);

// Add event listener for the button
darkButton.addEventListener('click', switchDarkMode);
