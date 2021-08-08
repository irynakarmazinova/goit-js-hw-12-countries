var debounce = require('lodash.debounce');

import countryCardTpl from '../templates/country-card.hbs';

const formRef = document.getElementById('form');
const inputRef = document.getElementById('input');
const cardContainerRef = document.getElementById('js-card-container');

function onInput(e) {
  e.preventDefault();

  //   const form = e.currentTarget;
  //   const searchQuery = form.elements.query.value;

  const form = e.target.valuet;

  fetchCountryName(form)
    //   fetchCountryName(searchQuery)
    .then(renderCountryCard)
    .catch(err => console.log(err));
}
inputRef.addEventListener('input', debounce(onInput, 500));

// функция возвращает результат фетча( - промис) с распарсенными данными
function fetchCountryName(name) {
  return fetch(`https://restcountries.eu/rest/v2/name/${name}`).then(response => {
    return response.json();
  });
}

function renderCountryCard(country) {
  const markup = countryCardTpl(country);
  console.log(markup);

  cardContainerRef.innerHTML = markup;
}
