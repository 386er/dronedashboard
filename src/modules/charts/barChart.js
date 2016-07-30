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
		

		var that = {};

		that.instanceID = 'barChart' + Date.now()
		that.n = 25;
		that.margin = {top:20, bottom:30, left:15, right:10};


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
				.attr('height', that.height + that.margin.top + that.margin.bottom)
				.append("g")
				.attr("transform", "translate(" + that.margin.left + "," + that.margin.top + ")");
		};
		

		that.createYScale = function() {
			that.y = d3.scale.linear()
				.domain([0, 1])
				.range([that.height, 0]);	
		};		


		that.createXScale = function() {
			that.x = d3.scale.ordinal()
				.domain(_.range(that.n))
				.rangeRoundBands([0, that.width], 0.3);	
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


		that.getRandomData = function(n) {
			var randomData = [];
			for (var i=0; i<that.n; i++) {
				randomData.push({'value': Math.random(), 'index': Math.random() })
			}
			return randomData;
		};


		that.renderBars = function() {
			that.data = that.getRandomData();

			that.rect = that.svg.selectAll('rect')
				.data(that.data, function(d) {return d.index});

			that.rect.enter()
				.append('rect')
				.attr('class','bar')
				.attr('fill','steelblue')
				.attr('stroke', '#E6E6E6')
				.attr('x', function(d,i) {return that.x(i)})
				.attr('y', function(d) {return that.height - that.y(d.value)})
				.attr('height', function(d) {return that.y(d.value)})
				.attr('width', that.x.rangeBand());


		};



		that.render = function() {
			that.determineWidthAndHeight();
			that.createSVG();
			that.createScales();
			that.createXAxis();
			that.renderBars();
			that.animateChart();
		};



		that.moveBarChart = function() {

			that.data.shift();
					that.data.push({'value': Math.random(), 'index': Math.random()})
			that.rect = that.svg.selectAll('rect')
				.data(that.data, function(d) {return d.index});

			that.rect.exit()
				.transition()
				.duration(600)
				.style('opacity', 0)
				.each('end', function() {

					that.rect.exit().remove();

					that.rect
						.transition()
						.duration(600)
						.attr('x', function(d,i) {return that.x(i)})

					that.rect = that.svg.selectAll('rect')
							.data(that.data, function(d) {return d.index});


					that.rect.enter()
						.append('rect')
						.attr('class','bar')
						.attr('fill','steelblue')
						.attr('stroke', '#E6E6E6')
						.attr('x', function(d,i) {return that.x(i)})
						.attr('y', function(d) {return that.height - that.y(d.value)})
						.attr('height', function(d) {return that.y(d.value)})
						.attr('width', that.x.rangeBand())
						.style('opacity', 0)
						.transition()
						.delay(600)
						.duration(600)
						.style('opacity', 1)

				});
		};


		that.assignElement = function(el) {
			that.setElement(el);
		};


		that.animateChart = function() {
			that.animation = setInterval(function() {
				that.moveBarChart();
			},1900)
		};


		that.destroy = function() {
			clearInterval(that.animation);
			that.animation = undefined;
			that.svg.selectAll('*').remove();
			that.$el.html('');
			that.$el.off();
		};



			
		that = new (Backbone.View.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
	};
	


	return BarChart;

});