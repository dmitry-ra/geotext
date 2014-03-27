##Intro

Geotext is a very small JavaScript library for parsing and displaying geographic coordinates according to [ISO 6709 Annex D](http://en.wikipedia.org/wiki/ISO_6709 "http://en.wikipedia.org/wiki/ISO_6709").

##Live demo
[http://dmitry-ra.github.io/geotext/](http://dmitry-ra.github.io/geotext/)

##Features
 - The order of coordinates does not matter to parse (lat/lon or lon/lat)
 - You can set your own unit symbol for altitude
 - Supported decimal mark is dot `.` comma `,` or momayyez `٫`

##Files

- [geoprint.js](https://github.com/dmitry-ra/geotext/blob/master/geoprint.js) - functions to convert numeric values of coordinates to a string
- [geoparse.js](https://github.com/dmitry-ra/geotext/blob/master/geoparse.js) - parsing text representation of the coordinates to numeric values

##Caveats
`GeoText.parse(...)` is tolerant to spaces in minutes and seconds, but not in degrees and altitude. So `42°3 0'N` is 42.5, but `4 2°30'N` is 2.5.

##License

See [LICENSE](https://github.com/dmitry-ra/geotext/blob/master/LICENSE).


