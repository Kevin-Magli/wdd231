// JavaScript to handle "last visited" functionality
(function () {
    const visitMessage = document.getElementById('visit-message');

    // Get the current date in milliseconds
    const currentDate = Date.now();

    // Retrieve the last visit date from localStorage
    const lastVisit = localStorage.getItem('lastVisit');

    if (!lastVisit) {
        // First visit
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        // Calculate the difference in days
        const lastVisitDate = parseInt(lastVisit, 10);
        const timeDifference = currentDate - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (timeDifference < 1000 * 60 * 60 * 24) {
            // Less than a day
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            // Exactly 1 day
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            // More than 1 day
            visitMessage.textContent = `You last visited ${daysDifference} days ago.`;
        }
    }

    // Update localStorage with the current date
    localStorage.setItem('lastVisit', currentDate);
})();