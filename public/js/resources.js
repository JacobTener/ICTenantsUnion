const fairHousing = document.getElementById('fair-housing');
const securityDeposit = document.getElementById('security-deposit');
const covid = document.getElementById('covid19');
const moveIn = document.getElementById('move-in');
const fairHousingCard = document.querySelector('.fair-housing-card');
const securityDepositCard = document.querySelector('.security-deposit-card');
const covidCard = document.querySelector('.covid19-card');
const moveInCard = document.querySelector('.move-in-card');

fairHousing.addEventListener('click', (e) => {
    if(fairHousingCard.classList.contains("active-card")){
        fairHousingCard.classList.remove("active-card");
    }
    else {
        fairHousingCard.classList.add("active-card");
    }
})

securityDeposit.addEventListener('click', (e) => {
    if(securityDepositCard.classList.contains("active-card")){
        securityDepositCard.classList.remove("active-card");
    }
    else {
        securityDepositCard.classList.add("active-card");
    }
})

covid.addEventListener('click', (e) => {
    if(covidCard.classList.contains("active-card")){
        covidCard.classList.remove("active-card");
    }
    else {
        covidCard.classList.add("active-card");
    }
})

moveIn.addEventListener('click', (e) => {
    if(moveInCard.classList.contains("active-card")){
        moveInCard.classList.remove("active-card");
    }
    else {
        moveInCard.classList.add("active-card");
    }
})
