const fairHousing = document.getElementById('fair-housing');
const securityDeposit = document.getElementById('security-deposit');
const covid = document.getElementById('covid');
const moveIn = document.getElementById('move-in');
const fairHousingCard = document.querySelector('.fair-housing-card');
const securityDepositCard = document.querySelector('.security-deposit-card');
const covidCard = document.querySelector('.covid-card');
const moveInCard = document.querySelector('.move-in-card');

fairHousing.addEventListener('click', (e) => {
    if(fairHousingCard.classList.contains("active")){
        fairHousingCard.classList.remove("active");
    }
    else {
        fairHousingCard.classList.add("active");
    }
})

securityDeposit.addEventListener('click', (e) => {
    if(securityDepositCard.classList.contains("active")){
        securityDepositCard.classList.remove("active");
    }
    else {
        securityDepositCard.classList.add("active");
    }
})

covid.addEventListener('click', (e) => {
    if(covidCard.classList.contains("active")){
        covidCard.classList.remove("active");
    }
    else {
        covidCard.classList.add("active");
    }
})

moveIn.addEventListener('click', (e) => {
    if(moveInCard.classList.contains("active")){
        moveInCard.classList.remove("active");
    }
    else {
        moveInCard.classList.add("active");
    }
})
