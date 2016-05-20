
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
		that.isLauncherLocked = false;
		
		that.events = {
			'click .launcher': 'freezeDashboard',
		};
		

		
		that.freezeDashboard = function() {

			if (that.isLauncherLocked === true) {
				return;
			}

			that.trigger('freezeDashboard');
			that.$el.find('.launcher').addClass('locked');
			that.$el.find('.launcher').find('.launcher-label').html('Unlock Dashboard');
			that.$el.find('.launcher').find('.fa').removeClass('fa-lock');
			that.$el.find('.launcher').find('.fa').addClass('fa-unlock')
			that.isLauncherLocked = true;
		};

		
		that = new (Backbone.View.extend(that))();
		return that;
	};
	
	return HeaderController;
	
});
	
