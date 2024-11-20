// Toggle List view
const searchField = document.getElementById('search-members');
const listViewButton = document.getElementById('list-button');
const gridViewButton = document.getElementById('grid-button');
const membersGrid = document.querySelector('.members-grid');

function updateMemberCards() {
    return document.querySelectorAll(".member-card"); // Re-fetch cards dynamically
}

// Fetch JSON and populate cards
fetch('../chamber/data/members.json')
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
    })
    .then(members => {
        members.forEach(member => {
            const { name, description, address, phone, website, image, level } = member;

            const memberCard = document.createElement('div');
            memberCard.className = 'member-card';

            memberCard.innerHTML = `
                <img src="${image}" alt="member logo" class="member-logo">
                <p class="member-name">${name}</p>
                <p class="member-description">${description}</p>
                <p class="member-address">${address}</p>
                <p class="member-phone">${phone}</p>
                <a href="${website}" class="member-website">${website}</a>
            `;

            const memberBadge = document.createElement('div');
            memberBadge.className = 'member-badge';

            const levels = { 1: "Member", 2: "Silver", 3: "Gold" };
            const memberLevel = document.createElement('p');
            memberLevel.textContent = levels[level];

            const badgeColors = {
                1: "linear-gradient(45deg, #6e4b3b 20%, #b97c56 40%, #9e5b3e 60%, #c97a47 100%)",
                2: "linear-gradient(45deg, #b6b6b6 20%, #e6e6e6 40%, #c1c1c1 60%, #dcdcdc 100%)",
                3: "linear-gradient(45deg, #AE8625 20%, #f7ef8a 40%, #d2ac47 60%, #edc967 100%)"
            };
            memberBadge.style.background = badgeColors[level];
            memberBadge.appendChild(memberLevel);
            memberCard.appendChild(memberBadge);

            membersGrid.appendChild(memberCard);
        });

        // Re-fetch memberCards after they are added
        memberCards = updateMemberCards();
        console.log("Number of member cards after rendering:", memberCards.length);
    })
    .catch(err => {
        console.error('Error loading or parsing the JSON file:', err);
    });

// Event listeners
searchField.addEventListener("input", function () {
    const query = searchField.value.toLowerCase();
    const memberCards = updateMemberCards(); // Always get the latest cards

    memberCards.forEach(card => {
        const title = card.querySelector(".member-name").textContent.toLowerCase();
        card.style.display = title.includes(query) ? "" : "none";
    });
});

listViewButton.addEventListener("click", function () {
    membersGrid.classList.add("list-view");
    membersGrid.classList.remove("grid-view");
    const memberCards = updateMemberCards();

    memberCards.forEach(card => {
        card.classList.add("list-view");
        card.classList.remove("grid-view");
        let memberDescription = card.querySelector(".member-description");
        memberDescription.style.display = "none";
    });
});

gridViewButton.addEventListener("click", function () {
    membersGrid.classList.remove("list-view");
    membersGrid.classList.add("grid-view");
    const memberCards = updateMemberCards();

    memberCards.forEach(card => {
        card.classList.remove("list-view");
        card.classList.add("grid-view");
    });
});
