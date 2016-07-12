var express = require('express');
var router = express.Router();
var path = require('path');
var Verify = require('./verify')



router.get('/dashboard', function(req, res){
  res.sendFile(path.resolve('index.html'));
});


router.get('/', function(req, res){
   res.redirect('/dashboard')
});


router.get('/login', function(req, res){
	res.sendFile(path.resolve('login.html'));
});





module.exports = router;
