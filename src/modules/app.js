
define(['jquery',
	'backbone',
	'underscore',
	'modules/gridController',
	'socket'
], function($,
	Backbone,
	_,
	GridController,
	io
	) {

	var app = {

		init : function() {

			var socket = io();
			socket.on('init', function(numberOfStreams){
				console.log('Number of sockets available:',numberOfStreams);
				var gridController = new GridController(numberOfStreams);
			})
			socket.on('spiderData', function(data){
				console.log(data);						
			})			
		}
	};

	return app;

});