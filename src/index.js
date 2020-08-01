"use strict"

import './css/index.css';
// import icono from './images/favicon-32x32.png'

// https://restcountries.eu/rest/v2/name/{name}

// https://restcountries.eu/rest/v2/region/{region}

// const BASE_URL = 'https://restcountries.eu/rest/v2/all';
const $form = document.getElementById('form');
const btn = document.getElementById('btn-country');
const select = document.getElementById('select');
const filter = document.getElementById('filter');
// const iconBotton = document.getElementById('icon-expand')
const option = select.children
const overlay = document.getElementById('overlay');
const container = document.getElementById('container')
const input = document.getElementById('input')

btn.addEventListener('click', () => {
    select.classList.toggle('active');
    if(btn.children[1].textContent == 'expand_more') {
        btn.children[1].textContent = 'expand_less';
    } else {
        btn.children[1].textContent = 'expand_more'
    }
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
        click = {
            name: option[i].dataset.id,
            type: "region"
        }
        select.classList.remove('active')
        overlay.classList.remove('active')
    })
}

function renderTemplate(name, population, region, capital, image) {
    return `
    <div class="card">
            <div class="card-image">
                <img loading="lazy" class="responsive-img" src="${image}" alt="Imagen">
            </div>
            <div class="card-title">
                <h2>${name}</h2>
            </div>
            <div class="card-description">
                <strong>Population: <p>${population}</p></strong>
                <strong>Region: <p>${region}</p></strong>
                <strong>Capital: <p>${capital}</p></strong>
            </div>
        </div>
    `
}

async function getData(category, country) {
    console.log(country)
    if(country === 'all') {
        category = 'all'
        country = ''
    }
    const search = `${country}`
    // const BASE_URL = await `https://restcountries.eu/rest/v2/
        const response = await fetch(`https://restcountries.eu/rest/v2/${category}/${search}`);
        const data = await response.json()
        if (data.status == 404) {
            alert('no existe, no lo hay xd')
            const response = await fetch(`https://restcountries.eu/rest/v2/all`);
            const data = await response.json()
            return data
        } else {
            return data
        }
}

function createTemplate(htmlString) {
    const html = document.implementation.createHTMLDocument();
      html.body.innerHTML = htmlString;
      return html.body.children[0]
  }

function renderListFlags(data) {
    container.innerHTML = ''
    for (const key in data) {
            const {name, region, population, flag, capital} = data[key];
            const HTMLString = renderTemplate(name, population, region, capital, flag);
            const html = createTemplate(HTMLString)
            container.append(html)
    }
}


input.addEventListener('input', async (e) => {
    let data = await getData("name", e.currentTarget.value);
    renderListFlags(data)
})

$form.addEventListener('submit', async e => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    
    input.value = ''
    formData.append('location', `${click.name}`);
    console.log(formData.get('location').length)
    console.log(formData.get('country').length)
    if (formData.get('location').length > 0 && formData.get('country').length == 0) {
        const data = await getData(click.type, formData.get('location'));
        renderListFlags(data)
    } else {
        const data = await getData('name', formData.get('country'));
        renderListFlags(data)
    }
})

// getData()