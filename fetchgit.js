
var http = require('http');


var on_contents = function(cb) {
        var httpRequestParams = 
        {
            host: "rawgithub.com",
            port: 80,
            path: "/anits-abhinand/testapp/master/helloworld.html/?"
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
