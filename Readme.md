# Tourism X Sea Level

## Development

    // create locations.json
    node assets/js/lib/destinations_importer.js

    // update locations.json with GPS coords
    node assets/js/lib/geocoder.js

    // create locations_with_elevation.json with elevation info
    node assets/js/lib/elevation_importer.js 
