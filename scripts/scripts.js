let mapsKey = `AIzaSyCpxk5yKoAcrMtrTsda23tLvqIZ4RAJCZk`;
let trailsKey = `BFF8C027-7C8F-480B-A5F8-CD8CE490BFBA`;

// --------keys and fetches-----------------------------

let logMapData = (mapData) => {
    // console.log(mapData);
    return mapData;
}

let extractLat = (latData) => {
    // console.log(latData["results"][0]["geometry"]["location"])
    let sample = latData["results"][0]["geometry"]["location"]
    console.log(sample.lat)
    // return latData["results"][0]["geometry"]["location"];
}

// let extractLong = (mapData) => {
//     // console.log(mapData["results"][0]["geometry"]["location"])
//     let sample1 = mapData["results"][0]["geometry"]["location"]['lng']
//     console.log(sample1.lng)
// }

function getMapData() {
    fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=houston&key=AIzaSyCpxk5yKoAcrMtrTsda23tLvqIZ4RAJCZk`)
    .then(response => response.json())
    .then(logMapData)
    // .then(extractLong)
    .then(extractLat)
}
getMapData();

let logTrailsData = (trailsData) => {
    console.log(trailsData);
    return trailsData;
}

// let extractTrailsByLocations = (trailsData.) => {
//     console.log(trailsData.);
//     return;
// }
fetch(`https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=${29.8168824}&lon=${-95.6814651}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
		"x-rapidapi-key": "bd2e131b9emsha100eaec64a2cb4p19490bjsn49d7ca4a90a4"
	}
})
.then(response => response.json())
.then(logTrailsData)




// ---------DOM declarations and bindings----------------


