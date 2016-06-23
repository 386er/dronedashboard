
define(['jquery',
	'backbone',
	'underscore'
], function($,
	Backbone,
	_
	) {

	var RequestController = function() {

		var that = {};
		that.app = app || {};

		that.getData = function() {

			$.get('hallo', function(data) {
				console.log(data)
			})


		};

		that = new (Backbone.View.extend(that))();
		return that;

	};

	return RequestController;

});