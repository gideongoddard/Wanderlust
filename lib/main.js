'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Foursquare API Info
var clientId = 'TH050UCDNEYER5KPJ1Y40WTO41WKAX4E3YLWF5H2T5HU4N4E';
var clientSecret = 'RVSMHEGLDE2JSIZRSJN0V2DPQBHUEOLNOWFN3DSVUQGOTI01';
var url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
var openWeatherKey = '6e34dc6e8e8b62f68e494567a98e58ef';
var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
var $input = $('#city');
var $submit = $('#button');
var $destination = $('#destination');
var $container = $('.container');
var $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4"), $("#venue5")];
var $weatherDiv = $("#weather1");
var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
var getVenues = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var city, urlToFetch, response, jsonResponse, venues;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            city = $input.val();
            urlToFetch = url + city + '&limit=' + 10 + '&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=' + 20200103;
            _context.prev = 2;
            _context.next = 5;
            return fetch(urlToFetch, { method: 'GET' });

          case 5:
            response = _context.sent;

            if (!response.ok) {
              _context.next = 13;
              break;
            }

            _context.next = 9;
            return response.json();

          case 9:
            jsonResponse = _context.sent;
            venues = jsonResponse.response.groups[0].items.map(function (item) {
              return item.venue;
            });

            console.log(venues);
            return _context.abrupt('return', venues);

          case 13:
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](2);

            console.log(_context.t0);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 15]]);
  }));

  return function getVenues() {
    return _ref.apply(this, arguments);
  };
}();

var getForecast = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var city, urlToFetch, response, jsonResponse;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            city = $input.val();
            urlToFetch = weatherUrl + '?q=' + city + '&APPID=' + openWeatherKey;
            _context2.prev = 2;
            _context2.next = 5;
            return fetch(urlToFetch);

          case 5:
            response = _context2.sent;

            if (!response.ok) {
              _context2.next = 11;
              break;
            }

            _context2.next = 9;
            return response.json();

          case 9:
            jsonResponse = _context2.sent;
            return _context2.abrupt('return', jsonResponse);

          case 11:
            _context2.next = 16;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2['catch'](2);

            console.log(_context2.t0);

          case 16:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[2, 13]]);
  }));

  return function getForecast() {
    return _ref2.apply(this, arguments);
  };
}();

// Render functions
var renderVenues = function renderVenues(venues) {
  $venueDivs.forEach(function ($venue, index) {
    // Add your code here:
    var venue = venues[index];
    var venueIcon = venue.categories[0].icon;
    var venueIconSrc = venueIcon.prefix + 'bg_64' + venueIcon.suffix;
    var venueContent = createVenueHTML(venue.name, venue.location, venueIconSrc);
    $venue.append(venueContent);
  });
  $destination.append('<h2>' + venues[0].location.city + '</h2>');
};

var renderForecast = function renderForecast(day) {
  // Add your code here:

  var weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
};

var executeSearch = function executeSearch() {
  $venueDivs.forEach(function (venue) {
    return venue.empty();
  });
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(function (venues) {
    return renderVenues(venues);
  });
  getForecast().then(function (forecast) {
    return renderForecast(forecast);
  });
  return false;
};

$submit.click(executeSearch);