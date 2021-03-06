var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hotque');

var domain = require('./routes/api/hq_domain');
var account = require('./routes/api/hq_account');

app.use('/v1/domain', domain);
app.use('/v1/account', account);

app.listen(3000);
