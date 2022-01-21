import keys from '/scripts/API.js';



// --------keys and fetches-----------------------------


let logMapData = (mapData) => {
    console.log(mapData);
    return mapData;
}
// ---------------fetch---------------- *Eugene* 1.19.21 Commented test fetch to ensure event listener was working

// function getMapData() {
//     console.log(keys.keys.mapsKey)
//     const latLng = fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=houston&key=${keys.keys.mapsKey}`)
//     .then(response => response.json())
//     .then(latData => {
//         console.log(latData);
//         let lat = latData.results[0].geometry.location.lat;
//         let lng = latData.results[0].geometry.location.lng;
//         console.log(lat);
//         console.log(lng);
//         return fetch(`https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=${lat}&lon=${lng}`, {
//             "method": "GET",
//             "headers": {
//                 "x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
//                 "x-rapidapi-key": `${keys.keys.trailsKey}`
//             }
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data)
//         })
//     })
// }
// getMapData();

// ---------DOM declarations and bindings----------------

const header = document.getElementById('header');
let userInput = document.getElementById('userInput');
// let inputText = userInput.value
let searchButton = document.getElementById('searchButton');
let searchResults = document.getElementById('searchResults');
let footer = document.getElementById('footer');



// Event listener for 'searchButton'

searchButton.addEventListener('click', (e) =>{
    e.preventDefault();
    let inputText = userInput.value
    fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=${inputText}&key=${keys.keys.mapsKey}`)
    .then(response => response.json())
    .then(latData => {
        // console.log(latData);
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
            let html = data.data.map(array =>{
                return `<div class="card">
                <img src="${array.thumbnail}" class="card-img-top" alt="trail image">
                <div class="card-body">
                  <h5 class="card-title">${array.name}</h5>
                  <p>City: ${array.city}</p>
                  <p class="difficulty">Difficulty: ${array.difficulty}</p>
                  <p class="length">Length: ${array.length} Miles</p>
                  <p class="rating">Rating: ${array.rating}</p>
                  <a href="${array.url}" class="btn btn-primary">Trail Details</a>
                </div>
              </div>`
            }).join('');
            document.querySelector('#searchResults').insertAdjacentHTML('afterbegin', html);
            userInput.value = '';
        })
    })
})



