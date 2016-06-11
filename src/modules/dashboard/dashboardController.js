
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


		that.render = function() {
			that.$el.html(DashboardTemplate);
		}


		that.assignHeaderController = function(headerController) {
			that.headerController = headerController;
		};


		that.launchDashboard = function() {
			that.gridsterController = new GridsterController(numberOfStreams);
			that.gridsterController.render();

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
				that.gridsterController.off();
				that.gridsterController.remove();
				that.headerController.off();
				that.headerController = undefined;
				that.gridsterController = undefined;
				that.trigger('gridsterControllerDestroyed');
			});
		};
		

		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return DashboardController;

});