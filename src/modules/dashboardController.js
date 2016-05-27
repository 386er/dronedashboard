
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
		that.headerController = new HeaderController();


		that.initialize = function() {
			that.gridsterController.enterWidgets();
			that.gridsterController.on('gridCreated', function() {
				that.bindChartsToWidget();
			}, that);

			that.headerController.render();
			that.headerController.on('dashboardLocked', function() {
				that.gridsterController.lockCharts();
			});
		};		
		
		
		that.bindChartsToWidget = function() {
			
			var charts = $('.gs-w');

			charts.each(function(i, element) { 
				that.gridsterController.createChartView(element);
			})
		};
		


		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return DashboardController;

});