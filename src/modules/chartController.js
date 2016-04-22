
define(['jquery',
	'backbone',
	'underscore',
	'modules/gridsterController',
	'modules/chartView'
], function($,
	Backbone,
	_,
	GridsterController,
	ChartView
	) {

	var ChartController = function(numberOfStreams) {

		var that = {};
		
		that.gridsterController = new GridsterController(numberOfStreams);


		that.initialize = function() {
			that.gridsterController.getNewSelectorBox();
			that.gridsterController.bindBox();
			that.gridsterController.on('gridCreated', function() {
				that.getAllBlocks();
			}, that);
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

	return ChartController;

});