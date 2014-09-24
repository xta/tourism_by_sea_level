// file system & helpers
var fs            = require('fs');
var locations     = require('../locations_raw.json');
var outputFile    = './assets/js/src/locations_geocoded.json';
var delay         = 1000;
var results       = [];

// geocoder
var geocoderProvider  = 'openstreetmap',
    httpAdapter       = 'http',
    geocoder          = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter);

function geocodeItem(location, callback) {
  try {
    console.log('Geocoding Location \''+ location['id'] +'\'');

    geocoder.geocode(location.name, function(err, res) {
      if(err) {
        console.log(err);
      } else {

        if (Object.keys(res).length > 0) {
          console.log("Now saving lat & lng for id: " + location.id);
          location['lat'] = res[0]['latitude'];
          location['lng'] = res[0]['longitude'];
        } else {
          console.log("Lat & lng unavailable for id: " + location.id);
        }
        setTimeout(function() { callback(location); }, delay);
      }
    });

  }
  catch (e) {
    console.log(e);
  }
}

function final() {
  console.log('--- --- Geocoding Complete --- ---');

  fs.writeFile(outputFile, JSON.stringify(results, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFile);
    }
  });
}

function geocodeLocations(item) {
  if(item) {
    geocodeItem( item, function(result) {
      results.push(result);
      return geocodeLocations(locations.shift());
    });
  } else {
    return final();
  }
}

geocodeLocations(locations.shift());
