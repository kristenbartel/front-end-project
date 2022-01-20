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
let inputText = userInput.value
let searchButton = document.getElementById('searchButton');
let searchResults = document.getElementById('searchResults');
let footer = document.getElementById('footer');



// Event listner for 'searchButton'

searchButton.addEventListener('click', (e) =>{
    e.preventDefault();
    fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=${inputText}&key=${keys.keys.mapsKey}`)
    .then(response => response.json())
    .then(latData => {
        // console.log(latData);
        let lat = latData.results[0].geometry.location.lat;
        let lng = latData.results[0].geometry.location.lng;
        // console.log(lat);
        // console.log(lng);
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
            const html = data.data.map(array =>{
                return `
                <div class='parkInfo'
                <p>Name: ${array.name}</p>
                <p>City: ${array.city}</p>
                <p>Difficulty: ${array.difficulty}</p>
                <p>Length: ${array.length} Miles</p>
                <p>Rating: ${array.rating}</p>
                <p>Link: ${array.url}</p>
                </div>
                `
            }).join('');
            // console.log(html)
            document.querySelector('#searchResults').insertAdjacentHTML('afterbegin', html);
            
        })
    })
    
});



