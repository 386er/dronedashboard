
define(['jquery',
	'backbone',
	'underscore',
	'mustache',
	'text!modules/templates/launcherTemplate.html'
], function($,
	Backbone,
	_,
	Mustache,
	LauncherTemplate
	) {


	var HeaderController = function(numberOfStreams) {
		
		var 
			that = {}, my = {};
		
		that.el ='.header';
		that.isLauncherLocked = false;

		
		that.events = {
			'click .launcher': 'lockDashboard',
			'click .launcher.locked': 'unLockDashboard'
		};
		

		that.render = function() {

			var currentState = {'isLocked': that.isLauncherLocked};
			var html = Mustache.to_html(LauncherTemplate, currentState);
			that.$el.find('.launcher-container').html(html);
		}

		
		that.lockDashboard = function() {

			if (that.isLauncherLocked === true) {
				return;
			}
			that.trigger('dashboardLocked');
			that.isLauncherLocked = true;
			that.render();
		};

		that.unLockDashboard = function() {

			if (that.isLauncherLocked === false) {
				return;
			}
			that.trigger('dashboardUnLocked');
			that.isLauncherLocked = false;
			that.render();
		};

		
		that = new (Backbone.View.extend(that))();
		return that;
	};
	
	return HeaderController;
	
});
	
