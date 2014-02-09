var express = require('express');
var app = express();
var path = require('path');

var clientDir = path.join(__dirname, 'client');


    res.sendfile('client/index.html');

app.configure ( function() {
	app.use(express.favicon());
    app.use(express.logger('dev'));
	app.use(express.static(clientDir));
