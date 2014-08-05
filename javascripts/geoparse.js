var GeoText = (function (gt) {
    function normalize(value) {
        return value.split(/\s+/).join('').split(/[,\u066B]/).join('.');
    }
    function getValued(array) {
        return array.filter(function(x){return typeof x != 'undefined';});
    }
    gt.parse = function(value, parseAltitude, altitudeUnit) {
        var result = { correct: false };
        var coords = value.match(/(\d+\s*\u00B0.*?[NEWS])/gi);
        if (!coords)
            return result;
        for (var i = 0; i < coords.length; i++) {
            var coord = normalize(coords[i]);
            var sign = coord.charAt(coord.length - 1).toUpperCase();
            var values = getValued(coord.match(/(\d+\u00B0)(\d+\'){0,1}(\d+\.{0,1}\d+"){0,1}/));
            var d = 0, m = 0, s = 0;
            for (var j = 1; j < values.length; j++) {
                var val = values[j];
                switch (val.charAt(val.length - 1)) {
                    case '\u00B0': d = parseFloat(val); break;
                    case "'": m = parseFloat(val); break;
                    case '"': s = parseFloat(val); break;
                }
            }
            var v = d + (m / 60.0) + (s / 3600.0);
            switch (sign) {
                case 'N': result.lat = v; break;
                case 'S': result.lat = -v; break;
                case 'E': result.lon = v; break;
                case 'W': result.lon = -v; break;
            }
        }
        if (parseAltitude) {
            altitudeUnit = altitudeUnit || 'm';
            if (altitudeUnit instanceof Array)
                altitudeUnit = altitudeUnit.join('|');
            var av = value.match(new RegExp('(\\d+[\\.,\u066B]{0,1}\\d+)\\s*(' + altitudeUnit + ')'));
            if (av && av.length > 2) {
                result.alt = parseFloat(normalize(av[1]));
                result.unit = av[2];
            }
        }
        result.correct = true;
        return result;
    };
    return gt;
}(GeoText || {}));