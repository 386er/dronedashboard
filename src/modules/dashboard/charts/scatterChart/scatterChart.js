define(['jquery',
	'backbone',
	'underscore',
	'd3'
], function($,
	Backbone,
	_,
	d3
	) {

	var ScatterChart = function() {
		

		var that = {};

		that.instanceID = 'scatterChart' + Date.now()
		that.data = [];
		that.margin = {top:20, bottom:30, left:15, right:10};
		that.counter = 0;
		that.mean = {};


		that.determineWidthAndHeight = function() {
			var 
				height = that.$el.height(),
				width = that.$el.width();

			that.height = height - that.margin.top - that.margin.bottom;
			that.width = width - that.margin.left - that.margin.right;
		};


		that.getRandomArbitrary = function(min, max) {
 		   return Math.random() * (max - min) + min;
		};
		

		that.createSVG = function() {
			that.svg = d3.select(that.el).append('svg')
				.attr('class', that.instanceID)
				.attr('width', that.width + that.margin.left + that.margin.right)
				.attr('height', that.height + that.margin.top + that.margin.bottom)
				.append("g")
				.attr("transform", "translate(" + that.margin.left + "," + that.margin.top + ")");
		};
		

		that.createYScale = function() {
			that.y = d3.scale.linear()
				.domain([-1, 1])
				.range([that.height, 0]);	
		};		


		that.createXScale = function() {
			that.x = d3.scale.linear()
				.domain([-1, 1])
				.range([0, that.width]);	
		};		



		that.createScales = function() {
			that.createXScale();
			that.createYScale();
		};


		that.createXAxis = function() {
			that.axisX = that.svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + that.height/2 + ")")
				.call(d3.svg.axis().scale(that.x).orient("bottom"));
		};

		that.createYAxis = function() {
			that.axisX = that.svg.append("g")
				.attr("class", "y axis")
				.attr("transform", "translate(" + that.width/2 +", 0)")
				.call(d3.svg.axis().scale(that.y).orient("left"));
		};


		that.createAxes = function() {
			that.createXAxis();
			that.createYAxis();
		};

		that.createRandomDistribution = function() {

			that.meanX = that.getRandomArbitrary(-0.5,0.5),
			that.meanY = that.getRandomArbitrary(-0.5,0.5),
			that.sdX = that.getRandomArbitrary(0.1,0.6),
			that.sdY = that.getRandomArbitrary(0.1,0.6);

			that.randomX = d3.random.normal(that.meanX, that.sdX);
			that.randomY = d3.random.normal(that.meanY, that.sdY);	
		};


		that.renderGrid = function() {

			var data = _.range(-1,1.1, 0.1)

			that.svg.selectAll('placeholder')
				.data(data)
				.enter()
				.append('line')
				.attr('x1', function(d) { return that.x(d)})
				.attr('x2', function(d) { return that.x(d)})
				.attr('y1', function(d) { return that.y(-1)})
				.attr('y2', function(d) { return that.y(1)})
				.attr('stroke', 'gray')
				.attr('stroke-width', 0.5);

			that.svg.selectAll('placeholder')
				.data(data)
				.enter()
				.append('line')
				.attr('y1', function(d) { return that.y(d)})
				.attr('y2', function(d) { return that.y(d)})
				.attr('x1', function(d) { return that.x(-1)})
				.attr('x2', function(d) { return that.x(1)})
				.attr('stroke', 'gray')
				.attr('stroke-width', 0.5);	
		};



		that.appendDataPoint = function() {

			var dataPoint = {'x': that.randomX(), 'y':that.randomY()};
			that.data.push(dataPoint);

			that.svg.selectAll('circle')
				.data(that.data)
				.enter()
				.append('circle')
				.attr('cx', function(d) { return that.x(d.x)})
				.attr('cy', function(d) { return that.y(d.y)})
				.attr('r', 2)
				.style('opacity',0)
				.transition()
				.duration(400)
				.style('opacity', 1)
		};


		that.animateChart = function() {
			that.animation = setInterval(function() {
				that.appendDataPoint();	
			},500);
		};


		that.render = function() {
			that.determineWidthAndHeight();
			that.createSVG();
			that.createScales();
			that.createAxes();
			that.renderGrid();
			that.createRandomDistribution()
			that.animateChart();
		};


		that.assignElement = function(el) {
			that.setElement(el);
		};

	
		that.destroy = function() {
			clearInterval(that.animation);
			that.animation = undefined;
			that.svg.selectAll('*').remove();
			that.$el.html('')
			that.$el.off();
		};


		that = new (Backbone.View.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
	};
	


	return ScatterChart;

});