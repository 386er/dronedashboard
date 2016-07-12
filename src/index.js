var express = require("express");
var app = express();
var http = require('http').Server(app);
var mongoose = require('mongoose');
app.use(express.static(__dirname));
var url = 'mongodb://localhost:27017/fyke';
var routes = require('./api/routes/index');
var streams = require('./api/routes/streamRouter');
var users = require('./api/routes/users');
var bodyParser = require('body-parser');
var passport = require('passport');
var authenticate = require('./authenticate');

mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected correctly to server");
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(passport.initialize());
app.use('/', routes);
app.use('/streams', streams);
app.use('/users', users);


http.listen(3000, function(){
  console.log('listening on *:3000');
});

