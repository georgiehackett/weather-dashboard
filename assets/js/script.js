document.addEventListener("DOMContentLoaded", (event) => {
  var searchBtn = document.getElementById("search-form");
  var todayEl = document.getElementById("today");
  var forecastEl = document.getElementById("forecast");

  //  Build the URL to query the database
  var apiKey = "c2f29652dc947b9ba917f2a8f2a9b7e9";

  // var city = '';

  

  function searchWeather(event) {
    event.preventDefault();

    console.log('test');
    var userInput = document.getElementById("search-input").value;

    console.log(userInput);

    

    var forecastQueryURL =
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      "London" +
      "&appid=" +
      apiKey +
      "&limit=1";
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

        var city = forecastData.city.name;
        var cityList = forecastData.list;

        var todayForecast = document.getElementById('today');

        var todayCard = document.createElement('div');
        todayCard.classList.add('card');
        todayForecast.appendChild(todayCard);

        var todayDate = forecastData.list[0].dt_txt;        
        todayDate = dayjs(todayDate).format('DD-MM-YY').replaceAll('-', '/');

        var todayDateEl = document.createElement('h2');
        todayDateEl.classList.add('m-3')
        todayDateEl.innerText = `${city} (${todayDate})`
        todayCard.appendChild(todayDateEl);

        var cardContentRow = document.createElement('div');
        cardContentRow.classList.add('row');
        todayCard.appendChild(cardContentRow);

        var iconDiv = document.createElement('div');
        iconDiv.classList.add('col');

        var todayIcon = document.createElement('img');
        todayIcon.src = "https://openweathermap.org/img/wn/" + cityList[0].weather[0].icon + "@2x.png";
        todayIcon.classList.add('w-25', 'm-3');
        cardContentRow.appendChild(todayIcon, iconDiv);

        var infoDiv = document.createElement('div');
        infoDiv.classList.add('col');
        todayCard.appendChild(infoDiv)

        var todayTempEl = document.createElement('p')
        var todayTemp =  Math.round(100 * (cityList[0].main.temp - 273.15))/100;
        todayTempEl.textContent = `Temp: ${todayTemp}°C`;
        console.log(todayTempEl);
        infoDiv.appendChild(todayTempEl);


        // Iterate through array to build 5-day forecast cards

        for (i = 7; i < cityList.length; i += 7) {

          var dailyForecast = cityList[i].main;

          var forecastEl = document.getElementById("forecast");

          var forecastCol = document.createElement("div");
          forecastCol.classList.add("col");

          var forecastCard = document.createElement("div");
          forecastCard.classList.add("card");

          var forecastCardBody = document.createElement("div");
          forecastCardBody.classList.add("card-body");

          var forecastIcon = document.createElement("img");
          
          forecastIcon.src =
            "https://openweathermap.org/img/wn/" +
            cityList[i].weather[0].icon +
            "@2x.png";
          forecastCardBody.appendChild(forecastIcon);

          var forecastDate = document.createElement('h3')
          forecastDate.innerText = dayjs(cityList[i].dt_txt).format('DD-MM-YY').replaceAll('-', '/');
          forecastCardBody.appendChild(forecastDate);

          var forecastTemp = document.createElement("p");
          forecastTemp.innerText = `Temp: ${Math.round(100 * (dailyForecast.temp - 273.15))/100}°C`;
          forecastCardBody.appendChild(forecastTemp);

          var forecastHumidity = document.createElement("p");
          forecastHumidity.innerText = `Humidity: ${dailyForecast.humidity}% `;
          forecastCardBody.appendChild(forecastHumidity);

          forecastCard.appendChild(forecastCardBody);
          forecastCol.appendChild(forecastCard);
          forecastEl.appendChild(forecastCol);
        }
      });
  }
  searchBtn.addEventListener("submit", searchWeather);
  console.log(searchBtn);
});

