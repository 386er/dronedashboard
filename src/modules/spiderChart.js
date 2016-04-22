define(['jquery',
	'backbone',
	'underscore',
	'd3'
], function($,
	Backbone,
	_,
	d3
	) {

	var SpiderChart = function() {
		
		var that = {};

		that.instanceID = 'spiderChart' + Date.now();
		that.edges = 49;
		that.CIRCLE_COORDINATES_COUNT = 3600,

		
		that.render = function() {
			that.determineWidthAndHeight();
			that.createSVG();
			that.renderChart();
			that.animateChart();
		};


		that.assignElement = function(el) {
			that.setElement(el);
		}

			
		that.createSVG = function() {
			that.svg = d3.select(that.el).append('svg')
				.attr('width',that.width)
				.attr('height', that.height);
		};


		that.determineWidthAndHeight = function() {
			that.height = that.$el.height();
			that.width = that.$el.width();
			that.centreX = that.width/2;
			that.centreY = that.height/2;
		};


		that.createScales = function(axisData) {
			that.xScale = that.createXScales(axisData);
			that.yScale = that.createYScales(axisData);
		};
		

		that.renderChart = function() {
			var 
				gridData = that.createGridData(),
				polygonData = that.createPolygonData(that.edges);

			that.svg.selectAll('*').remove()
			that.renderSpiderGrid(gridData);
			that.renderLabels(that.edges);
			that.polygon = that.renderPolygon(polygonData);
		};



		that.renderLabels = function(edges) {
			var 
				edges = _.range(1,edges + 1),
				radius = that.width * 0.47; // TODO Refactor whole block to function with radius as parameter
				indices = that.getIndicesForPolygonCoordinates(that.edges),
				circleCoordinates = that.createCircleCoordinates(radius),
				labelData = that.createObjects(circleCoordinates, indices, true);


				that.svg.selectAll('textPlaceholder')
					.data(labelData)
					.enter()
					.append('text')
					.attr('class', 'spider-label')
					.attr('x', function(d) {return d.x2 - 6})
					.attr('y', function(d) {return d.y2 + 6})
					.text(function(d,i) {return i + 1});
		};	



		that.createGridData = function() {
			var 
				radius = that.width * (2/5),
				subRadius = radius /4, 
				subRadii = _.range(subRadius, subRadius * 4, subRadius),
				indices = that.getIndicesForPolygonCoordinates(that.edges),
				circleCoordinates = that.createCircleCoordinates(radius),
				axisData = that.createObjects(circleCoordinates, indices, true),
				gridData = [];

			that.createScales(axisData);
			gridData.push(axisData);
			gridData.push(that.createObjects(circleCoordinates, indices));
			subRadii.forEach( function(subRadius) {
				var subRadiusCoordinates = that.createCircleCoordinates(subRadius);
				gridData.push(that.createObjects(subRadiusCoordinates, indices));
			});

			return gridData;
		}




		that.renderSpiderGrid = function(gridData) {
			gridData.forEach(function(dataEntry) {
			that.svg.selectAll('linePlaceholder')
				.data(dataEntry)
				.enter()
				.append('line')
				.attr('x1', function(d) {return d.x1})
				.attr('y1', function(d) {return d.y1})
				.attr('x2', function(d) {return d.x2})
				.attr('y2', function(d) {return d.y2})
				.style('stroke', 'gray')
				.style('stroke-width',1);
			})
		};


		that.renderPolygon = function(polygonData) {

			var polygon = that.svg.selectAll("polygonPlaceholder")
							.data([polygonData])
							.enter()
							.append("polygon")
							.attr("points",function(d) {
								return d.map(function(d,i) {
									return [that.xScale[i](d.data), that.yScale[i](d.data)].join(",");
								}).join(" ");
							})
							.attr('class', 'polygon')
							.attr("stroke","blue")
							.attr('fill', 'blue')
							.attr('opacity', 0.3)
							.attr('stroke-opacity',0.5)
							.attr("stroke-width",2);
			return polygon;
		}




		that.getIndicesForPolygonCoordinates = function() {

			var interval = Math.ceil(that.CIRCLE_COORDINATES_COUNT/that.edges);
			var indices = _.range(0,that.CIRCLE_COORDINATES_COUNT,interval)
	 
			if (that.edges % 2 !== 0) {
				indices = indices.map( function(i) {
					i = (i + 2700) % that.CIRCLE_COORDINATES_COUNT;
					return i;
				})
			}
			return indices;
		};



		that.createCircleCoordinates = function(radius){
			var 
				circleCoordinates = {},
				xValues = [that.centreX],
				yValues = [that.centreY],
				steps = that.CIRCLE_COORDINATES_COUNT;

			for (var i = 0; i < steps; i++) {
				xValues[i] = (that.centreX + radius * Math.cos(2 * Math.PI * i / steps));
				yValues[i] = (that.centreY + radius * Math.sin(2 * Math.PI * i / steps));
			}

			circleCoordinates.x = xValues;
			circleCoordinates.y = yValues;

			return circleCoordinates;
		};


		that.createObjects = function(circleCoordinates, indices, getCentre) {

			var objectContainer = [];	

			indices.forEach(function(entry,i) {
				var 
					obj = {},
					x1 = circleCoordinates['x'][indices[((i  + 1) % that.edges)]],
					y1 = circleCoordinates['y'][indices[((i  + 1) % that.edges)]],    
					x2 = circleCoordinates['x'][indices[i]],
					y2 = circleCoordinates['y'][indices[i]];

				if(getCentre === true) {
					x1 = that.centreX;
					y1 = that.centreY;
				}

				obj.x1 = x1;
				obj.y1 = y1;
				obj.x2 = x2
				obj.y2 = y2
				objectContainer.push(obj)
			}) 

			return objectContainer;
		};


		that.createYScales = function(axisData) {
			var yScales = [];
			axisData.forEach(function(obj){
			var yScale = d3.scale.linear()
			        .domain([0, 4])
			        .range([obj.y1, obj.y2]);
			yScales.push(yScale)                
			})
			return yScales;
		}

		that.createXScales = function(axisData) {
			var xScales = [];
			axisData.forEach(function(obj){
			var xScale = d3.scale.linear()
			        .domain([0, 4])
			        .range([obj.x1, obj.x2]);
			xScales.push(xScale)                
			})
			return xScales;
		};


		that.createPolygonData = function() {

			var polygonData = _.range(that.edges).map(function(i){
			var ranNum = Math.random() * 4;
			return {'data': ranNum};
			})
			return polygonData;
		};


		that.animateChart = function() {

		setInterval(function() {

			that.polygon.data([that.createPolygonData(that.edges)])
				.transition()
				.duration(1000)
				.attr('fill', 'blue')
				.attr("points",function(d) {
						return d.map(function(d,i) {
							return [that.xScale[i](d.data), that.yScale[i](d.data)].join(",");
					}).join(" ");
				})

			},1100)

		};

			
		that = new (Backbone.View.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
	};
	


	return SpiderChart;

});