var $         = require('jquery');
var locations = require('./src/locations_with_elevation.json');

$(function() {

  "use strict";

  var index,
      location,
      elevation,
      $list = $("ul#locations");

  locations.sort(function(a,b) { return parseFloat(a.elevation_meters) - parseFloat(b.elevation_meters); } );

  $list.empty();

  for (index = 0; index < locations.length; ++index) {
    location  = locations[index];
    elevation = parseFloat(location.elevation_meters).toFixed(2);

    $list.append( '<li>' +
                  location.name +
                  ', ' +
                  location.country +
                  '. (elevation: ' +
                  elevation +
                  'm)' +
                  '</li>');
  }

});
