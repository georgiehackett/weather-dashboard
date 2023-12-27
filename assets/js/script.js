//  Build the URL to query the Geocoding database
var apiKey = "c2f29652dc947b9ba917f2a8f2a9b7e9";
var city = "London";
var geoLocationURL =
  "http://api.openweathermap.org/geo/1.0/direct?q=" +
  city +
  "&limit=1&appid=" +
  apiKey;

// Run Fetch call to the Geocoding API
 fetch(geoLocationURL)
  .then(function getCity(response) {
    // Call .json() to access the json data stored inside the returned promise
    return response.json();
  })
  // Store the retrieved data inside of an object called "cityData"
  .then(function(cityData) {
    // Log the resulting object
    console.log(cityData);

    // Store response data from our request in variables
    var lon = cityData[0].lon.toString();
    // console.log(lon);

    var lat = cityData[0].lat.toString();
    // console.log(lat);
    
    // Build the URL to query the 5 day forecast database
    forecastQueryURL =
      "http://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      apiKey;

    return forecastQueryURL;
  })
  .then(function(data) {
    console.log(forecastQueryURL)})