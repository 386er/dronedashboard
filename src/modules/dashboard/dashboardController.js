
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
		that.dashboardSegmentation = that.app.dashboardSegmentation;


		that.render = function() {
			that.$el.html(DashboardTemplate);
			that.launchDashboard();
		}


		that.assignHeaderController = function(headerController) {
			that.headerController = headerController;
		};


		that.assignCollection = function(collection) {
			that.modelCollection = collection;
		};


		that.saveDashboard = function() {
			var segmentation = that.gridsterController.getSegmentation();
			that.app.dashboardSegmentation = segmentation;
			that.app.models = that.modelCollection.models;
			that.gridsterController.setDashboardSegmentation(segmentation);
			that.trigger('configUpdated');
		};


		that.launchDashboard = function() {
			that.gridsterController = new GridsterController();
			that.gridsterController.assignCollection(that.modelCollection);
			that.gridsterController.setDashboardSegmentation(that.dashboardSegmentation);
			that.gridsterController.render();

			that.headerController.on('dashboardLocked', function() {
				that.gridsterController.lockCharts();
			});

			that.headerController.on('dashboardUnLocked', function() {
				that.gridsterController.unlockCharts();
				that.gridsterController.clearChartViews();
			});

		};


		that.destroy = function() {
			that.saveDashboard();
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