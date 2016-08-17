var fs = require('fs');
var file = __dirname + '/demo-parse-data.json';
var _ = require('lodash');

fs.readFile(file, 'utf8', function (err, expressInfos) {
    if (err) {
        console.log('Error: ' + err);
        return;
    }

    expressInfos = JSON.parse(expressInfos);

    var data = {
        get: {},
        transport: [],
        end: {}
    };

    _.each(expressInfos, function (express) {
        var statusDescription = express.StatusDescription;

        if (statusDescription.indexOf('已揽收') !== -1) {
            data.get = express;

            var regex = /^(.*?)公司/.exec(express.StatusDescription);
            data.get.location = regex[1];
        }
        if (statusDescription.indexOf('已发出,下一站') !== -1) {
            data.transport.push(express);
        }
        if (statusDescription.indexOf('已签收') !== -1) {
            data.end = express;
        }
    });

    console.dir(data);
});