//Name: Shafeeq Amirudeen
//Class: DISM/2B/24
//Admin No.: 2223007

var express = require('express');
var serveStatic = require('serve-static');
var app = require('./controller/app.js');
const path = require('path');
var port = 8080;

app.use(express.static(path.join(__dirname + '/public'))); 

var server = app.listen(port, function(){
    console.log('Web App Hosted at http://localhost:%s', port);
});