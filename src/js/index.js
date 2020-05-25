const BASE_URL = fetch('https://restcountries.eu/rest/v2/all');
const form = document.getElementById('form');
const btn = document.getElementById('btn-country');
const select = document.getElementById('select');
const filter = document.getElementById('filter');
const option = select.children
const overlay = document.getElementById('overlay');

btn.addEventListener('click', () => {
    select.classList.toggle('active');
    overlay.classList.toggle('active');
})

console.log(select.children[2].dataset.id)

overlay.addEventListener('click', () => {
    overlay.classList.remove('active');
    select.classList.remove('active');
})

for (let i = 0; i < option.length; i++) {
    option[i].addEventListener('click', () => {
        filter.textContent = option[i].dataset.id
    })
}

form.addEventListener('submit', e => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    alert(formData.get('country'));
})
