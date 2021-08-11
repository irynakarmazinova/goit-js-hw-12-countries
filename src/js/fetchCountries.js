var debounce = require('lodash.debounce');

import countryCardTpl from '../templates/country-card.hbs';

const inputRef = document.getElementById('input');
const cardContainerRef = document.getElementById('js-card-container');

function onInput(e) {
  e.preventDefault();

  const form = e.target.value;

  fetchCountryName(form)
    .then(renderCountryCard)
    .catch(err => console.error(err));
}
inputRef.addEventListener('input', debounce(onInput, 500));

// функция возвращает результат фетча( - промис) с распарсенными данными
function fetchCountryName(name) {
  return fetch(`https://restcountries.eu/rest/v2/name/${name}`).then(response => {
    return response.json();
  });
}

function renderCountryCard(country) {
  // if (массив с одной страной) {
  //     const markup = countryCardTpl(country);
  // cardContainerRef.innerHTML = markup;
  // }else if (от 2 - х до 10 - х стран) {
  //   список имен под инпутом
  // }else {
  //   плагин. как установить?
  // }

  const markup = countryCardTpl(country);
  console.log(markup);

  cardContainerRef.innerHTML = markup;
}
