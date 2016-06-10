
define(['jquery',
	'backbone',
	'underscore',
	'modules/dashboardController',
	'modules/headerController',
	'modules/mainController',
	'socket'
], function($,
	Backbone,
	_,
	DashboardController,
	HeaderController,
	MainController,
	io
	) {

	var app = {

		init : function() {
		
			var mainController = new MainController();

		}



	};

	return app;

});