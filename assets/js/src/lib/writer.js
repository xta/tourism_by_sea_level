// Note: writer.js makes a lot of assumptions about index.html
// The key assumption is that there is a text string 'REPLACEME' to be replaced by <li> elements

/*
  For example, the html may be altered to look like this BEFORE writer.js is run:

      <div id='content'>
        <ul id='locations'>
          REPLACEME
        </ul>
      </div>
*/

var fs = require('fs');
var locations = require('../sorted_locations.json');
var outputFile = './index.html',
    outputHTML,
    HTMLparts,
    HTMLprepend,
    HTMLappend,
    splitKeyword = "REPLACEME",
    index,
    location;

fs.readFile(outputFile, 'utf8', function(err, html) {
  if (err) {
    console.log(err);
  } else {
    outputHTML = html;

    if (outputHTML.indexOf(splitKeyword) > -1) {

      HTMLparts = outputHTML.split(splitKeyword);
      HTMLprepend = HTMLparts[0];
      HTMLappend = HTMLparts[1];

      outputHTML = HTMLprepend;

      for (index = 0; index < locations.length; ++index) {
        location  = locations[index];

        outputHTML += "<li "
        outputHTML += "data-name="
        outputHTML += '"'+ location.name +'" '
        outputHTML += "data-country="
        outputHTML += '"'+ location.country +'" '
        outputHTML += "data-latlng="
        outputHTML += '"'+ location.lat_lng +'" '
        outputHTML += ">"
        outputHTML += location.name
        outputHTML += ", "
        outputHTML += location.country
        outputHTML += "</li>\n            "
      }

      outputHTML += HTMLappend;

      fs.writeFile(outputFile, outputHTML, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("File updated at " + outputFile);
        }
      });

    } else {
      console.log("File was not updated. Please make sure it contains '" + splitKeyword + "'.");
    }

  }
});
