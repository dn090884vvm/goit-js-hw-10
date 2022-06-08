import './css/styles.css';
import './fetchCountries';
import { searchForCountry } from './fetchCountries';

import Notiflix from 'notiflix';

refs = {
  inputField: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');

refs.inputField.addEventListener(
  'input',
  debounce(onInputEnter, DEBOUNCE_DELAY)
);

function onInputEnter() {
  if (refs.inputField.value === '') {
    clearCountries();
    return;
  }

  //   clearCountries();

  searchForCountry(refs.inputField.value.trim())
    .then(checkingValue)
    .catch(errorInSearch);
}

function errorInSearch() {
  clearCountries();
  Notiflix.Notify.failure('Oops, there is no country with that name.');
}

function checkingValue(country) {
  //   console.log(country);
  clearCountries();
  if (country.length > 10) {
    Notiflix.Notify.info('Too much coincedences');
  } else if (country.length === 1) {
    return makeCountryInfo(country);
  } else if (country.length >= 2 && country.length <= 10) {
    return makeCountryList(country);
  }
}

function makeCountryList(countries) {
  const cardMarkup = countries
    .map(({ flags, name }) => {
      return `<li class="country-list__element"><img src="${flags.png}" width ="30" height= "20"/><p class ="country-list__text">${name.official}</p></li>`;
    })
    .join('');

  refs.countryList.insertAdjacentHTML('beforeend', cardMarkup);
}

function makeCountryInfo(countries) {
  const cardMarkup = countries
    .map(({ name, capital, population, flags, languages }) => {
      return `<div class ="country-expanded-info"><img class ="country-flag" src="${
        flags.png
      }" width ="70" height= "50"/>
      <h2>${name.official}</h2>
      </div>
      <div>
      
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages).join(', ')}</p>
      </div>`;
    })
    .join('');

  refs.countryInfo.insertAdjacentHTML('beforeend', cardMarkup);
}

function clearCountries() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

// galleryContainer.insertAdjacentElement('beforeend', imagesMarkup);

//  return country
//    .map(({ capital, population }) => {
//      return `<li>${capital}</li><li>${population}</li>`;
//    })
//    .join('');
//--------------------------
