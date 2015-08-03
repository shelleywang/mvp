var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser  = require('body-parser')
    searchProcessor = require('./searchProcessor.js');

var app = express();

app.listen(8000);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../node_modules'))

app.get('/api/search', searchProcessor.processSearch);

module.exports = app;