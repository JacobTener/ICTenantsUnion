const tempDivs = document.querySelectorAll('.temp');


window.onload = function(){
    setTimeout( function(){
        hideDivs(tempDivs)
    }, 3800);
}

function hideDivs(tempDivs) {
    tempDivs.forEach(tD => {
        tD.style.display = 'none';
    });
}