
define(['jquery',
	'backbone',
	'underscore',
	'modules/dashboard/dashboardController',
	'modules/streams/streamboardController',
	'modules/headerController',
	'modules/modelCollection',
	'modules/streamModel',
	'socket',
	'modules/requestController',
	'spin'
], function($,
	Backbone,
	_,
	DashboardController,
	StreamBoardController,
	HeaderController,
	ModelCollection,
	StreamModel,
	io,
	RequestController,
	Spinner
	) {

	var MainController = function() {


		var that = {};
		that.app = app || {};
		that.app.numberOfStreams = 4;
		that.requestController = new RequestController();
		that.headerController = new HeaderController();
		that.modelCollection = new ModelCollection();
		that.currentView = new StreamBoardController();


		that.initialize = function() {
			that.currentView.initLoading();

			that.requestController.on('streamsAvailable', function(data) {
			that.headerController.render();
				that.app.dashboardSegmentation = data[0].segmentation;
				that.app.models = data[0].models;
				that.currentView.stopLoading();
				that.render();
			})

			that.headerController.on('tab-change', function(tab) {
				if (tab === 'streams') {
					that.clearView();
					that.createStreamBoard();
				} else if (tab === 'dashboard') {
					that.clearView();
					that.createDashboard();
				}
			});


			that.headerController.on('logout', function() {
				that.requestController.logoutUser();
			})


			that.requestController.getStreams();
		};


		that.render = function() {
			that.populateCollection();
			that.currentView.assignHeaderController(that.headerController);
			that.currentView.assignCollection(that.modelCollection);
			that.currentView.render();
		};



		that.createStreamBoard = function() {
			that.currentView = new StreamBoardController();
			that.currentView.assignHeaderController(that.headerController);
			that.currentView.assignCollection(that.modelCollection);
			that.currentView.render();
		};


		that.createDashboard = function() {
			that.currentView = new DashboardController();
			that.currentView.assignHeaderController(that.headerController);
			that.currentView.assignCollection(that.modelCollection);
			that.currentView.render();			
			that.headerController.on('saveDashboard', function() {
				that.saveDashboard();
			})
		};


		that.saveDashboard = function() {
			that.currentView.saveDashboard();
			that.requestController.updateStreams(that.app.models, that.app.dashboardSegmentation);

		};



		that.clearView = function() {
			that.currentView.off('configUpdated');
			that.currentView.destroy();
			that.currentView = undefined;
			that.headerController.isLauncherLocked = false;
			that.headerController.render();
		};


		that.populateCollection = function() {
			var models = that.app.models;
			that.modelCollection.add(models);
		};


		that = new (Backbone.View.extend(that))();
		return that;

	};


	return MainController;

});