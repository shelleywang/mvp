var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser  = require('body-parser');

var app = express();

app.listen(8000);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../node_modules'))

module.exports = app;