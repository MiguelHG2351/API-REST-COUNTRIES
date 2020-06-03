import './css/index.css';
// import icono from './images/favicon-32x32.png'
import { createStore } from 'redux'

const initialState = {
    countryList: []
}

function reducer(state, action) {
    return state
}


const store = createStore(reducer, initialState);
console.log(store.getState);

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
    const search = `${country}`
    // const BASE_URL = await `https://restcountries.eu/rest/v2/
    const response = await fetch(`https://restcountries.eu/rest/v2/${category}/${search}`);
    const data = await response.json()
    return data;
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
            // console.log(name);
            // console.log(region);
            // console.log(capital);
            const HTMLString = renderTemplate(name, population, region, capital, flag);
            const html = createTemplate(HTMLString)
            // console.log(html)
            container.append(html)
    }
}


$form.addEventListener('submit', async e => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    if(click.name === 'all') {
        click.type = 'all'
        click.name = ''
    }
    formData.append('location', `${click.name}`);
    const data = await getData(click.type, formData.get('location'));
    renderListFlags(data)
})

// getData()