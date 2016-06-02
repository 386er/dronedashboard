
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
			'click .launcher-switch-container': 'lockDashboard',
			'click .launcher-switch-container.locked': 'unLockDashboard'
		};
		

		that.render = function() {

/*			var currentState = {'isLocked': that.isLauncherLocked};*/
			var html = Mustache.to_html(LauncherTemplate);
			that.$el.find('.launcher-container').html(html);
		}			

		
		that.toggleSwitch = function() {
			that.$el.find('.launcher-switch').toggleClass('locked')
			that.$el.find('.launcher-switch-container').toggleClass('locked')
			that.$el.find('.launcher-icon').toggleClass('locked')
		}


		that.lockDashboard = function() {

			if (that.isLauncherLocked === true) {
				return;
			}
			that.trigger('dashboardLocked');
			that.isLauncherLocked = true;
			that.toggleSwitch();
		};

		that.unLockDashboard = function() {

			if (that.isLauncherLocked === false) {
				return;
			}
			that.trigger('dashboardUnLocked');
			that.isLauncherLocked = false;
			that.toggleSwitch();
		};

		
		that = new (Backbone.View.extend(that))();
		return that;
	};
	
	return HeaderController;
	
});
	
