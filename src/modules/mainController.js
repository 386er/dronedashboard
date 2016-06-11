
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
		that.headerController = new HeaderController();
		that.currentView = new DashboardController(4);
		that.currentView.assignHeaderController(that.headerController);



		that.initialize = function() {

			that.headerController.render();
			that.currentView.render();

			that.headerController.on('tab-change', function(tab) {

				if (tab === 'streams') {
					that.currentView.destroy();
					that.currentView = undefined;
					that.createStreamBoard();
				} else if (tab === 'dashboard') {
					that.currentView.destroy();
					that.currentView = undefined;
					that.createDashboard();
				}
			});
		};


		that.createStreamBoard = function() {
			that.currentView = new StreamBoardController(4);
			that.currentView.assignHeaderController(that.headerController);
			that.currentView.render();
		};


		that.createDashboard = function() {
			that.currentView = new DashboardController(4);
			that.currentView.assignHeaderController(that.headerController);
			that.currentView.render();			
		};


		that = new (Backbone.View.extend(that))();
		return that;

	};


	return MainController;

});