import './css/styles.css';
import { getCountry } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const input = event.target.value.trim();
  clearList();
  if (!input) {
    return;
  }

  getCountry(input)
    .then(countries => {
      const dataLength = countries.length;
      if (dataLength > 10) {
        return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (dataLength >= 2 && dataLength < 10) {
        renderCountryList(countries);
      } else {
        console.log(countries);
        renderCountryInfo(countries);
      }
    })

    .catch(error => Notify.failure('Oops, there is no country with that name'));
  //
}

function renderCountryList(countries) {
  console.log(countries);
  const markup = countries
    .map(country => {
      return `<li>
          <p class = "text country"><img src="${country.flags.svg}" width = "50"> ${country.name.common}</p>       
        </li>`;
    })
    .join('');
  countryListRef.innerHTML = markup;
}

function renderCountryInfo(countries) {
  const markup = countries
    .map(country => {
      return `<li>
          <p class = "text country"><img src="${country.flags.svg}" width = "50"> ${country.name.common}</p> 
          <p class = "text"><b>Capital</b>: ${country.capital[0]}</p>
          <p class = "text"><b>Population</b>: ${country.population}</p>
          <p class = "text"><b>Languages</b>: ${country.languages.ukr}</p>    
        </li>`;
    })
    .join('');
  countryInfoRef.innerHTML = markup;
}
// aaa
function clearList() {
  countryInfoRef.innerHTML = '';
  countryListRef.innerHTML = '';
}
