define(['jquery',
	'backbone',
	'underscore',
	'd3'
], function($,
	Backbone,
	_,
	d3
	) {

	var BarChart = function() {
		

		that = {};

		that.instanceID = 'spiderChart' + Date.now();
		that.n = 150;
		that.CIRCLE_COORDINATES_COUNT = 3600,
		that.margin = {top:10, bottom:10, left:10, right:10};

		that.determineWidthAndHeight = function() {
			var 
				height = that.$el.height(),
				width = that.$el.width();

			that.height = height - that.margin.top - that.margin.bottom;
			that.width = width - that.margin.left - that.margin.right;
		};
		

		that.createSVG = function() {
			that.svg = d3.select(that.el).append('svg')
				.attr('width',that.width)
				.attr('height', that.height);
		};
		

		that.createYScale = function() {
			that.y = d3.scale.linear()
				.domain([0, 1])
				.range([0, that.height]);	
		};		


		that.createXScale = function() {
			that.x = d3.scale.ordinal()
				.domain(_.range(that.n))
				.rangePoints([0, that.width]);	
		};


		that.determinBarWidth = function() {
			that.barWidth = that.width/that.n;
		};

		that.getRandomData = function(n) {
			var randomData = [];
			for (var i=0; i<that.n; i++) {
				randomData.push(Math.random())
			}
			return randomData;
		};


		that.renderBars = function() {
			var data = that.getRandomData();

			that.svg.selectAll('rect')
				.data(data)
				.enter()
				.append('rect')
				.attr('x', function(d,i) {return that.x(i)})
				.attr('y', function(d) {return that.height - that.y(d)})
				.attr('height', function(d) {return that.y(d)})
				.attr('width', that.barWidth);


		}



		that.render = function() {
			that.determineWidthAndHeight();
			that.determinBarWidth();
			that.createSVG();
			that.createXScale();
			that.createYScale();
			that.renderBars();
					
		};


		that.assignElement = function(el) {
			that.setElement(el);
		}






			
		that = new (Backbone.View.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
	};
	


	return BarChart;

});