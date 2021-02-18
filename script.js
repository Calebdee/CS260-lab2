document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=0ef21e2a2b1ae4b2621e289ba478f094";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let results = "";
	  results += '<h2>Current Weather in ' + json.name + "</h2><hr>";

	  for (let i=0; i < json.weather.length; i++) {
		results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
	   }
	   results += '<h2>' + json.main.temp + " &deg;F</h2>"
	   results += "<p>"
	   for (let i=0; i < json.weather.length; i++) {
		 results += json.weather[i].description
		 if (i !== json.weather.length - 1)
		    results += ", "
	   }
     results += '<hr><h3>' + json.name + ' Coordinates </h3>';
     results += '<div class=leftAlign><p>Latitude: ' + json.coord.lat + '</p>'; 
     results += '<p>Longitude: ' + json.coord.lon + '</p></div><hr>';
     results += '<h3>' + json.name + ' Information</h3>';
     results += '<div class=leftAlign><p>Humidity: ' + json.main.humidity + '%</p>';
     results += '<p>Pressure: ' + json.main.pressure + ' hPa</p>';
     results += '<p>Real Feel Temp: ' + json.main.feels_like + ' &deg;F</p>';
     results += '<p>Cloudiness: ' + json.clouds.all + '%</p>';
     results += '<p>Wind Speed: ' + json.wind.speed + ' m/s</p>';
	   results += "</div></p>";
	   document.getElementById("weatherResults").innerHTML = results;
    });

  const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=0ef21e2a2b1ae4b2621e289ba478f094";
  fetch(url2)
    .then(function(response) {
      
      return response.json();
    }).then(function(json) {
      console.log(json);
      let forecast = "";
      forecast += "<h2>5-Day Forecast for " + json.city.name + "</h2>";
      var day = -1;
      for (let i=0; i < json.list.length; i++) {
        if (day != moment(json.list[i].dt_txt).format('D')) {
          day = moment(json.list[i].dt_txt).format('D');
          forecast += "<hr><h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY') + "</h2>";

        }
    		//forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
    		forecast += "<p>" + moment(json.list[i].dt_txt).format('h:mm:ss a') + " - Temp: " + json.list[i].main.temp + "</p>";
    		forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
	   }
	   document.getElementById("forecastResults").innerHTML = forecast;
    });
  
  
});