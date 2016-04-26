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

		that.instanceID = 'barChart' + Date.now();
		that.n = 30;
		that.margin = {top:10, bottom:20, left:15, right:10};


		that.determineWidthAndHeight = function() {
			var 
				height = that.$el.height(),
				width = that.$el.width();

			that.height = height - that.margin.top - that.margin.bottom;
			that.width = width - that.margin.left - that.margin.right;
		};
		

		that.createSVG = function() {
			that.svg = d3.select(that.el).append('svg')
				.attr('width', that.width + that.margin.left + that.margin.right)
				.attr('height', that.height + that.margin.top + that.margin.bottom);
		};
		

		that.createYScale = function() {
			that.y = d3.scale.linear()
				.domain([0, 1])
				.range([that.height - that.margin.top - that.margin.bottom, 0]);	
		};		


		that.createXScale = function() {
			that.x = d3.scale.ordinal()
				.domain(_.range(that.n))
				.rangeRoundBands([that.margin.left, that.width - that.margin.right]);	
		};


		that.createScales = function() {
			that.createXScale();
			that.createYScale();
		};


		that.createXAxis = function() {
			that.axisX = that.svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + that.height + ")")
				.call(d3.svg.axis().scale(that.x).orient("bottom"));
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
				.attr('class','bar')
				.attr('fill','steelblue')
				.attr('stroke', 'black')
				.attr('x', function(d,i) {return that.x(i)})
				.attr('y', function(d) {return that.height - that.y(d)})
				.attr('height', function(d) {return that.y(d)})
				.attr('width', that.barWidth);
		};



		that.render = function() {
			that.determineWidthAndHeight();
			that.determinBarWidth();
			that.createSVG();
			that.createScales();
			that.createXAxis();
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