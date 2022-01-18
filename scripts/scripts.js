// let mapsKey = `AIzaSyCpxk5yKoAcrMtrTsda23tLvqIZ4RAJCZk`;
// let trailsKey = `BFF8C027-7C8F-480B-A5F8-CD8CE490BFBA`;

// --------keys and fetches-----------------------------

let logMapData = (mapData) => {
    console.log(mapData);
    return mapData;
}

// ---------fetch attempt 1----------------
function getMapData() {
    const latLng = fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=houston&key=AIzaSyCpxk5yKoAcrMtrTsda23tLvqIZ4RAJCZk`)
    .then(response => response.json())
    // .then(logMapData)
    // .then(extractLat)
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

// --------fetch attempt 2--------- not sure of syntax and usage
// let extractLat = latData => {
//     let {lat} = latData;
//     console.log(lat)
//     return lat;
// }

// ----------------fetch attempt 3-------------------
// let getLat =
//     fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=houston&key=AIzaSyCpxk5yKoAcrMtrTsda23tLvqIZ4RAJCZk`)
//     .then(response => response.json())
//     // .then(logMapData)
//     .then(latData => {
//         let lat = latData.results[0].geometry.location.lat;
//         console.log(lat)
//         return lat;
//     })

// let getLng = 
//     fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=houston&key=AIzaSyCpxk5yKoAcrMtrTsda23tLvqIZ4RAJCZk`)
//     .then(response => response.json())
//     // .then(logMapData)
//     .then(lngData => {
//         let lng = lngData.results[0].geometry.location.lng
//         console.log(lng);
//         return lng
//     })

// let latLng = `lat=${getLat}&lon=${getLng}`;

// -------------fetch attempt 4--------------
// let extractLat = (latData) => {
//     let lat = latData.results[0].geometry.location.lat;
//     console.log(lat)
//     return lat;
// }

// let extractLong = (lngData) => {
//     let lng = lngData.results[0].geometry.location.lng;
//     console.log(lng);
//     return lng;
// }
// let getLat =
//     fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=houston&key=AIzaSyCpxk5yKoAcrMtrTsda23tLvqIZ4RAJCZk`)
//     .then(response => response.json())
//     // .then(logMapData)
//     .then(extractLat)
//     console.log(getLat)
   
    

// let getLng = 
//     fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=houston&key=AIzaSyCpxk5yKoAcrMtrTsda23tLvqIZ4RAJCZk`)
//     .then(response => response.json())
//     // .then(logMapData)
//     .then(extractLong)
//     console.log(getLng)
    

// let latLng = `lat=${getLat}&lon=${getLng}`;
// https://trailapi-trailapi.p.rapidapi.com/trails/explore/?${latLng}

// ----------trails fetch--------------

// let logTrailsData = (trailsData) => {
//     console.log(trailsData);
//     return trailsData;
// }

// let extractTrailsByLocations = (trailsData) => {
//     console.log(trailsData);
//     return;
// }
// fetch(`https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=${getLat}&lon=${getLng}`, {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
// 		"x-rapidapi-key": "bd2e131b9emsha100eaec64a2cb4p19490bjsn49d7ca4a90a4"
// 	}
// })
// .then(response => response.json())
// .then(logTrailsData)
// 

// ---------DOM declarations and bindings----------------