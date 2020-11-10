const delTag = document.querySelectorAll('.del-tag');
const verifyTag = document.querySelectorAll('.verify-tag');


delTag.forEach(t => {
    t.addEventListener('click', (e) => {
        t.parentElement.submit();
    })
})

verifyTag.forEach(v => {
    v.addEventListener('click', (e) => {
        v.parentElement.submit();
    })
})


