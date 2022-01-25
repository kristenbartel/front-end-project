import keys from '/scripts/API.js';

// ---------DOM declarations----------------
let userInput = document.getElementById('userInput');
let searchButton = document.getElementById('searchButton');
let searchResults = document.getElementById('searchResults');
let spinnerContainer = document.getElementById('spinner-container');
let mapsContainer = document.getElementById('maps-container');

// attempts getting API out og html
// below: used in import/export file.js
// import API from "./API";
// export default `https://maps.googleapis.com/maps/api/js?key=${API.keys.mapsKey}&libraries=places`;


// fetch (`https://maps.googleapis.com/maps/api/js?key=${keys.keys.mapsKey}&libraries=places`, { mode: 'no-cors'})
// .then (response => response.json())
// .then (initialize())
function initialize() {
  var options = {
    types: ['(cities)'],
    componentRestrictions: {
      country: "us"
    }
  };

  var input = document.getElementById('userInput');
  var autocomplete = new google.maps.places.Autocomplete(input, options);
}
google.maps.event.addDomListener(window, 'load', initialize);
initialize();


// event listeners for button click
  searchButton.addEventListener('click', (e) =>{
    e.preventDefault();
      runSearch();
})

// userInput.addEventListener('keydown', (e) => {
//     e.preventDefault();
//     if (e.altKey === 13) {
//         runSearch();
//     }
// })


// program

function runSearch () {
    spinnerContainer.style.display = "block"

    let inputText = userInput.value
    fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=${inputText}&key=${keys.keys.mapsKey}`)
    .then(response => response.json())
    .then(latData => {
        let lat = latData.results[0].geometry.location.lat;
        let lng = latData.results[0].geometry.location.lng;
        return fetch(`https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=${lat}&lon=${lng}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
                "x-rapidapi-key": `${keys.keys.trailsKey}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.data);
            let html = data.data.map(trailData => {
                while (searchResults.firstChild) {
                    searchResults.removeChild(searchResults.firstChild);
                };
                if (trailData.thumbnail === null) {
                    trailData.thumbnail = "image-assets/car-2.jpg";
                };
                if (trailData.rating === 0) {
                    trailData.rating = 'no rating';
                }
                if (trailData.difficulty === '') {
                    trailData.difficulty = 'unknown';
                };
                if (trailData.length === '0.0') {
                    trailData.length = 'unknown'
                }
                return `<div class="card" id="searchResults">
                <img src="${trailData.thumbnail}" class="card-img-top" alt="trail image">
                <div class="card-body">
                  <h5 class="card-title">${trailData.name}</h5>
                  <p>City: ${trailData.city}</p>
                  <p class="difficulty">Difficulty: ${trailData.difficulty}</p>
                  <p class="length">Length: ${trailData.length} miles</p>
                  <p id="rateMe2"  class="empty-stars">Rating: ${trailData.rating}</p>
                  <a href="${trailData.url}" target="_blank" rel="noopener noreferrer" id="details-button" class="details-button btn btn-info mt-1">Detail</a>
                  <button id="mapsButton" class="maps-button btn btn-info mt-1" value="${trailData.lat},${trailData.lon}">Map</button>
                </div>
              </div>`
            }).join('');
            document.querySelector('#searchResults').insertAdjacentHTML('afterbegin', html);
            userInput.value = '';
            spinnerContainer.style.display = "none"
            location.href = '#searchResults'

            let mapsButton = document.querySelectorAll('#mapsButton');
            console.log(mapsButton, 60);

            mapsButton.forEach(mapsButton => {
                mapsButton.addEventListener('click', (e) => {
                    console.log(mapsButton.value);
                    mapsContainer = document.querySelector('#map-container')
                    mapsContainer.innerHTML = ''
                    let iframe = `
                    <iframe style="border:0"
                    loading="lazy"
                                allowfullscreen
                                src='https://www.google.com/maps/embed/v1/view?key=${keys.keys.mapsKey}&center=${mapsButton.value}
                                &zoom=18
                                &maptype=satellite'>
                                </iframe>`
                                console.log(iframe, 75);
                                mapsContainer.innerHTML = iframe;
                                location.href = '#map-container';
            })
            })
        })
    })
}
