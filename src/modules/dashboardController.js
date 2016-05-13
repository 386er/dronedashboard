
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
			that.gridsterController.bindBox();
			that.gridsterController.on('gridCreated', function() {
				that.getAllBlocks();
			}, that);

			that.headerController.on('freezeDashboard', function() {
				that.gridsterController.freezeBlocks();
			});
		};		
		
		
		that.getAllBlocks = function() {
			
			var blocks = $('.gs-w');

			blocks.each(function(i, element) { 
				that.gridsterController.createView(element);
			})
		};
		


		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return DashboardController;

});