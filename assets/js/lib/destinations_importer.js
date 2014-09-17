// file system & helpers
var fs            = require('fs');
var destinations  = require('../destinations.json');
var outputFile    = './assets/js/locations_raw.json';

// internal geocoder states
var locations,
    id = 0,
    location_name,
    location_country;

locations = destinations.map(function(destination){

  id++;
  location_name     = destination.split("(")[0].trim();
  location_country  = destination.split("(")[1].slice(0, - 1);

  return {
    id: id,
    name: location_name,
    country: location_country,
    lat: "",
    lng: ""
  };
});

fs.writeFile(outputFile, JSON.stringify(locations, null, 4), function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("JSON saved to " + outputFile);
  }
});
