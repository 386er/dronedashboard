
define(['jquery',
	'backbone',
	'underscore',
	'mustache',
	'modules/headerController',
	'modules/charts/barChart',
	'modules/charts/timeSeriesChart',
	'modules/charts/histogramChart',
	'modules/charts/statsChart',
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
	StreamManipulationTemplate
	) {

	var StreamManipulatorView = function() {

		var that = {};
		that.el ='.stream-manipulation';
		that.model = undefined;

		that.assignModel = function(model) {
			that.model = model;
		};


		that.render = function() {
			if (that.model !== undefined) {
				var html = Mustache.to_html(StreamManipulationTemplate, that.model.toJSON());
				that.$el.html(html);
				that.histogramChart = new HistogramChart();
				that.histogramChart.assignElement(that.$el.find('.stream-manipulation-histogram')[0]);
				that.histogramChart.render();
				that.timeSeriesChart = new TimeSeriesChart();
				that.timeSeriesChart.assignElement(that.$el.find('.stream-manipulation-timeseries')[0]);
				that.timeSeriesChart.render();
				that.statsChart = new StatsChart();
				that.statsChart.assignElement(that.$el.find('.stream-manipulation-stats')[0])
				that.statsChart.render();
			} else {
				var html = Mustache.to_html(StreamManipulationTemplate, {});
				that.$el.html(html);
			}
		};



		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return StreamManipulatorView;

});