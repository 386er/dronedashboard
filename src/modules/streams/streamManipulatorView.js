
define(['jquery',
	'backbone',
	'underscore',
	'mustache',
	'modules/headerController',
	'text!modules/streams/templates/streamManipulationTemplate.html'
], function($,
	Backbone,
	_,
	Mustache,
	HeaderController,
	StreamManipulationTemplate
	) {

	var StreamManipulatorView = function() {

		var that = {};
		that.el ='.stream-manipulation';
		that.model = {};

		that.assignModel = function(model) {
			that.model = model;
		};


		that.render = function() {
			var html = Mustache.to_html(StreamManipulationTemplate, that.model.toJSON());
			that.$el.html(html);
		};



		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return StreamManipulatorView;

});