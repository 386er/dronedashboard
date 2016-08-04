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

		that.instanceID = 'histogramChart' + Date.now()
		that.margin = {top:20, bottom:30, left:25, right:10};
		that.random = d3.random.normal(0, 2.5);
		that.n = 1800;
		that.data = d3.range(that.n).map(function(i) {return that.random()});


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
		


		that.getGranulation = function() {

			var
				min = d3.min(that.data),
				max = d3.max(that.data),
				granulation = _.range(min, max, 0.1);
				granulation = granulation.map(function(tick) {
					return parseFloat(d3.format(".1f")(tick));
				});

			return granulation;
		};


		that.getDistributionData = function() {
			var granulation = that.getGranulation();
			var distribution = [];
			var distributionObject = {};
			var adjustedData = that.data.map(function(date) {
					return parseFloat(d3.format(".1f")(date));
				});
			for (var i = 0; i < granulation.length; i++) {
				var key = granulation[i];
				distributionObject[key] = 0;
			}



			for (var i = 0; i < adjustedData.length; i++) {
				var key = adjustedData[i];
				distributionObject[key] += 1;
			}

			for (var i = 0; i < _.keys(distributionObject).length; i++) {
				var key = _.keys(distributionObject)[i];
				var value = distributionObject[key];
				if (value == NaN || value == "NaN") {
					console.log(value)
				} else {
					distribution.push({"key":key,"value":value});
				}
			}

			return distribution;
		}

		that.createYScale = function() {
			var data = that.getDistributionData();
			var max = Math.max.apply(Math,data.map(function(o){return o.value;}))
			console.log(data)
			console.log(max)

			that.y = d3.scale.linear()
				.domain([0, 35])
				.range([that.height, 0]);	
		};		


		that.createXScale = function() {

			var granulation = that.getGranulation();

			console.log(granulation);

			that.x = d3.scale.linear()
				.domain([d3.min(granulation),d3.max(granulation)])
				.range([0, that.width]);	
		};


		that.createScales = function() {
			that.createXScale();
			that.createYScale();
		};


		that.createXAxis = function() {
			that.axisX = that.svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + that.height + ")")
				.call(d3.svg.axis().scale(that.x).orient("bottom").ticks(15));
			};


		that.createYAxis = function() {
			that.axisY = that.svg.append("g")
				.attr("class", "y axis")
				.call(d3.svg.axis().scale(that.y).orient("left").ticks(5));
			};	


		that.getRandomData = function(n) {
			var randomData = [];
			for (var i=0; i<that.n; i++) {
				randomData.push({'value': Math.random(), 'index': Math.random() })
			}
			return randomData;
		};


		that.renderBars = function() {
			that.data = that.getDistributionData();

			that.rect = that.svg.selectAll('rect')
				.data(that.data);

			that.rect.enter()
				.append('rect')
				.filter(function(d) { return d.value !== NaN })
				.attr('class','bar')
				.attr('fill','steelblue')
				.attr('x', function(d,i) {return that.x(d.key)})
				.attr('y', function(d) {return that.y(d.value)})
				.attr('height', function(d) {return that.height -  that.y(d.value)})
				.attr('width', 0)
				.transition().delay(function(d,i) {return i })
				.attr('width', 1);
		};



		that.render = function() {
			that.determineWidthAndHeight();
			that.createSVG();
			that.createScales();
			that.createXAxis();
			that.createYAxis();
			that.renderBars();
		};




		that.assignElement = function(el) {
			that.setElement(el);
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