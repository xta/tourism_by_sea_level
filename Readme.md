# Tourism X Sea Level

## Development

    // build assets for site (index.html)
    gulp

#### Internal Build Tools

    // create locations_raw.json using destinations.json
    node assets/js/src/lib/destinations_importer.js

    // create locations_geocoded.json with GPS coords
    node assets/js/src/lib/geocoder.js

    // create locations_with_elevation.json with elevation info
    node assets/js/src/lib/elevation_importer.js 

    // create sorted_locations_with_elevation.json
    node assets/js/src/lib/sorter.js 

    // write sorted_locations_with_elevation.json into root index.html
    node assets/js/src/lib/writer.js 
