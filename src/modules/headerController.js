
define(['jquery',
	'backbone',
	'underscore',
	'mustache'
], function($,
	Backbone,
	_,
	Mustache
	) {


	var HeaderController = function(numberOfStreams) {
		
		var 
			that = {}, my = {};
		
		that.el ='.header';

		
		that.events = {
			'click .launcher': 'freezeDashboard',
		};
		
		
		that.freezeDashboard = function() {
			that.trigger('freezeDashboard');
			that.$el.find('.launcher').addClass('locked')
		};

		
		that = new (Backbone.View.extend(that))();
		return that;
	};
	
	return HeaderController;
	
});
	
