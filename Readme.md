# Tourism X Sea Level

## Development

    // create locations_raw.json using destinations.json
    node assets/js/lib/destinations_importer.js

    // create locations_geocoded.json with GPS coords
    node assets/js/lib/geocoder.js

    // create locations_with_elevation.json with elevation info
    node assets/js/lib/elevation_importer.js 
