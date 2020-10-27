const input = document.getElementById('country');
const button = document.getElementById('submit');
const sel = document.getElementById('regions')
let region = $( "#regions option:selected" ).value;

function fetchUserData(url){
      
  fetch(url)
      .then(response => response.json())
      .then(countries => {
        
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
                  <p class="card-text lead font-weight-light"> Language: <strong>${country.languages[0].name}</strong></p>
                  <p class="card-text font-weight-bold"> ${numFormatter(country.population)} Population </p>
                </div>
              </div>
              </div>
              </div>
          `;
          
          }

          output += '</div></center>'
          document.getElementById("response").innerHTML = output;
      });
}

const getInputValue = () => {
  return document.getElementById("country").value;
}

const findCountry= () => {
  let countryName = getInputValue()
  if (countryName == ''){
    fetchUserData('https://restcountries.eu/rest/v2/all')
  } else {
    fetchUserData(`https://restcountries.eu/rest/v2/name/${countryName}?fullText=true`)
  }
  
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

function getSelectedOption(sel) {
  var opt;
  for ( var i = 0, len = sel.options.length; i < len; i++ ) {
      opt = sel.options[i];
      if ( opt.selected === true ) {
          break;
      }
  }
  console.log(opt)
  return opt;
}


const findByRegion = (region) => {
  switch (region) {
    case 'africa':
      fetchUserData('https://restcountries.eu/rest/v2/region/africa');
      break;
    case 'america':
      fetchUserData('https://restcountries.eu/rest/v2/region/americas');
      break;
    case 'asia':
      fetchUserData('https://restcountries.eu/rest/v2/region/asia');
      break;
    case 'europe':
      fetchUserData('https://restcountries.eu/rest/v2/region/europe');
      break;
    case 'oceania':
      fetchUserData('https://restcountries.eu/rest/v2/region/oceania');
      break;
  }
}







$(document).ready(fetchUserData('https://restcountries.eu/rest/v2/all'))


$('#regions').change( function() {
  if ($(this).val()) {
    findByRegion($(this).val())
  }
});

$('#switch').on('click', () => {
  if(document.body.classList.contains('light')){
    $('body').css('background-color', 'black');
    $('h1').css('color','white')
    $("body").removeClass("light")
    $('body').addClass('dark')
  } else if (document.body.classList.contains('dark')){
    $('body').css('background-color', 'white');
    $('h1').css('color','black')
    $('card-body').css('background','dark')
    $("body").removeClass("dark")
    $('body').addClass('light')
  } 
  
})

$('#submit').on('click', () => {
  inputValue = getInputValue()
  findCountry()
})











    
    
    
    
