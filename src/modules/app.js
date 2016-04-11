
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
			socket.on('init', function(data){
				console.log('Number of sockets available:',data);
				var gridController = new GridController(data);
			})
			socket.on('spiderData', function(data){
				console.log(data);						
			})			
		}
	};

	return app;

});