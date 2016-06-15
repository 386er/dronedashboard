
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
		that.numberOfStreams = 4;
		that.headerController = new HeaderController();
		that.currentView = new DashboardController(that.numberOfStreams);
		that.currentView.assignHeaderController(that.headerController);



		that.initialize = function() {

			that.headerController.render();
			that.currentView.render();

			that.headerController.on('tab-change', function(tab) {

				if (tab === 'streams') {
					that.currentView.destroy();
					that.currentView = undefined;
					that.createStreamBoard();
					that.headerController.render();
				} else if (tab === 'dashboard') {
					that.currentView.destroy();
					that.currentView = undefined;
					that.createDashboard();
					that.headerController.render();
					that.headerController.isLauncherLocked = false;
				}
			});
		};


		that.createStreamBoard = function() {
			that.currentView = new StreamBoardController(that.numberOfStreams);
			that.currentView.assignHeaderController(that.headerController);
			that.currentView.render();
		};


		that.createDashboard = function() {
			that.currentView = new DashboardController(that.numberOfStreams);
			that.currentView.assignHeaderController(that.headerController);
			that.currentView.render();			
		};


		that = new (Backbone.View.extend(that))();
		return that;

	};


	return MainController;

});