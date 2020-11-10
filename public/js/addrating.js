const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const tempDivs = document.querySelectorAll('.temp');


if (urlParams.has('name')){
    const landlordInput = document.getElementById('landlord');
    landlordInput.value = urlParams.get('name')
}

window.onload = function(){
    setTimeout( function(){
        dumbFunc(tempDivs)
    }, 3800);
}

function dumbFunc(tempDivs) {
    tempDivs.forEach(tD => {
        tD.style.display = 'none';
    });
}