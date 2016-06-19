
define(['jquery',
	'backbone',
	'underscore',
	'modules/dashboard/dashboardController',
	'modules/streams/streamboardController',
	'modules/headerController',
	'modules/modelCollection',
	'modules/streamModel',
	'socket'
], function($,
	Backbone,
	_,
	DashboardController,
	StreamBoardController,
	HeaderController,
	ModelCollection,
	StreamModel,
	io
	) {

	var MainController = function() {


		that = {};
		that.app = app || {};
		that.app.numberOfStreams = 4;
		that.headerController = new HeaderController();
		that.modelCollection = new ModelCollection();
		that.currentView = new StreamBoardController();



		that.initialize = function() {

			that.headerController.render();
			that.populateCollection();
			that.currentView.assignHeaderController(that.headerController);
			that.currentView.assignCollection(that.modelCollection);
			that.currentView.render();

			that.headerController.on('tab-change', function(tab) {

				if (tab === 'streams') {
					that.clearView();
					that.createStreamBoard();
				} else if (tab === 'dashboard') {
					that.clearView();
					that.createDashboard();
				}
			});
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
		};


		that.clearView = function() {
			that.currentView.destroy();
			that.currentView = undefined;
			that.headerController.isLauncherLocked = false;
			that.headerController.render();
		};


		that.populateCollection = function() {

			var streams = _.range(1, that.app.numberOfStreams + 1);

			streams.forEach( function(i) {
					var streamModel = new StreamModel({
						'id': i,
						'label': i,
						'name': 'Stream ' +  i,
						'connectionEstablished': true,
					});
					that.modelCollection.add(streamModel);
			});
		};




		that = new (Backbone.View.extend(that))();
		return that;

	};


	return MainController;

});