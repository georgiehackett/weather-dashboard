document.addEventListener('DOMContentLoaded', (event) => {
  
var searchBtn = document.getElementById('search-button');
var todayEl = document.getElementById('today');
var forecastEl = document.getElementById('forecast');

//  Build the URL to query the database
var apiKey = "c2f29652dc947b9ba917f2a8f2a9b7e9";

// var city = '';


searchBtn.addEventListener('submit', searchWeather());

function searchWeather() {
  event.preventDefault();

  var userInput = document.getElementById('search-input').value;

  var forecastQueryURL =
"http://api.openweathermap.org/data/2.5/forecast?q=" + "London" + "&appid=" + apiKey + "&limit=1";
console.log(forecastQueryURL);



// console.log(userInput);

  // Run Fetch call to the forecast API
  fetch(forecastQueryURL)
  .then(function getCity(response) {
    // Call .json() to access the json data stored inside the returned promise
    return response.json();
  })
  // Store the retrieved data inside of an object called "forecastData"
  .then(function (forecastData) {
    // Log the resulting object
    console.log(forecastData);
    console.log(forecastData.city);

    var city = forecastData.name;
    console.log(forecastData.list);

    var cityList = forecastData.list;

    for (i = 0; i < cityList.length; i+=8) {
      // console.log(forecastData);
      console.log(cityList[i]);
    }
    

  });
}
});