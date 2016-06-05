
define(['jquery',
	'backbone',
	'underscore',
	'modules/dashboardController',
	'socket'
], function($,
	Backbone,
	_,
	DashboardController,
	io
	) {

	var app = {

		init : function() {

/*			var socket = io();
			socket.on('init', function(numberOfStreams){
				console.log('Number of sockets available:',numberOfStreams);
			})
			socket.on('spiderData', function(data){
				console.log(data);						
			})*/			
			var dashboardController = new DashboardController(9);
		}
	};

	return app;

});