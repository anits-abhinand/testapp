var http = require('http');

var options = {
  host: 'rawgithub.com',
  port: 80,
  path: '/anits-abhinand/testapp/master/helloworld.html',
  method: 'GET'
};

http.request(options, function(r) {
  r.setEncoding('utf8');
  r.on('data', function (chunk) {
    res.write(chunk);
  });
}).end();