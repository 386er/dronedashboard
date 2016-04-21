
define(['jquery',
	'backbone',
	'underscore',
	'modules/gridCreator',
	'modules/CellBlockView'
], function($,
	Backbone,
	_,
	CellBlockController,
	GridCreator,
	CellBlockView
	) {

	var ChartController = function(numberOfStreams) {

		var that = {};

		that.initialize = function() {
		
			that.gridCreator = new GridCreator(numberOfStreams);
			that.gridCreator.getNewSelectorBox();
			that.cellBlockController = new CellBlockController();
			that.gridCreator.on('gridCreated', function() {
				that.getAllBlocks();
			}, that);
			
		};
		


		that.createView = function(element) { 

			var
					className = element.classList[0],
					view = new CellBlockView({el: '.' + className})
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