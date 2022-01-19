let logMapData = (mapData) => {
    console.log(mapData);
    return mapData;
}
// ---------------fetch----------------
function getMapData() {
    const latLng = fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=springfield&key=AIzaSyCpxk5yKoAcrMtrTsda23tLvqIZ4RAJCZk`)
    .then(response => response.json())
    // .then(logMapData)
    .then(latData => {
        let lat = latData.results[0].geometry.location.lat;
        let lng = latData.results[0].geometry.location.lng;
        console.log(lat);
        console.log(lng);
        return fetch(`https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=${lat}&lon=${lng}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
                "x-rapidapi-key": "bd2e131b9emsha100eaec64a2cb4p19490bjsn49d7ca4a90a4"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data, latData, latLng)
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