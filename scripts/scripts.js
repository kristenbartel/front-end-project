import keys from '/scripts/API.js';

// ---------DOM declarations----------------
let userInput = document.getElementById('userInput');
let searchButton = document.getElementById('searchButton');
let searchResults = document.getElementById('searchResults');
let spinnerContainer = document.getElementById('spinner-container');
// let mapsContainer = document.getElementById('maps-container');

// Event listener for 'searchButton'

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
                  <button id="mapsButton" value="${trailData.lat},${trailData.lon}">maps</button>
                </div>
              </div>`
            }).join();
            document.querySelector('#searchResults').insertAdjacentHTML('afterbegin', html);
            userInput.value = '';
            spinnerContainer.style.display = "none"
            location.href = '#searchResults'


            let mapsButton = document.getElementById('mapsButton');
            console.log(mapsButton, 60);
            mapsButton.addEventListener('click', (e) => {
                console.log(mapsButton.value);
                let iframe = `
                <iframe style="border:0"
                loading="lazy"
                            allowfullscreen
                            src='https://www.google.com/maps/embed/v1/view?key=${keys.keys.mapsKey}&center=${mapsButton.value}
                            &zoom=18
                            &maptype=satellite'>
                            </iframe>`

                            console.log(iframe, 75)
                return iframe
            })
            document.querySelector('#maps-container').insertAdjacentHTML('afterbegin', iframe);
        })
        
    })
    
})


// mapsButton.addEventListener('click', (e) => {
//     
// } )
// run a fetch based on the mapsButton value
// 
// 
// }