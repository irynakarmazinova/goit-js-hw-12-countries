// handlebars
import countryCardTpl from '../templates/country-card.hbs';
import countryCardNameTpl from '../templates/country-card-name.hbs';

// lodash
var debounce = require('lodash.debounce');

// pnotify
import { defaultModules, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

import '@pnotify/core/dist/BrightTheme.css'; //color theme for error

defaultModules.set(PNotifyMobile, {});

// refs
const inputRef = document.getElementById('input');
const cardContainerRef = document.getElementById('js-card-container');

async function onInput(e) {
  e.preventDefault();
  const form = e.target.value;

  try {
    if (form !== '') {
      const names = await fetchCountryName(form);
      const renderMarcup = await renderManipulation(names);
    }
  } catch (error) {
    console.error(error);
  }
}
inputRef.addEventListener('input', debounce(onInput, 500));

// функция возвращает результат фетча( - прOмис) с распарсенными данными
async function fetchCountryName(name) {
  const response = await fetch(`https://restcountries.eu/rest/v2/name/${name}`);
  const names = response.json();
  // return await response.json();
  return names;
}

// render card with all info
async function renderCountryCard(country) {
  const markup = countryCardTpl(country);
  cardContainerRef.innerHTML = markup;
}

// render only name country
async function renderCountryCardName(country) {
  const markup = countryCardNameTpl(country);
  cardContainerRef.innerHTML = markup;
}

// what markup to render
async function renderManipulation(data) {
  if (data.length > 10) {
    error({
      title: `Too many matches found.`,
      text: `We found ${data.length} countries. Please enter a more specific query!`,
      delay: 2000,
    });
  } else if (data.length > 2 && data.length < 10) {
    renderCountryCardName(data);
  } else if (data.length === 1) {
    renderCountryCard(data);
  } else {
    error({
      title: `We didn’t find such a country.`,
      text: `Please check the correctness of the data entered and try again.`,
      delay: 2000,
    });
  }
}
