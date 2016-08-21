
define(['jquery',
	'backbone',
	'underscore',
	'mustache',
	'gridster',
	'd3',
	'modules/dashboard/chartView',
	'modules/dashboard/chartViewCollection',
	'modules/dashboard/chartModelCollection',
	'modules/dashboard/chartModel',
	'text!modules/dashboard/templates/widgetTemplate.html',
	'text!modules/dashboard/templates/gridsterTemplate.html'
], function($,
	Backbone,
	_,
	Mustache,
	Gridster,
	d3,
	ChartView,
	ChartViewCollection,
	ChartModelCollection,
	ChartModel,
	WidgetTemplate,
	GridsterTemplate
	) {


	var GridsterController = function() {
		
		var
			that = {}, my = {}; // TODO implement that - my logic in every module 
		
		
		that.el ='.sub-wrapper';
		that.instanceID = 'gridsterController' + Date.now();
		that.gridsterConfiguration = {
					widget_margins: [7, 7],
					widget_base_dimensions: [40, 40],
					autogenerate_stylesheet: true,
					resize: {
						enabled: true,
						max_size: [35, 11],
						min_size: [4, 4]
						}
		};
		that.chartsLocked = false;
		that.gridster = undefined;
		that.viewCollection = new ChartViewCollection();
		that.widgetTemplate = WidgetTemplate;
		that.events = {
			'click .cancel-chart': 'cancelWidget',
		};
		

		that.assignCollection = function(collection) {
			that.modelCollection = collection;
		};


		
		that.renderChartView = function() {
			that.viewCollection.getViews().forEach(function(view) {
				view.render();
			});
		};


		that.clearChartViews = function() {
			that.viewCollection.getViews().forEach( function(view) {
				view.clearChart();
			});
		};


		that.getWidgets = function(numberOfModels) {

			var widgets = [];
			for (var i = 0; i < numberOfModels; i++) {
				widgets.push([5,6]);
			}
			return widgets;
		};


		that.getSegmentation = function() {
			var segmentation = that.gridster.serialize();
			segmentation = Gridster.sort_by_row_and_col_asc(segmentation);
			return segmentation;
		};


		that.setDashboardSegmentation = function(segmentation) {
			that.dashBoardSegmentation = segmentation;
		};


		that.bindGridsterToElement = function() {
			that.gridster = $(".gridster > ul").gridster(that.gridsterConfiguration).data('gridster');
		};

			
		that.lockCharts = function() {
			if ( !$('.gridster').length) {
				return;
			}
			that.$el.off();
			that.toggleWidgetStyling();
			that.gridster.disable();
			that.renderChartView();
			that.chartsLocked = true;
		};


		that.unlockCharts = function() {
			if ( !$('.gridster').length) {
				return;
			}
			that.delegateEvents();
			that.toggleWidgetStyling();
			that.gridster.enable();
			that.chartsLocked = false;
		};
		

		that.toggleElementStyling = function(element) {
			$(element).find('span').toggleClass('hidden');
			$(element).find('div').toggleClass('no-hover');
		};

		
		that.toggleWidgetStyling = function() {
			var elements = $('.gridster')[0];
			that.toggleElementStyling(elements);
			$('.gs-w').toggleClass('disabled');
			$('.gridster ul').toggleClass('disabled');
		};
		

		
		that.cancelWidget = function(event) {
			var widget = $(event.target).closest('.gs-w');
			var id = widget[0].id;

			that.viewCollection.remove(id);
			that.gridster.remove_widget(widget, 0);

		};
		


		that.updateWidgets = function(widgets) {

			var seg = that.dashBoardSegmentation;

			widgets = widgets.map( function(widget, i) {
				widget[0] = seg[i] ? seg[i].size_x : 5;
				widget[1] = seg[i] ? seg[i].size_y : 6;
				widget[2] = seg[i] ? seg[i].col : undefined;
				widget[3] = seg[i] ? seg[i].row : undefined;
				return widget;
			});

			return widgets;

		};



		
		that.enterWidgets = function() {

			var widgets = that.getWidgets(that.modelCollection.models.length);

			if (that.dashBoardSegmentation !== undefined) {
				widgets = that.updateWidgets(widgets);
			}

			that.bindGridsterToElement();
			widgets.forEach( function(widget, i){
				var chartModel = that.modelCollection.at(i);
				var html = Mustache.to_html(that.widgetTemplate, chartModel.toJSON());
				that.gridster.add_widget(html, widget[0], widget[1], widget[2], widget[3]);
			});
		};


		that.bindChartsToWidgets = function() {
			var widgetIDs = that.modelCollection.pluck('id');

			widgetIDs.forEach(function(widgetID) {
				var
					element = $('#' + widgetID).find('.chart-wrapper'),
					chartModel = that.modelCollection.get(widgetID);

				view = new ChartView();
				view.assignElement(element);
				view.assignModel(chartModel);
				view.updateTemplateData();
				view.populateElement();
				that.viewCollection.add(view);
			});
		};


		that.render = function() {
			that.renderTemplate();
			that.enterWidgets();
			that.bindChartsToWidgets();
		};


		that.renderTemplate = function() {
			that.$el.html(GridsterTemplate);
		};


		that.destroy = function() {
			var widgets = that.$el.find('.gs-w');

			_.each(widgets, function(widget) {
				that.gridster.remove_widget(widget, 0);
			});

			that.modelCollection = undefined;
			that.viewCollection = undefined;
			that.off();
			that.$el.off();
		};


				
		
		that = new (Backbone.View.extend(that))();
		return that;
	};
	
	return GridsterController;
	
});
	
