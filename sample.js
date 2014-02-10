
var on_contents = function(cb) {
        var httpRequestParams = 
        {
            host: "google.com",
            port: 80,
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
    console.log(data);

    }

    on_contents(onFinish)