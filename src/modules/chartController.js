define(['jquery',
	'backbone',
	'underscore',
	'd3',
	'modules/chartHeaderView',
	'modules/charts/spiderChart/spiderChart',
	'modules/charts/timeSeriesChart/timeSeriesChart',
	'modules/charts/barChart/barChart',
	'modules/charts/scatterChart/scatterChart'
], function($,
	Backbone,
	_,
	d3,
	ChartHeaderView,
	SpiderChart,
	TimeSeriesChart,
	BarChart,
	ScatterChart
	) {

	var ChartController = function() {
		
		var that = {};
		that.instanceID = 'view' + Date.now();


		that.createChart = function() {
			var	type = that.$el.find('.widget-header').data('type');
			if(type === 'spider') {
				that.chart = new SpiderChart();
			} else if (type === 'line') {
				that.chart = new TimeSeriesChart();
			} else if (type === 'bar') {
				that.chart = new BarChart();
			} else {
				that.chart = new ScatterChart();
			}
		};


		that.createHeader = function() {
			that.header = new ChartHeaderView();
		};


		that.assignChartElement = function() {
			var	element = that.$el.find('.chart-container');
			that.chart.assignElement(element);
		};


		that.assignHeaderElement = function() {
			var	element = that.$el.find('.widget-header');
			that.header.assignElement(element);
		};


		
		that.render = function() {
			that.createChart();
			that.assignChartElement();
			that.createHeader()
			that.assignHeaderElement();
			that.chart.render();
		};

	
		that = new (Backbone.View.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
	};
	


	return ChartController;

});