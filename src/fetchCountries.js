export function searchForCountry(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  });
}

// ===============

//   let inputData = '';
//   inputData = event.target.value;

//   ==========
//     .then(country => {
//       if (country.length > 10) {
//         console.log('dddddddd');
//         return;
//       }
//       console.log(country.length);
//       country.forEach(element => {
//         console.log(
//           element.name.official,
//           element.capital,
//           element.population,
//           element.flags.svg,
//           element.languages
//         );
//       });
//     });

//   console.log(inputData);

// console.log(fetch(`https://restcountries.com/v3.1/name/${inputData}`));
