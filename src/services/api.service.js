const axios = require('axios');

const APIURL = "https://developers.zomato.com/api/v2.1";
const APIKEY = require('../config.json').API.KEY;
const MAPAPICODES = require('../config.json').MAPAPI;

const apiFactory = {};

apiFactory.fetchGeoLocationDetails = (searchTerm) => {
    const url = "https://geocoder.api.here.com/6.2/geocode.json?searchText=" + searchTerm + `&app_id=${MAPAPICODES.APPID}&app_code=${MAPAPICODES.APPCODE}`;
    return axios.get(url)
        .then(data => data.data);
}


apiFactory.fetchLocationSuggestions = (searchTerm) => {
    const url = "https://autocomplete.geocoder.api.here.com/6.2/suggest.json?query=" + searchTerm + `&app_id=${MAPAPICODES.APPID}&app_code=${MAPAPICODES.APPCODE}`;
    return axios.get(url)
        .then(data => data.data);
}


apiFactory.searchRestaurants = (lat, lng) => {
    const url = APIURL + `/search?lat=${lat}&lon=${lng}`
    return axios.get(url, {
        headers: {
            'user-key': APIKEY
        }
    })
        .then(data => data.data);
}


module.exports = apiFactory;