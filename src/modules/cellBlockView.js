define(['jquery',
	'backbone',
	'underscore',
	'd3',
	'modules/spiderChart',
	'modules/timeSeriesChart'
], function($,
	Backbone,
	_,
	d3,
	SpiderChart,
	TimeSeriesChart
	) {

	var CellBlockView = function() {
		
		var that = {};
		that.instanceID = 'view' + Date.now();


		that.initialize = function() {

			var ranNum = Math.random();

			if(ranNum > 0.999) {
				that.chart = new SpiderChart();
			} else {
				that.chart = new TimeSeriesChart();
			}

			that.chart.assignElement(that.el);
		}

		
		that.render = function() {
			that.chart.render();
		};

	
		that = new (Backbone.View.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
	};
	


	return CellBlockView;

});