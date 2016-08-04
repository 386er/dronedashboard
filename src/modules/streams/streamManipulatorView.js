
define(['jquery',
	'backbone',
	'underscore',
	'mustache',
	'modules/headerController',
	'modules/charts/barChart',
	'modules/charts/timeSeriesChart',
	'modules/charts/histogramChart',
	'modules/charts/statsChart',
	'modules/calculatorController',
	'text!modules/streams/templates/streamManipulationTemplate.html'
], function($,
	Backbone,
	_,
	Mustache,
	HeaderController,
	BarChart,
	TimeSeriesChart,
	HistogramChart,
	StatsChart,
	CalculatorController,
	StreamManipulationTemplate
	) {

	var StreamManipulatorView = function() {

		var that = {};
		that.el ='.stream-manipulation';
		that.model = undefined;
		that.histogramChart = new HistogramChart();
		that.timeSeriesChart = new TimeSeriesChart();
		that.statsChart = new StatsChart();
		that.calculatorController = new CalculatorController();
		that.chartsShown = false;


		that.assignModel = function(model) {
			that.model = model;
		};


		that.createCharts = function() {
			that.histogramChart = new HistogramChart();
			that.timeSeriesChart = new TimeSeriesChart();
			that.statsChart = new StatsChart();
			that.calculatorController = new CalculatorController();
		};


		that.destroyCharts = function() {
			that.histogramChart.destroy();
			that.histogramChart = undefined;
			that.timeSeriesChart.destroy();
			that.timeSeriesChart = undefined;
			that.statsChart.destroy();
			that.statsChart = undefined;
			that.calculatorController.destroy();
			that.calculatorController = undefined;
		};


		that.render = function() {
			if (that.model !== undefined) {

				if (that.chartsShown === true) {
					that.destroyCharts();
				}
				that.createCharts();

				var html = Mustache.to_html(StreamManipulationTemplate, that.model.toJSON());
				that.$el.html(html);
				that.histogramChart.assignElement(that.$el.find('.stream-manipulation-histogram')[0]);
				that.histogramChart.render();
				that.timeSeriesChart.assignElement(that.$el.find('.stream-manipulation-timeseries')[0]);
				that.timeSeriesChart.render();
				that.statsChart.assignElement(that.$el.find('.stream-manipulation-stats')[0]);
				that.statsChart.render();
				that.calculatorController.assignElement(that.$el.find('.stream-manipulation-calculator')[0]);
				that.calculatorController.render();

				that.chartsShown = true;

			} else {
				var html = Mustache.to_html(StreamManipulationTemplate, {});
				that.$el.html(html);
			}
		};


		that.destroy = function() {
			if (that.chartsShown === true) {
				that.destroyCharts();
			}
			that.$el.html('');
			that.$el.off();
		};



		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return StreamManipulatorView;

});