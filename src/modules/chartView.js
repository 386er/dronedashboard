define(['jquery',
	'backbone',
	'underscore',
	'd3',
	'modules/spiderChart',
	'modules/timeSeriesChart',
	'modules/barChart'
], function($,
	Backbone,
	_,
	d3,
	SpiderChart,
	TimeSeriesChart,
	BarChart
	) {

	var ChartView = function() {
		
		var that = {};
		that.instanceID = 'view' + Date.now();


		that.initialize = function() {

			var element = that.el,
				type = $(element).data('type');

			if(type === 'spider') {
				that.chart = new SpiderChart();
			} else if (type === 'line') {
				that.chart = new TimeSeriesChart();
			} else {
				that.chart = new BarChart();
			}
			that.chart.assignElement(element);
		}

		
		that.render = function() {
			that.chart.render();
		};

	
		that = new (Backbone.View.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
	};
	


	return ChartView;

});