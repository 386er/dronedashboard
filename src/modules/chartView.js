define(['jquery',
	'backbone',
	'underscore',
	'd3',
	'modules/charts/spiderChart',
	'modules/charts/timeSeriesChart',
	'modules/charts/barChart',
	'modules/charts/scatterChart'
], function($,
	Backbone,
	_,
	d3,
	SpiderChart,
	TimeSeriesChart,
	BarChart,
	ScatterChart
	) {

	var ChartView = function() {
		
		var that = {};
		that.instanceID = 'view' + Date.now();


		that.assignType = function() {

			var	type = that.$el.find('.widget-header').data('type'),
				element = that.$el.find('.chart-container');

			if(type === 'spider') {
				that.chart = new SpiderChart();
			} else if (type === 'line') {
				that.chart = new TimeSeriesChart();
			} else if (type === 'bar') {
				that.chart = new BarChart();
			} else {
				that.chart = new ScatterChart();
			}
			that.chart.assignElement(element);
		};

		
		that.render = function() {
			that.assignType();
			that.chart.render();
		};

	
		that = new (Backbone.View.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
	};
	


	return ChartView;

});