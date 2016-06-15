
define(['jquery',
	'backbone',
	'underscore',
	'modules/dashboard/gridsterController',
	'text!/modules/dashboard/templates/dashboardTemplate.html'
], function($,
	Backbone,
	_,
	GridsterController,
	DashboardTemplate
	) {

	var DashboardController = function(numberOfStreams) {

		var that = {};

		that.el ='.wrapper';
		that.instanceID = 'dashboardController' + Date.now()	


		that.render = function() {
			that.$el.html(DashboardTemplate);
			that.launchDashboard();
		}


		that.assignHeaderController = function(headerController) {
			that.headerController = headerController;
		};


		that.launchDashboard = function() {
			that.gridsterController = new GridsterController(numberOfStreams);
			that.gridsterController.render();

			that.headerController.on('dashboardLocked', function() {
				console.log(that.instanceID);
				that.gridsterController.lockCharts();
			});

			that.headerController.on('dashboardUnLocked', function() {
				that.gridsterController.unlockCharts();
				that.gridsterController.clearChartViews();
			});


			that.headerController.on('saveDashboard', function() {
				var configuration = that.gridsterController.getConfiguration();
				that.headerController.storeDashboardConfiguration(configuration);
				console.log(configuration);
			})

		};


		that.destroy = function() {
			that.gridsterController.destroy();
			that.gridsterController.remove();
			that.headerController.off('dashboardLocked');
			that.headerController.off('dashboardUnLocked');
			that.headerController = undefined;
			that.gridsterController = undefined;			
		};
		

		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return DashboardController;

});