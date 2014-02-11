
var https = require('https');


var on_contents = function(cb) {
        var httpRequestParams = 
        {
            host: "https://raw.github.com/anits-abhinand/testapp/master/helloworld.html",
            port: 443,
            path: "/?"
        };

        var req = https.get(httpRequestParams, function(res) 
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
    console.log(data);
	res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write(data);

    }

    on_contents(onFinish)
