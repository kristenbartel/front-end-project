// --------keys and fetches-----------------------------
import

let logMapData = (mapData) => {
    console.log(mapData);
    return mapData;
}

// I think this is mapData.results.0.geometry.location
// let extractLatLong = (mapData) => {
//     console.log(mapData.);
//     return;
// }

function getMapData() {
    fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=houston&key=AIzaSyCpxk5yKoAcrMtrTsda23tLvqIZ4RAJCZk`)
    .then(response => response.json())
    .then(logMapData)
    // .then(extractLatLong)
}
getMapData();

// let logTrailsData = (trailsData) => {
//     console.log(trailsData);
//     return trailsData;
// }

// let extractTrailsByLocations = (trailsData.) => {
//     console.log(trailsData.);
//     return;
// }

// ---------DOM declarations and bindings----------------


