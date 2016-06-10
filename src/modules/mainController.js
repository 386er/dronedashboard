
define(['jquery',
	'backbone',
	'underscore',
	'modules/dashboardController',
	'modules/streamboardController',
	'modules/headerController',
	'socket'
], function($,
	Backbone,
	_,
	DashboardController,
	StreamBoardController,
	HeaderController,
	io
	) {

	var MainController = function() {


		that = {};

		that.currentMenu = 'dashboard';
		that.headerController = new HeaderController();
		that.dashboardController = new DashboardController(9);


		that.initialize = function() {
			that.dashboardController.assignHeaderController(that.headerController);
			that.dashboardController.launchDashboard();			

			that.dashboardController.on('gridsterControllerDestroyed', function() {	
				that.dashboardController.off();
				that.dashboardController.remove();
				that.dashboardController = undefined;
				that.createStreamBoard();
			});

		};


		that.createStreamBoard = function() {
			that.streamBoardController = new StreamBoardController();
			that.streamBoardController.assignHeaderController(that.headerController);
			that.streamBoardController.render();
		}




		that = new (Backbone.View.extend(that))();
		return that;

	};


	return MainController;

});