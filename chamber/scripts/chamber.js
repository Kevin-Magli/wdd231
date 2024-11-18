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