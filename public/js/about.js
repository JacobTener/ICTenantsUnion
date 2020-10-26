const history = document.getElementById('history');
const present = document.getElementById('present');
const purpose = document.getElementById('purpose');
const historyCard = document.getElementById('history-card');
const presentCard = document.getElementById('present-card');
const purposeCard = document.getElementById('purpose-card');

history.addEventListener('click', (e) => {
    if(historyCard.classList.contains("active")){}
    else {
        historyCard.classList.add("active");
        if(presentCard.classList.contains("active")){
            presentCard.classList.remove("active");
        }
        else if(purposeCard.classList.contains("active")){
            purposeCard.classList.remove("active");
        }
    }
})

present.addEventListener('click', (e) => {
    if(presentCard.classList.contains("active")){}
    else {
        presentCard.classList.add("active");
        if(historyCard.classList.contains("active")){
            historyCard.classList.remove("active");
        }
        else if(purposeCard.classList.contains("active")){
            purposeCard.classList.remove("active");
        }
    }
})
purpose.addEventListener('click', (e) => {
    if(purposeCard.classList.contains("active")){}
    else {
        purposeCard.classList.add("active");
        if(historyCard.classList.contains("active")){
            historyCard.classList.remove("active");
        }
        else if(presentCard.classList.contains("active")){
            presentCard.classList.remove("active");
        }
    }
})
