
define(['jquery',
	'backbone',
	'underscore',
	'modules/dashboardController',
	'modules/headerController',
	'socket'
], function($,
	Backbone,
	_,
	DashboardController,
	HeaderController,
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
			var headerController = new HeaderController();

			dashboardController.assignHeaderController(headerController);
			dashboardController.launchDashboard();

			headerController.on('interFaceChange', function(arguments) {
				console.log(arguments[0]);
				console.log(arguments[1]);
			})
		}
	};

	return app;

});