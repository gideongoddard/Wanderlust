"use strict";

var createVenueHTML = function createVenueHTML(name, location, iconSource) {
  return "<h2>" + name + "</h2>\n    <img class=\"venueimage\" src=\"" + iconSource + "\"/>\n    <h3>Address:</h3>\n    <p>" + location.address + "</p>\n    <p>" + location.city + "</p>\n    <p>" + location.country + "</p>";
};

var createWeatherHTML = function createWeatherHTML(currentDay) {
  console.log(currentDay);
  return "<h2>" + weekDays[new Date().getDay()] + "</h2>\n          <h2>Temperature: " + kelvinToFahrenheit(currentDay.main.temp) + "&deg;F</h2>\n          <h2>Condition: " + currentDay.weather[0].description + "</h2>\n        <img src=\"https://openweathermap.org/img/wn/" + currentDay.weather[0].icon + "@2x.png\">";
};

var kelvinToFahrenheit = function kelvinToFahrenheit(k) {
  return ((k - 273.15) * 9 / 5 + 32).toFixed(0);
};