define(['jquery',
	'backbone',
	'underscore',
	'd3'
], function($,
	Backbone,
	_,
	d3
	) {

	var TimeSeriesChart = function() {
		
		var that = {};

		that.instanceID = 'timeSeriesChart' + Date.now();
		that.edges = 15;
		that.CIRCLE_COORDINATES_COUNT = 3600,
		that.n = 80;
		that.duration = 500;
		that.random = d3.random.normal(0, 5);		
		that.data = d3.range(that.n).map(function(i) {return that.random()});
		that.dataMin = Math.floor(d3.min(that.data));
		that.dataMax = Math.ceil(d3.max(that.data));
		that.currentHeight = 0;
		that.margin = {top: 10, right: 20, bottom: 10, left: 40};
		that.now = new Date(Date.now() - that.duration);
		that.interruptTransition = false;


		that.assignElement = function(el) {
			that.setElement(el);
		}

		that.determineWidthAndHeight = function() {
			that.width = that.$el.width() - that.margin.left - that.margin.right;
			that.height = that.$el.height() - that.margin.top - that.margin.bottom;
		};


		that.createXScale = function() {
			that.xLine = d3.scale.linear()
				.domain([0, that.n - 1])
				.range([0, that.width]);	

			that.x = d3.time.scale()
				.domain([that.now - (that.n - 2) * that.duration, that.now - that.duration])
				.range([0, that.width]);
		};


		that.updateDomains = function() {
			that.dataMin = Math.floor(d3.min(that.data));
			that.dataMax = Math.ceil(d3.max(that.data));
			that.now = new Date();
			that.x.domain([that.now - (that.n - 2) * that.duration, that.now - that.duration]);
			that.y.domain([that.dataMin, that.dataMax]);
		};


		that.updateAxes = function() {
			that.axisX.attr("transform", "translate(0," + that.y(0) + ")")
			that.axisX.call(that.x.axis);
			that.axisY.call(that.y.axis);		
		};


		that.createYScale = function() {
			that.y = d3.scale.linear()
				.domain([that.dataMin, that.dataMax])
				.range([that.height, 0]);	
		};


		that.crateScales = function() {
			that.createYScale();
			that.createXScale();
		}


		that.createSVG = function() {
			that.svg = d3.select(that.el).append("svg").attr('class','svg')
				.attr("width", that.width + that.margin.left + that.margin.right)
				.attr("height", that.height + that.margin.top + that.margin.bottom)
				.append("g")
				.attr("transform", "translate(" + that.margin.left + "," + that.margin.top + ")");
		};


		that.createLine = function() {
			that.line = d3.svg.line()
				.x(function(d, i) { return that.xLine(i); })
				.y(function(d, i) { return that.y(d); }) 
		};


		that.createXAxis = function() {
			that.axisX = that.svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + that.y(0) + ")")
				.call(that.x.axis = d3.svg.axis().scale(that.x).orient("bottom")
				.ticks(15)
				.tickFormat(d3.time.format("%H:%M:%S")));
			};


		that.createYAxis = function() {
			that.axisY = that.svg.append("g")
				.attr("class", "y axis")
				.call(that.y.axis = d3.svg.axis().scale(that.y).orient("left"));
		};


		that.appendAxis = function() {
			that.createXAxis();
			that.createYAxis();	
		};


		that.applyPathMagic = function() {
			that.svg.append("defs").append("clipPath")
				.attr("id", "clip")
				.append("rect")
				.attr("width", that.width)
				.attr("height", that.height);
			that.path = that.svg.append("g")
				.attr("clip-path", "url(#clip)")
				.append("path")
				.datum(that.data)
				.attr("class", "line")
				.attr("d", that.line);	
		};


		that.render = function() {
			that.determineWidthAndHeight();
			that.crateScales();
			that.createSVG();
			that.createLine();
			that.appendAxis();
			that.applyPathMagic();
			that.tick();
		};


		that.transition = d3.select({}).transition()
			.duration(that.duration)
			.ease("linear");



		that.tick = function() {

			if (that.interruptTransition == true) {
				that.transition = undefined;
				return;
			}

			that.transition = that.transition.each(function() {

				that.data.push(that.random());
				that.path.attr("d", that.line)
					.attr("transform", null)
					.transition()
					.ease('linear')
					.duration(that.duration)
					.attr("transform", "translate(" + that.xLine(-1) + ",0)")

				that.svg.select(".line")
					.attr("d", that.line)
					.attr("transform", null);

				that.updateDomains();
				that.updateAxes();


				that.data.shift();
			}).transition().each("start", that.tick);

		};


		that.destroy = function() {
			that.interruptTransition = true;
			that.svg.selectAll('*').remove();
			that.$el.html('')
			that.$el.off();
		};


			
		that = new (Backbone.View.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
	};
	


	return TimeSeriesChart;

});