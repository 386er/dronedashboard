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

	var ChartView = function() {
		
		var that = {};
		that.instanceID = 'view' + Date.now();


		that.createChart = function() {

			var	
				type = that.model.get('chart-type'),
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


		that.createHeader = function() {
			var	element = that.$el.find('.widget-header');
			that.headerView = new ChartHeaderView();
			that.headerView.assignElement(element);
			that.headerView.assignModel(that.model);
		};


		that.assignModel = function(model) {
			that.model = model;
		}


		that.render = function() {
			that.createChart();
			that.createHeader()
			that.chart.render();
			that.headerView.render();
		};

	
		that = new (Backbone.View.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
	};
	


	return ChartView;

});