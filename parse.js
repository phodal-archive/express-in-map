var fs = require('fs');
var file = __dirname + '/origin-data.json';
var _ = require('lodash');

fs.readFile(file, 'utf8', function (err, expressInfos) {
    var parsedInfo;

    if (err) {
        console.log('Error: ' + err);
        return;
    }

    expressInfos = JSON.parse(expressInfos);

    var clearData = function (expressData) {
        return _.map(expressData, function (express) {
            var trackInfo = express.originCountryData.trackinfo;
            return _.map(trackInfo, function (track) {
                delete track.Details;
                return track;
            });
        });
    };

    parsedInfo = clearData(expressInfos);

    console.dir(parsedInfo);

    fs.writeFile(__dirname + '/parsed-data.json', JSON.stringify(parsedInfo), function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
});