
define(['jquery',
	'backbone',
	'underscore',
	'd3',
	'modules/cellBlockView',
	'modules/cellBlockCollection'
], function($,
	Backbone,
	_,
	d3,
	CellBlockView,
	CellBlockCollection
	) {

	var CellBlockController = function() {

		var that = {};
		
		
		that.initialize = function() {
		
		};
		
		
		that.getAllBlocks = function() {
			

			var blocks = $('.gs-w');
			
			blocks.each(function(i, element) {
				var
					className = element.classList[0],
					view = new CellBlockView({el: '.' + className})
				view.render();
			})
		};
		

		
		return that;
		
	};

	return CellBlockController;

});