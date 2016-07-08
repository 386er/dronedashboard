var express = require('express');
var router = express.Router();
var path = require('path');



router.get('/', function(req, res){
  res.sendfile('../index.html');
});


router.get('/login', function(req, res){
	res.sendFile(path.resolve('login.html'));
});





module.exports = router;
