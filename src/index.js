var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('underscore');
app.use(express.static(__dirname));
/*var projectId = process.env.GCLOUD_PROJECT_ID; // E.g. 'grape-spaceship-123'
var auth = process.env.GCLOUD_AUTH_FILE
var topicName = process.env.PUBSUB_TOPIC
var policy = process.env.PUBSUB_POLICY

var pubsub = require('gcloud').pubsub({
  projectId: projectId,
  keyFilename: auth
});
// Reference a topic that has been previously created.
var topic = pubsub.topic(topicName);
var subscription = topic.subscription('gps_subscription', {
	autoAck: true,
	interval: 1
});*/

/*var currentHeight = 0.5;

var getRanNum = function() {
	var ranNum = 5 + Math.random() * 390;
	return ranNum;
}

var getNewDataPoint = function() {
	var NewData = {'x':getRanNum(), 'y':getRanNum()}
	return NewData;
};


var getHeightData = function() {

	var ranNum = Math.random() ;

	if (ranNum > 0.75) {
		currentHeight = Math.random()
	}

	return currentHeight
}
*/



var createSpiderChartData = function(dimensions) {

	var 
		dataObject = {},
		dimensions = _.range(0,dimensions);
		dimensions.forEach(function(element) {
			dataObject[element] = Math.random();
		})

	return dataObject;
};


createSpiderChartData();

io.on('connection', function (socket) {



	socket.emit('init', function() {return 5;}());

/*	function poll() {
		subscription.pull({maxResults:1}, function(err, messages) {
			if (err) {
				console.log(err)
			} else if (messages !== undefined && messages.length > 0) {
				// send data
				//console.log(messages[messages.length - 1 ])
				for (m in messages) {
					socket.volatile.emit('new gps', messages);
				}
			}
		});
	}
	function onError(err) { console.log(err)}
	function onMessage(message) {
		console.log(message);
		socket.volatile.emit('new gps', message.data);
	}
	subscription.exists(function(err, exists) {
		if (!exists) {
			subscription.create(function(err, subscription) {
				// Register listeners to start pulling for messages.
				console.log("Creating subscription")
				subscription.on('error', onError);
				//subscription.on('message', onMessage);
				
				 setInterval(function () {
				 	poll();
				 }, 10);
			});
		} else {
			subscription.on('error', onError);
			//subscription.on('message', onMessage);
			 setInterval(function () {
			 	poll();
			 }, 10);
		}

	});*/

/*  setInterval(function () {
      socket.volatile.emit('new data', getNewDataPoint());
	}, 1500);*/










  setInterval(function () {
/*  		var height = getHeightData()
  		console.log(height)
    */	socket.volatile.emit('spiderDataOne', createSpiderChartData(9));
	}, 1000);


  setInterval(function () {
/*  		var height = getHeightData()
  		console.log(height)
    */	socket.volatile.emit('spiderDataTwo', createSpiderChartData(5));
	}, 1000);





});


app.get('/', function(req, res){
  res.sendfile('index.html');
});

/*app.get('/gps', function(req, res){

});
*/

http.listen(3000, function(){
  console.log('listening on *:3000');
});

