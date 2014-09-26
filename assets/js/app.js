var $         = require('jquery');

$(function() {

  "use strict";

  var index,
      location,
      locations = $('#locations li'),
      $active_location,
      $location,
      scroll_top,
      location_top,
      location_height         = $(locations[0]).outerHeight(), // assuming all <li> same height
      active_lower_threshold  = -37.5, // li height of 75 divided by 2
      active_upper_threshold  = 37.5,  // li height of 75 divided by 2
      scrollEvent               = false;

  var current_location = function() {
    scroll_top        = $(window).scrollTop();
    $active_location  = $('li.active');

    for (index = 0; index < locations.length; ++index) {
      location        = locations[index];
      $location       = $(location);
      location_top    = getLocationTop(location, scroll_top);

      if (locationIsCurrent(location_top)) {
        return $location;
      }
    }
    return $active_location;
  };

  var getLocationTop = function(element, scroll_top) {
    var $el = $(element);
    return $el.offset().top - scroll_top;
  };

  var locationIsCurrent = function(location_top) {
    return ((location_top > active_lower_threshold) && (location_top < active_upper_threshold));
  };

  var set_map_location = function(latlng) {
    var newUrl = "https://www.google.com/maps/embed/v1/view?key=AIzaSyCNLrRk8eXv8rU7dcytITMR0zOexyoCWkw&center=";
    newUrl += latlng;
    newUrl += "&zoom=8&maptype=satellite";
    $('#map iframe').attr('src', newUrl);
    return true;
  };

  var updatePage = function() {
    var $current = current_location();
    $active_location.removeClass('active');
    $current.addClass('active');

    if ($active_location.data('latlng') !== $current.data('latlng')) {
      set_map_location($current.data('latlng'));
    }
  };

  $(window).scroll(function() {
    scrollEvent = true;
  });

  setInterval(function() {
    if (scrollEvent) {
      scrollEvent = false;
      updatePage();
    }
  }, 30);
});
