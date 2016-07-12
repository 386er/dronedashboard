
define(['jquery',
	'backbone',
	'underscore',
	'mustache',
	'text!modules/templates/headerTemplate.html'
], function($,
	Backbone,
	_,
	Mustache,
	HeaderTemplate
	) {


	var HeaderController = function(numberOfStreams) {
		
		var 
			that = {}, my = {};
		
		that.el ='.header';
		that.isLauncherLocked = false;
		that.isDashboard = false;

		
		that.events = {
			'click .launcher-switch-container': 'lockDashboard',
			'click .launcher-switch-container.locked': 'unLockDashboard',
			'click .tab': 'changeInterfaceView',
			'click .dashboard-tab-menu-save': 'saveDashboard',
			'click .header-menu': 'logoutUser'
		};
		

		that.render = function() {
			var html = Mustache.to_html(HeaderTemplate, {'isDashboard': that.isDashboard});
			that.$el.html(html);
		};	

		
		that.toggleSwitch = function() {
			that.$el.find('.launcher-switch').toggleClass('locked')
			that.$el.find('.launcher-switch-container').toggleClass('locked')
			that.$el.find('.launcher-icon').toggleClass('locked')
		};


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


		that.saveDashboard = function() {
			var sign = that.$el.find('.dashboard-tab-menu-save')[0]
			that.trigger('saveDashboard');
			d3.select(sign)
				.transition().duration(100).style('color','orange')
				.transition().duration(100).style('color','white');
		};

		
		that.getCurrentView = function() {
			return that.currentView;
		};


		that.logoutUser = function() {
			that.trigger('logout');
		}


		that.changeInterfaceView = function(event) {

			if( $(event.target).hasClass('selected')) {
				return;
			}

			var tab = $(event.target).data('tab');
			if(tab == 'streams') {
				that.isDashboard = false;
			} else {
				that.isDashboard = true;
			}
			that.$el.find('.tab').removeClass('selected');
			that.$el.find(event.target).addClass('selected');
			that.trigger('tab-change', tab);
		};


		
		that = new (Backbone.View.extend(that))();
		return that;
	};
	
	return HeaderController;
	
});
	
