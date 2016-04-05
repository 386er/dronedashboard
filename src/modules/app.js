
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
			var gridController = new GridController();
						
		}
	};

	return app;

});