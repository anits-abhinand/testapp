
var http = require('http');

require('http').createServer(function (req, res) {
var on_contents = function(cb) {
        var httpRequestParams = 
        {
            host: "stackoverflow.com",
            port: 80,
            path: "/tags?"
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
}).listen(8000)