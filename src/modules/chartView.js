define(['jquery',
	'backbone',
	'underscore',
	'd3',
	'mustache',
	'modules/chartHeaderView',
	'modules/charts/spiderChart/spiderChart',
	'modules/charts/timeSeriesChart/timeSeriesChart',
	'modules/charts/barChart/barChart',
	'modules/charts/scatterChart/scatterChart',
	'text!modules/templates/widgetTemplate2.html'
], function($,
	Backbone,
	_,
	d3,
	Mustache,
	ChartHeaderView,
	SpiderChart,
	TimeSeriesChart,
	BarChart,
	ScatterChart,
	WidgetTemplate
	) {

	var ChartView = function() {
		
		var that = {};
		that.instanceID = 'view' + Date.now();
		that.widgetTemplate = WidgetTemplate;
		that.events = {
			'click .chart': 'selectChartType',
			'mouseover .widget-header': 'showCancelButton',
			'mouseleave .widget-header': 'hideSelectButtons',
		};

		that.templateData = {
			'scatter': true,
			'bar': false,
			'spider': false,
			'line': false
		};


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


		that.showCancelButton = function(event) {
			console.log('hover')
			var buttons = event.target.parentElement.children;
			$('.chart').not(buttons).addClass('transparent');
			$(event.target).find('.chart').removeClass('transparent');

		};
		

		that.hideSelectButtons = function(event) {
			$(event.target).find('.chart').addClass('transparent');
		};	


		that.resetTemplateData = function() {
			var keys = _.keys(that.templateData);
			keys.forEach(function(key) {
				that.templateData[key] = false;
			})
		};


		that.updateTemplateData = function() {
			var selected = that.model.get('chart-type');
			that.resetTemplateData()
			that.templateData[selected] = true;
		};


		that.selectChartType = function(event) {

			var 
				target = $(event.target),
				targetType = target.data('type');

			if (target.hasClass('cancel-chart') === true) {
				return;
			}	
				
			that.model.set({'chart-type':targetType});
			that.updateTemplateData()
			that.populateElement();
			that.$el.find('.chart').toggleClass('transparent');
		};



		that.assignModel = function(model) {
			that.model = model;
		}


		that.getModelID = function() {
			return that.model.get('id');	
		}


		that.assignElement = function(element) {
			that.setElement(element);
		}


		that.populateElement = function() {
			var html = Mustache.to_html(that.widgetTemplate, that.templateData);
			that.$el.html(html);
		};


		that.render = function() {
			that.createChart();
			that.createHeader();
			that.chart.render();
			that.headerView.render();
		};

		that.clearChart = function() {
			that.chart.destroy()
			that.headerView.destroy();
			that.chart = undefined;
			that.headerView = undefined;
			that.populateElement();
		};	


		that = new (Backbone.View.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
	};
	


	return ChartView;

});