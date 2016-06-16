
define(['jquery',
	'backbone',
	'underscore',
	'modules/headerController',
	'modules/streams/streamListView',
	'modules/streams/streamManipulatorView',
	'text!modules/streams/templates/streamboardControllerTemplate.html'
], function($,
	Backbone,
	_,
	HeaderController,
	StreamListView,
	StreamManipulatorView,
	StreamboardControllerTemplate
	) {

	var StreamboardController = function() {

		var that = {};
		that.app = app || {};
		that.numberOfStreams = app.numberOfStreams;
		that.el ='.wrapper';


		that.assignHeaderController = function(headerController) {
			that.headerController = headerController;
		};


		that.render = function() {
			that.$el.html(StreamboardControllerTemplate)
			that.streamListView = new StreamListView(that.numberOfStreams);
			that.streamManipulatorView = new StreamManipulatorView();
			that.streamListView.render();
			that.streamManipulatorView.render();
		};


		that.destroy = function() {
			that.streamListView.remove();
			that.streamListView = undefined;
			that.headerController = undefined;
		};


		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return StreamboardController;

});