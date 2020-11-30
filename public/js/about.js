// Client side JS to transition between active tabs on the "About Us" page based on the header clicked


const history = document.getElementById('history');
const present = document.getElementById('present');
const purpose = document.getElementById('purpose');
const historyCard = document.getElementById('history-card');
const presentCard = document.getElementById('present-card');
const purposeCard = document.getElementById('purpose-card');

history.addEventListener('click', (e) => {
    if(historyCard.classList.contains("active-card")){}
    else {
        history.classList.add("active");
        historyCard.classList.add("active-card");
        if(presentCard.classList.contains("active-card")){
            present.classList.remove("active");
            presentCard.classList.remove("active-card");
        }
        else if(purposeCard.classList.contains("active-card")){
            purpose.classList.remove("active");
            purposeCard.classList.remove("active-card");
        }
    }
})

present.addEventListener('click', (e) => {
    if(presentCard.classList.contains("active-card")){}
    else {
        present.classList.add("active");
        presentCard.classList.add("active-card");
        if(historyCard.classList.contains("active-card")){
            history.classList.remove("active");
            historyCard.classList.remove("active-card");
        }
        else if(purposeCard.classList.contains("active-card")){
            purpose.classList.remove("active");
            purposeCard.classList.remove("active-card");
        }
    }
})
purpose.addEventListener('click', (e) => {
    if(purposeCard.classList.contains("active-card")){}
    else {
        purpose.classList.add("active");
        purposeCard.classList.add("active-card");
        if(historyCard.classList.contains("active-card")){
            history.classList.remove("active");
            historyCard.classList.remove("active-card");
        }
        else if(presentCard.classList.contains("active-card")){
            present.classList.remove("active");
            presentCard.classList.remove("active-card");
        }
    }
})
