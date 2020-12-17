// Client side js to propogate landlord info in case of validation error

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);


if (urlParams.has('name')){
    const landlordInput = document.getElementById('landlord');
    landlordInput.value = urlParams.get('name')
}

