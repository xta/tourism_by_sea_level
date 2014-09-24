// file system & helpers
var fs            = require('fs');
var locations     = require('../locations_with_elevation.json');
var outputFile    = './assets/js/src/sorted_locations.json';

locations.sort(function(a,b) { return parseFloat(a.elevation_meters) - parseFloat(b.elevation_meters); } );

fs.writeFile(outputFile, JSON.stringify(locations, null, 4), function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("JSON saved to " + outputFile);
  }
});
