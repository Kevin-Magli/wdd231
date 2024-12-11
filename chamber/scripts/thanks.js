// Extract query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);

// Populate the thank-you page with the extracted data
document.getElementById("first-name").textContent = urlParams.get("first-name");
document.getElementById("last-name").textContent = urlParams.get("last-name");
document.getElementById("email").textContent = urlParams.get("email");
document.getElementById("phone").textContent = urlParams.get("phone");
document.getElementById("org-name").textContent = urlParams.get("org-name");
document.getElementById("date").textContent = urlParams.get("timestamp");

// http://127.0.0.1:3000/chamber/thank-you.html?first-name=KEvin&last-name=Magli&organization-title=manager&email=kmagliocchi%40gmail.com&phone=11998583166&org-name=SBC+Chamberer&member-level=Gold&org-description=super+cool+organization+%3A%29&credit-card-info=1234-1234-1234-1234&timestamp=12%2F11%2F2024%2C+11%3A06%3A47+AM