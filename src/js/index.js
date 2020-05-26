const BASE_URL = 'https://restcountries.eu/rest/v2/';
const $form = document.getElementById('form');
const btn = document.getElementById('btn-country');
const select = document.getElementById('select');
const filter = document.getElementById('filter');
const option = select.children
const overlay = document.getElementById('overlay');

btn.addEventListener('click', () => {
    select.classList.toggle('active');
    overlay.classList.toggle('active');
})

overlay.addEventListener('click', () => {
    overlay.classList.remove('active');
    select.classList.remove('active');
})

let click;

for (let i = 0; i < option.length; i++) {
    option[i].addEventListener('click', () => {
        filter.textContent = option[i].dataset.id;
        click = option[i].dataset.id
    })
}

$form.addEventListener('submit', e => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    fetch('/country', {
        method: 'POST',
        body: {formData, click}, 
    })
})

// getData()