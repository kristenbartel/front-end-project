import keys from '/scripts/API.js';

// ---------DOM declarations and bindings----------------

let header = document.getElementById('header');
let userInput = document.getElementById('userInput');
// let inputText = userInput.value
let searchButton = document.getElementById('searchButton');
let searchResults = document.getElementById('searchResults');
let footer = document.getElementById('footer');
let spinnerContainer = document.getElementById('spinner-container');


// Event listner for 'searchButton'

searchButton.addEventListener('click', (e) =>{
    e.preventDefault();
    
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
            // console.log(data.data);
            let html = data.data.map(trailData => {
                while (searchResults.firstChild) {
                    searchResults.removeChild(searchResults.firstChild);
                };
                if (trailData.thumbnail === null) {
                    trailData.thumbnail = "image-assets/car-2.jpg";
                };
                if (trailData.difficulty === '') {
                    trailData.difficulty = 'no data found';
                };
                return `<div class="card" id="searchResults">
                <img src="${trailData.thumbnail}" class="card-img-top" alt="trail image">
                <div class="card-body">
                  <h5 class="card-title">${trailData.name}</h5>
                  <p>City: ${trailData.city}</p>
                  <p class="difficulty">Difficulty: ${trailData.difficulty}</p>
                  <p class="length">Length: ${trailData.length} Miles</p>
                  <p class="rating">Rating: ${trailData.rating}</p>
                  <a href="${trailData.url}" class="btn btn-info">Details</a>
                </div>
              </div>`
            }).join();
            document.querySelector('#searchResults').insertAdjacentHTML('afterbegin', html);
            userInput.value = '';
            spinnerContainer.style.display = "none"
            location.href = '#searchResults'
        })
    })
})








