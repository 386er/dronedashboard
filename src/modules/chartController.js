
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

		that.initialize = function() {
		
			that.gridsterController = new GridsterController(numberOfStreams);
			that.gridsterController.getNewSelectorBox();
			that.gridsterController.on('gridCreated', function() {
				that.getAllBlocks();
			}, that);
			
		};		


		that.createView = function(element) { 

			var
					className = element.classList[0],
					view = new ChartView({el: '.' + className})
				view.render();
			};
		
		
		that.getAllBlocks = function() {
			
			var blocks = $('.gs-w');

			blocks.each(function(i, element) { 
				that.createView(element);
			})
		};
		


		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return ChartController;

});