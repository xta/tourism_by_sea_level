// file system & helpers
var fs            = require('fs');
var request       = require("request");
var locations     = require('../locations.json');
var outputFile    = './assets/js/locations_with_elevation.json';
var delay         = 1000;
var results       = [];
var url           = "http://maps.googleapis.com/maps/api/elevation/json?locations=";

function updateWithElevation(arg, callback) {
  console.log('Updating Location \''+ arg['id'] +'\'');
  var lat_lng     = arg['lat'] + ',' + arg['lng'];
  arg['lat_lng']  = lat_lng;

  request(url + lat_lng, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      // console.log(body);

      var result = JSON.parse(body);

      if (result["status"] === "OK") {
        arg['elevation_meters']      = result['results'][0]['elevation'];
        arg['elevation_resolution']  = result['results'][0]['resolution'];
      } else {
        console.log("Status was NOT OK for " + lat_lng);
      }
    }
  });

  setTimeout(function() { callback(arg); }, delay);
}

function final() {
  console.log('--- --- Update Complete --- ---');

  fs.writeFile(outputFile, JSON.stringify(results, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFile);
    }
  });
}

function updateLocations(item) {
  if(item) {
    updateWithElevation( item, function(result) {
      results.push(result);
      return updateLocations(locations.shift());
    });
  } else {
    return final();
  }
}

updateLocations(locations.shift());
