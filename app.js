
var http = require('http'),
    fs = require('fs');


fs.readFile('client/index.html', function (err, html) {
    if (err) {
        throw err; 
    }         
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
	});