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
