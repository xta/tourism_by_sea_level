var $         = require('jquery');
var locations = require('./src/sorted_locations.json');

$(function() {

  "use strict";

  var index,
      location,
      elevation,
      $list = $("ul#locations");

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
