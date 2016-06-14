
define(['jquery',
	'backbone',
	'underscore',
	'modules/headerController',
/*	'modules/streams/streamListViewCollection',*/
	'text!modules/streams/templates/streamManipulationTemplate.html'
], function($,
	Backbone,
	_,
	HeaderController,
	StreamManipulationTemplate
	) {

	var StreamManipulatorView = function(numberOfStreams) {

		var that = {};
		that.el ='.stream-manipulation';


		that.render = function() {
			that.$el.html(StreamManipulationTemplate)
		}



		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return StreamManipulatorView;

});