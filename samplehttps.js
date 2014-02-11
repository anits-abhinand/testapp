
var https = require('https');


var on_contents = function(cb) {
        var httpRequestParams = 
        {
            host: "github.com",
            port: 443,
            path: "/?"
        };

        var req = http.get(httpRequestParams, function(res) 
        {
            var data = '';
            res.on('data', function(chunk) {
                data += chunk.toString();
            });

            res.on('end', function(){
                cb(data);
            });

            console.log(data);
        }).end();

    }

    function onFinish(data) {	
        res.write(data);

    }

    on_contents(onFinish)
