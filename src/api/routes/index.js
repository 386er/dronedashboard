var express = require('express');
var router = express.Router();
var path = require('path');
var Verify = require('./verify')



router.get('/', function(req, res){
  res.sendFile(path.resolve('index.html'));
});



module.exports = router;
