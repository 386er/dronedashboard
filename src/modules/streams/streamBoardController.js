
define(['jquery',
	'backbone',
	'underscore',
	'modules/headerController',
	'modules/streams/streamListView',
	'text!modules/streams/templates/streamboardControllerTemplate.html'
], function($,
	Backbone,
	_,
	HeaderController,
	StreamListView,
	StreamboardControllerTemplate
	) {

	var StreamboardController = function(numberOfStreams) {

		var that = {};		

		that.el ='.wrapper';




		that.assignHeaderController = function(headerController) {
			that.headerController = headerController;
		}


		that.render = function() {
			that.$el.html(StreamboardControllerTemplate)
			that.streamListView = new StreamListView();
			that.streamListView.render();
		}



		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return StreamboardController;

});