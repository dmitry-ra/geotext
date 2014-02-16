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
    return gt;
}(GeoText || {}));