const input = document.querySelector('.search__input');
const countriesList = document.querySelector('.countries-list');
const filter = document.querySelector('.filter');
const filterValue = document.querySelector('.filter__custom-options ');

const getCountries = link => {
  return fetch(link)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.log(error);
      alert(error);
    });
};

const getCountriesByName = () => {
  const countryName = input.value;
  let region = filter.value;
  let link = '';

  if (countryName == '' && region == 'none') {
    link =
      'https://restcountries.com/v3.1/all?fields=flags,name,population,capital,region';
    getCountries(link).then(data => {
      showCountriesList(data);
    });
  } else if (countryName !== '' && region == 'none') {
    link = `https://restcountries.com/v3.1/name/${countryName}?fields=flags,name,population,capital,region`;
    getCountries(link).then(data => {
      showCountriesList(data);
    });
  } else if (countryName == '' && region !== 'none') {
    link = `https://restcountries.com/v3.1/region/${region}`;
    getCountries(link).then(data => {
      showCountriesList(data);
    });
  } else {
    link = `https://restcountries.com/v3.1/name/${countryName}?fields=flags,name,population,capital,region`;
    getCountries(link).then(data => {
      const filter = data.filter(country => country.region == region);
      showCountriesList(filter);
    });
  }
};

const showCountriesList = data => {
  countriesList.innerHTML = data
    .map(
      country =>
        `<li class="country">
         <a href="./country.html?${country.name.common}" class="country__link">
          <div class="country__flag" style="background: url(${
            country.flags.svg
          }), lightgray 0px 0px / 100% 100% no-repeat; background-size: cover; background-position: center">
         </div>
         <h2 class="country__name">${country.name.common} </h2>
          <p class="country__info">
           Population: <span class="country__data">${Intl.NumberFormat(
             'en-US'
           ).format(country.population)}</span>
          </p>
          <p class="country__info">
            Region: <span class="country__data">${country.region}</span>
          </p>
          <p class="country__info">
            Capital: <span class="country__data">${country.capital}</span>
          </p>
          </a>
        </li>`
    )
    .join('');
};

getCountriesByName();

filter.addEventListener('change', getCountriesByName);
input.addEventListener('keyup', getCountriesByName);
filterValue.addEventListener('click', getCountriesByName);
