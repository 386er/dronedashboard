
define(['jquery',
	'backbone',
	'underscore',
	'modules/dashboard/dashboardController',
	'modules/streams/streamboardController',
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
		that.dashboardController = new DashboardController(4);


		that.initialize = function() {
			that.dashboardController.assignHeaderController(that.headerController);
			that.dashboardController.render();
			that.dashboardController.launchDashboard();			

			that.dashboardController.on('gridsterControllerDestroyed', function() {	
				that.dashboardController.off();
				that.dashboardController = undefined;
				that.createStreamBoard();
			});




		};


		that.createStreamBoard = function() {
			that.streamBoardController = new StreamBoardController(4);
			that.streamBoardController.assignHeaderController(that.headerController);
			that.streamBoardController.render();

			that.streamBoardController.on('streamBoardMenuDestroyed', function() {
				that.streamBoardController.off();
				that.streamBoardController.remove();
				that.streamboardController = undefined;
				that.createDashboard();
			})

		};


		that.createDashboard = function() {
			that.dashboardController = new DashboardController(4);
			that.dashboardController.assignHeaderController(that.headerController);
			that.dashboardController.launchDashboard();			

			that.dashboardController.on('gridsterControllerDestroyed', function() {	
				that.dashboardController.off();
/*				that.dashboardController.remove();*/
				that.dashboardController = undefined;
				that.createStreamBoard();
			});

		};




		that = new (Backbone.View.extend(that))();
		return that;

	};


	return MainController;

});