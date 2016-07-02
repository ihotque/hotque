var express = require('express');
var account = require('./routes/api/hq_account');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hotque');

app.use('/api/account', account);

app.listen(3000);
