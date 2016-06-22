/*
hotque restapi for user management and domain management.
*/

var express = require('express');
var app = express();

var server = app.listen(8081, function () {
	var host = server.address().address
	var port = server.address().address

	console.log("hotque restapi listening at %s:%s", host, port)
})