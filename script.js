const input = document.getElementById('country');
const button = document.getElementById('submit');
const sel = document.getElementById('regions')
let region = $( "#regions option:selected" ).value;

async function fetchCountriesJSON(url='https://restcountries.eu/rest/v2/all') {
  const response = await fetch(url);
  const countries = await response.json();
  return countries;
}

function PaintCountries(countries) {
  let output = '';
  output += '<center><div class="container-fluid">';
  for(let i = 0; i < countries.length; i++){
    let country = countries[i]
      output += `
      <div class="row">
      <div class="col-sm-12">
      <div class="card">
      <img class="card-img" src="${country.flag}">
        <div class="card-body">
          <h3 class="card-title"><strong>${country.name}</strong></h3>
          <p class="card-text lead font-weight-light"> Capital: <i>${country.capital}</i></p>
          <p class="card-text lead font-weight-light"> Region: <i>${country.region}</i></p>
          <p class="card-text lead font-weight-light"> Language: <strong>${country.languages[0].name }</strong></p>
          <p class="card-text font-weight-bold"> ${numFormatter(country.population)} Population </p>
        </div>
      </div>
      </div>
      </div>
  `;
  
  }

  output += '</div></center>'
  document.getElementById("response").innerHTML = output;
}

function numFormatter(num) {
  if(num > 999 && num < 1000000){
      return (num/1000).toFixed(0) + ' Mil'; // convert to K for number from > 1000 < 1 million 
  }else if(num > 1000000){
      return (num/1000000).toFixed(0) + ' Millions'; // convert to M for number from > 1 million 
  }else if(num < 900){
      return num; // if value < 1000, nothing to do
  }
}

function findByInput() {
  let name = $(input).val();
  let url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
  console.log(name)
  fetchCountriesJSON(url).then(countries => {
    PaintCountries(countries)
  });
};

function debounce( callback, delay ) {
  let timeout;
  return function() {
      clearTimeout( timeout );
      timeout = setTimeout( callback, delay );
  }
}



input.addEventListener(
  "keyup",
  debounce( findByInput, 1000 )
);


$(sel).change( function() {
  if ($(this).val()) {
    findByRegion($(this).val())
  } 
});

const findByRegion = (region) => {
  switch (region) {
    case 'africa':
      fetchCountriesJSON('https://restcountries.eu/rest/v2/region/africa').then(countries => {
        PaintCountries(countries)
      });
      break;
    case 'america':
  
      fetchCountriesJSON('https://restcountries.eu/rest/v2/region/americas').then(countries => {
        PaintCountries(countries)
      });
      break;

    case 'asia':
      fetchCountriesJSON('https://restcountries.eu/rest/v2/region/asia').then(countries => {
        PaintCountries(countries)
      });
      break;

    case 'europe':
    
      fetchCountriesJSON('https://restcountries.eu/rest/v2/region/europe').then(countries => {
        PaintCountries(countries)
      });
      break;
    case 'oceania':
  
      fetchCountriesJSON('https://restcountries.eu/rest/v2/region/oceania').then(countries => {
        PaintCountries(countries)
      });
      break;
      
      case 'all':
        fetchCountriesJSON('https://restcountries.eu/rest/v2/all').then(countries => {
        PaintCountries(countries)
      });
  }
}
