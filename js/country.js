const countryInfo = document.querySelector('.country-info');
const borders = document.createElement('ul');
borders.className = 'country-info__borders-list';

const getCountry = () => {
  const queryString = window.location.search;
  let name = queryString.slice(1, queryString.length);
  const link = `https://restcountries.com/v3.1/name/${name}`;

  fetch(link)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      const currencies = [];
      for (const currencie of Object.values(data[0].currencies)) {
        currencies.push(currencie.name);
      }

      if (data[0].borders !== undefined) {
        for (const border of data[0].borders) {
          borders.innerHTML += `<li><a href="./country.html?${border}" target="_blank">
        <button class="country-info__border-button">${border}</button></a></li>`;
        }
      }

      countryInfo.innerHTML = `<div class="country-info__flag" style="background: url(${
        data[0].flags.svg
      }); background-size: cover; background-position: center">
           </div>
           <div class="country-info__content">
              <h1 class="country-info__headline-name">${
                data[0].name.common
              }</h1>
              <div class="country-info__content-text">
                <div class="country-info__box-one">
                  <p class="country-info__text-bold">Native Name: 
                  <span class="country-info__text">${
                    Object.values(data[0].name.nativeName)[0].official
                  }
                  </span></p>
                  <p class="country-info__text-bold">Population:
                  <span class="country-info__text">${Intl.NumberFormat(
                    'en-US'
                  ).format(data[0].population)}
                  </span></p>
                  <p class="country-info__text-bold">Region:
                  <span class="country-info__text">${data[0].region}
                  </span></p>
                  <p class="country-info__text-bold">Sub Region:
                  <span class="country-info__text">${data[0].subregion}
                  </span></p>
                  <p class="country-info__text-bold">Capital:
                  <span class="country-info__text">${data[0].capital}
                  </span></p>
                </div>
                <div class="country-info__box-two">
                <p class="country-info__text-bold">Top Level Domain: 
                  <span class="country-info__text">${data[0].tld[0]}
                  </span></p>
                  <p class="country-info__text-bold">Currencies:
                  <span class="country-info__text">${currencies.join(' ')}
                  </span></p>
                  <p class="country-info__text-bold">Languages:
                  <span class="country-info__text">${Object.values(
                    data[0].languages
                  ).join(', ')}
                    </span></p>
                    </div>
                    </div>
              <div class="country-info__borders-box">
                <h2 class="country-info__headline-borders">Border Countries:</h2>
              </div>
          </div>`;
      const bordersBox = document.querySelector('.country-info__borders-box');
      bordersBox.appendChild(borders);
    })
    .catch(error => {
      console.log(error);
      alert(error);
    });
};

getCountry();
