
define(['jquery',
	'backbone',
	'underscore',
	'modules/gridsterController',
	'modules/headerController'
], function($,
	Backbone,
	_,
	GridsterController,
	HeaderController
	) {

	var DashboardController = function(numberOfStreams) {

		var that = {};		
		that.gridsterController = new GridsterController(numberOfStreams);


		that.assignHeaderController = function(headerController) {
			that.headerController = headerController;
		}


		that.launchDashboard = function() {

			that.gridsterController.enterWidgets();
			that.gridsterController.bindChartsToWidgets();

			that.headerController.render();
			that.headerController.on('dashboardLocked', function() {
				that.gridsterController.lockCharts();
			});

			that.headerController.on('dashboardUnLocked', function() {
				that.gridsterController.unlockCharts();
				that.gridsterController.clearChartViews();
			});

			that.headerController.on('interFaceChange', function() {
				that.gridsterController.destroy();
				that.gridsterController = undefined;
			});
		};
		

		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return DashboardController;

});