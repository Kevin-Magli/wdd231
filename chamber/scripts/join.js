const membershipList = [
    {
        membershipName: "Non-Profit",
        benefits: [
            "Invitations to special events tailored for non-profits",
            "Access to entry-level business training sessions.",
            "Discounts on select events and advertisint opportunities.",
        ],
        description: "Designed for non-profits seeking community engagement and essential resources to support their growth. Join today to connect with other organizations and make a bigger impact!"
    },
    {
        membershipName: "Bronze",
        benefits: [
            "Spotlight position on the home page (rotating feature).",
            "Invitations to networking events and workshops.",
            "Access to foundational business training sessions.",
            "Moderate discounts on events and advertising.",
        ],
        description: "Ideal for small businesses looking to build their presence and grow their network. Join the Bronze level to gain access to valuable resources and community recognition!"
    },
    {
        membershipName: "Silver",
        benefits: [
            "Priority spotlight on the home page (rotating feature).",
            "Invitations to premium networking events.",
            "Access to intermediate training sessions for business scaling.",
            "Significant discounts on events and advertising packages.",
        ],
        description: "Perfect for established businesses ready to take their operations to the next level. Silver members enjoy increased visibility and exclusive access to growth-focused opportunities!"
    },
    {
        membershipName: "Gold",
        benefits: [
            "Exclusive, permanent spotlight position on the home page.",
            "Access to all special events including VIP-only events.",
            "Exclusive training sessions for business growth.",
            "Highest discounts on events and advertising.",
        ],
        description: "Join now to get premium exposure and the best benefits for your business!"
    },
];

function displayModal(membership) {

    const modal = document.getElementById('course-details-modal');
    
    
    modal.innerHTML = `
        <div class="title-bar">
            <h2>${membership.membershipName}</h2>
            <button id="modalClose">❌</button>
        </div>
        <div class="membership-details">
            <h3>Benefits:</h3>
            <ul>
                ${membership.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
            </ul>
            <p>${membership.description}</p>
        </div>
    `;

    modal.showModal();

    const modalClose = document.getElementById('modalClose');
    modalClose.addEventListener('click', () =>{
        modal.close();
    })
    


}

const nonProfitMembership = document.getElementById('non-profit-button');
nonProfitMembership.addEventListener('click', () => {
    displayModal(membershipList[0]);
})
const bronzeMembership = document.getElementById('bronze-button');
bronzeMembership.addEventListener('click', () => {
    displayModal(membershipList[1]);
});

const silverMembership = document.getElementById('silver-button');
silverMembership.addEventListener('click', () => {
    displayModal(membershipList[2]);
});

const goldMembership = document.getElementById('gold-button');
goldMembership.addEventListener('click', () => {
    displayModal(membershipList[3]);
});
