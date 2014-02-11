var http = require('http');

var options = {
  host: 'rawgithub.com',
  port: 80,
  path: '/anits-abhinand/testapp/master/helloworld.html',
  method: 'GET'
};

http.request(options, function(res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    res.write(data);
  });
}).end();