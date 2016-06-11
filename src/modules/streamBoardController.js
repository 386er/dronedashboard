
define(['jquery',
	'backbone',
	'underscore',
	'modules/headerController',
	'text!modules/templates/streamListTemplate.html'
], function($,
	Backbone,
	_,
	HeaderController,
	StreamListTemplate
	) {

	var DashboardController = function(numberOfStreams) {

		var that = {};		

		that.el ='.wrapper';

		that.assignHeaderController = function(headerController) {
			that.headerController = headerController;
		}


/*		that.launchDashboard = function() {

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
				that.gridsterController.off();
				that.headerController.off();
				that.gridsterController = undefined;
				that.trigger('gridsterControllerDestroyed');
			});
		};*/
		


		that.render = function() {
			that.$el.html(StreamListTemplate)
		}



		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return DashboardController;

});