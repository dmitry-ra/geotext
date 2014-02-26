var GeoText = (function (gt) {
    var localZero = (0).toLocaleString();
    var localDecimalSeparator = (1.1).toLocaleString().charAt(1);
    function zeroPad(value) {
        var string = value.toLocaleString();
        return (value < 10) ? (localZero + string) : string;
    }
    function toFixed(number, precision) {
        var multiplier = Math.pow(10, precision);
        return Math.round(number * multiplier) / multiplier;
    }
    gt.deg2str = function(value, isLatitude) {
        var sign = isLatitude ? (value >= 0 ? 'N' : 'S') : (value >= 0 ? 'E' : 'W');
        value = Math.abs(value);
        var frac = value % 1;
        var deg = (value | 0).toLocaleString();
        var min = zeroPad(frac * 60 | 0);
        var sec = zeroPad(toFixed(frac * 3600 % 60, 3));
        return deg.concat('°', min, "'", sec, '"', sign);
    };
    gt.lat2str = function(latitude) {
        return gt.deg2str(latitude, true);
    };
    gt.lon2str = function(longitude) {
        return gt.deg2str(longitude, false);
    };
    gt.point2str = function(latitude, longitude, altitude, altUnitSymbol) {
        var result = [];
        if (typeof latitude != 'undefined')
            result.push(gt.lat2str(latitude));
        if (typeof longitude != 'undefined')
            result.push(gt.lon2str(longitude));
        if (typeof altitude != 'undefined') {
            var unit = altUnitSymbol || 'm';
            result.push(altitude.toLocaleString() + unit);
        }
        return result.join(' ');
    };
    return gt;
}(GeoText || {}));