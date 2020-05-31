import './css/index.css';
// const BASE_URL = 'https://restcountries.eu/rest/v2/all';
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
        select.classList.remove('active')
        overlay.classList.remove('active')
    })
}

function renderTemplate(name, population, region, capital, image) {
    return `
    <div class="card">
            <div class="card-image">
                <img class="responsive-img" src="${image}" alt="Imagen">
            </div>
            <div class="card-title">
                <h2>${name}</h2>
            </div>
            <div class="card-description">
                // <strong>Population: <p>${population}</p></strong>
                <strong>Region: <p>${region}</p></strong>
                <strong>Capital: <p>${capital}</p></strong>
            </div>
        </div>
    `
}

$form.addEventListener('submit', e => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    formData.append('location', click);
    console.log(formData.get('location'))
    fetch('/country', {
        method: 'POST',
        body: formData,
    })
})

// getData()