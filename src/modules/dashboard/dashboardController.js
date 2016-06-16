
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

	var DashboardController = function() {

		var that = {};

		that.el ='.wrapper';
		that.instanceID = 'dashboardController' + Date.now();
		that.app = app || {};
		that.numberOfStreams = app.numberOfStreams;
		that.dashboardSegmentation = app.dashboardSegmentation;


		that.render = function() {
			that.$el.html(DashboardTemplate);
			that.launchDashboard();
		}


		that.assignHeaderController = function(headerController) {
			that.headerController = headerController;
		};


		that.launchDashboard = function() {
			that.gridsterController = new GridsterController(that.numberOfStreams);
			that.gridsterController.setDashboardSegmentation(that.dashboardSegmentation);
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
				var segmentation = that.gridsterController.getSegmentation();
				that.app.dashboardSegmentation = segmentation;

			})

		};


		that.destroy = function() {
			that.gridsterController.destroy();
			that.gridsterController.remove();
			that.headerController.off('dashboardLocked');
			that.headerController.off('dashboardUnLocked');
			that.headerController.off('saveDashboard');
			that.headerController = undefined;
			that.gridsterController = undefined;			
		};
		

		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return DashboardController;

});