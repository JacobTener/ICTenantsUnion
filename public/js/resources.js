const fairHousing = document.getElementById('fair-housing');
const securityDeposit = document.getElementById('security-deposit');
const covid = document.getElementById('covid19');
const moveIn = document.getElementById('move-in');
const fairHousingCard = document.querySelector('.fair-housing-card');
const securityDepositCard = document.querySelector('.security-deposit-card');
const covidCard = document.querySelector('.covid19-card');
const moveInCard = document.querySelector('.move-in-card');

fairHousing.addEventListener('click', (e) => {
    if(fairHousingCard.classList.contains("active-card-lg")){
        fairHousingCard.classList.remove("active-card-lg");
    }
    else {
        fairHousingCard.classList.add("active-card-lg");
    }
})

securityDeposit.addEventListener('click', (e) => {
    if(securityDepositCard.classList.contains("active-card-lg")){
        securityDepositCard.classList.remove("active-card-lg");
    }
    else {
        securityDepositCard.classList.add("active-card-lg");
    }
})

covid.addEventListener('click', (e) => {
    if(covidCard.classList.contains("active-card-sm")){
        covidCard.classList.remove("active-card-sm");
    }
    else {
        covidCard.classList.add("active-card-sm");
    }
})

moveIn.addEventListener('click', (e) => {
    if(moveInCard.classList.contains("active-card-md")){
        moveInCard.classList.remove("active-card-md");
    }
    else {
        moveInCard.classList.add("active-card-md");
    }
})
