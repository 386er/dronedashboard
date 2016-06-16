
define(['jquery',
	'backbone',
	'underscore',
	'modules/mainController',
	'socket'
], function($,
	Backbone,
	_,
	MainController,
	io
	) {

	var app = {

		init : function() {

			window.app = {};
			var mainController = new MainController();
			
		}



	};

	return app;

});