// Client side JS to watch for verify click

const verifyTag = document.querySelectorAll('.verify-tag');


verifyTag.forEach(v => {
    v.addEventListener('click', (e) => {
        v.parentElement.submit();
    })
})


