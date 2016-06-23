var express = require("express");
var app = express();
var http = require('http').Server(app);
var mongoose = require('mongoose');
app.use(express.static(__dirname));
var url = 'mongodb://localhost:27017/fyke';

mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected correctly to server");
});


app.get('/', function(req, res){
  res.sendfile('index.html');
});


app.get('/hallo', function(req, res){
  res.end('HALLO!');
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});

