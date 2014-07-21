// file system & helpers
var fs            = require('fs');
var destinations  = require('../destinations.json');
var outputFile    = './assets/js/locations.json';

// geocoder
var geocoderProvider  = 'openstreetmap',
    httpAdapter       = 'http',
    geocoder          = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter);

// internal geocoder states
var locations,
    id = 0,
    location_name,
    location_country,
    location_lat,
    location_lng;//,
    // geo_response;

locations = destinations.map(function(destination){

  id++;
  location_name     = destination.split("(")[0].trim();
  location_country  = destination.split("(")[1].slice(0, - 1);

  // geo_response = geocoder.geocode(location_name, function(err, res) {
  //   if(err) {
  //     console.log(err);
  //   } else {
  //     return res;
  //   }
  // });

  return {
    id: id,
    name: location_name,
    country: location_country//,
    // lat: geo_response.latitude,
    // lng: geo_response.longitude
  };
});

fs.writeFile(outputFile, JSON.stringify(locations, null, 4), function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("JSON saved to " + outputFile);
  }
});
