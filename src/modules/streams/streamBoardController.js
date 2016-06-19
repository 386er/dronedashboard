
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
		that.numberOfStreams = that.app.numberOfStreams;
		that.el ='.wrapper';


/*		that.initialize = function() {
		};
*/

		that.assignHeaderController = function(headerController) {
			that.headerController = headerController;
		};


		that.assignCollection = function(collection) {
			that.modelCollection = collection;
		};


		that.render = function() {
			that.$el.html(StreamboardControllerTemplate)
			that.streamListView = new StreamListView(that.numberOfStreams);
			that.streamListView.assignCollection(that.modelCollection);
			that.streamManipulatorView = new StreamManipulatorView();
			that.streamListView.render();
			that.streamManipulatorView.render();
			
			that.streamListView.on('modelAdded', function() {
				that.app.numberOfStreams += 1;
				that.numberOfStreams = that.app.numberOfStreams;
			})
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