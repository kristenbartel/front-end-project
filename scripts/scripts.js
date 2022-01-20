import keys from '/scripts/API.js';
// --------keys and fetches-----------------------------


let logMapData = (mapData) => {
    console.log(mapData);
    return mapData;
}
// ---------------fetch----------------
function getMapData() {
    console.log(keys.keys.mapsKey)
    const latLng = fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=houston&key=${keys.keys.mapsKey}`)
    .then(response => response.json())
    .then(latData => {
        console.log(latData);
        let lat = latData.results[0].geometry.location.lat;
        let lng = latData.results[0].geometry.location.lng;
        console.log(lat);
        console.log(lng);
        return fetch(`https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=${lat}&lon=${lng}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
                "x-rapidapi-key": `${keys.keys.trailsKey}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
    })
}
getMapData();

// ---------DOM declarations and bindings----------------

let header = document.getElementsById('header');
let userInput = document.getElementsById('userInput');
let searchButton = document.getElementById('searchButton');
let searchResults = document.getElementById('searchResults');
let footer = document.getElementsById('footer');



