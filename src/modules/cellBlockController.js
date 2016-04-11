
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
					$element = $(element),
					height = $element.height(),
					width = $element.width(),
					color = $element.css('background-color');
				
				var 
					view = new CellBlockView({el: '.' + className})


				view.render();

							
			})

			
		};
		

/* 		that.render =  function() {
			
				
			that.cellBlockView.render();
			console.log(that.cellBlockCollection.models);

			window.setInterval(function(){that.cellBlockView.changeColorOfACell();}, 1);
			window.setInterval(function(){that.cellBlockView.changeColorOfACell();}, 1);
			window.setInterval(function(){that.cellBlockView.changeColorOfACell();}, 1);
			window.setInterval(function(){that.cellBlockView.changeColorOfACell();}, 1);
			window.setInterval(function(){that.cellBlockView.changeBackgroundColor();}, 1500);
			window.setInterval(function(){that.cellBlockView.moveCell('x');}, 50);
			window.setInterval(function(){that.cellBlockView.moveCell('y');}, 50);
		} */
		
		return that;
		
	};

	return CellBlockController;

});