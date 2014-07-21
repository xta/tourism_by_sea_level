// file system & helpers
var fs              = require('fs');
var locations_path  = "./assets/js/locations.json";
var locations       = require('../locations.json');

// geocoder
var geocoderProvider  = 'openstreetmap',
    httpAdapter       = 'http',
    geocoder          = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter);

// internal geocoder states
var location_id,
    location_name,
    geocoder_first_response,
    location_lat,
    location_lng;

// functions
var save_lat_lng = function(id, lat, lng) {
  fs.readFile(locations_path, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    update_file(data, id, lat, lng);
  });
};

// Note: this will update the file in place
var update_file = function(read_locations, id, lat, lng) {

  var read_locations = JSON.parse(read_locations);

  read_locations.forEach(function(location){
    if(location.id === id) {
      location.lat = lat;
      location.lng = lng;
    }
  });

  writer(read_locations);
};

var writer = function(data_to_write) {
  fs.writeFile(locations_path, JSON.stringify(data_to_write, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("Updated JSON saved at " + locations_path);
    }
  });
};

var geocode_file = function() {

  locations.forEach(function(location){

    geocoder.geocode(location.name, function(err, res) {
      if(err) {
        console.log(err);
      } else {
        console.log("Now saving lat & lng for id: " + location.id);
        save_lat_lng(location.id, res[0].latitude, res[0].longitude);
      }
    });

  });
};

geocode_file();
