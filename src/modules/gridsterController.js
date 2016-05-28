
define(['jquery',
	'backbone',
	'underscore',
	'mustache',
	'gridster',
	'd3',
	'modules/chartView',
	'modules/chartModelCollection',
	'modules/chartModel',
	'text!modules/templates/widgetTemplate.html'
], function($,
	Backbone,
	_,
	Mustache,
	Gridster,
	d3,
	ChartView,
	ChartModelCollection,
	ChartModel,
	WidgetTemplate
	) {


	var GridsterController = function(numberOfStreams) {
		
		var 
			that = {}, my = {}; // TODO implement that - my logic in every module 
		
		
		that.el ='.wrapper';

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
		
		that.gridster = undefined;
		that.collection = new ChartModelCollection();
		that.chartViews = [];
		
		that.events = {
			'click .cancel-chart': 'cancelWidget',
			'click .chart': 'selectChartType',
			'mouseover .gs-w': 'showCancelButton',
			'mouseleave .gs-w': 'hideSelectButtons',
		};
		
		


		that.createChartView = function(element) { 

			var
				elementID = element.id,
				view = new ChartView({el: '#' + elementID});
				chartModel = that.collection.get(elementID);

			that.chartViews.push(view); //TODO seperate Collection für anlegen
			view.assignModel(chartModel);	
			view.render();
		};


		that.destroyChartViews = function() {
			that.chartViews.forEach( function(view) {
				view.destroy();
				view = undefined;
			});
			that.chartViews = [];
		};


		that.getWidgets = function(numberOfStreams) {

			var widgets = [];
			for (var i = 0; i < numberOfStreams; i++) {
				widgets.push([5,6])
			}
			return widgets;
		};



		that.widgetTemplate = WidgetTemplate; 
							

								
		that.gridTemplate =  '<ul></ul>';

		

		that.showCancelButton = function(event) {
			var buttons = event.target.parentElement.children;
			$('.chart').not(buttons).addClass('transparent');
			$(event.target).find('.chart').removeClass('transparent');

		};
		

		that.hideSelectButtons = function(event) {
			$(event.target).find('.chart').addClass('transparent');
		};			


		that.selectChartType = function(event) {

			var 
				target = $(event.target),
				targetType = target.data('type')
				parent = target.parent(),
				widget = parent.parent(),
				widgetID = widget[0].id;

			parent.find('.chart').removeClass('selected');
			target.addClass('selected')
			parent.attr('data-type', targetType);
			that.collection.get(widgetID).set({'chart-type':targetType});
		};


		that.bindGridsterToElement = function() {
			that.gridster = $(".gridster > ul").gridster(that.gridsterConfiguration).data('gridster');
		};


			
		that.lockCharts = function() {

			if ( !$('.gridster').length) {
				return;
			}

			that.$el.off();		
			that.toggleBlockStyling();
			that.gridster.disable();
			that.trigger('gridCreated');
		};


		that.unlockCharts = function() {

			if ( !$('.gridster').length) {
				return;
			}

			that.$el.on();		
			that.toggleBlockStyling();
			that.gridster.enable();
		};
		

		that.toggleElementStyling = function(element) {
			$(element).find('span').toggleClass('hidden');
			$(element).find('div').toggleClass('no-hover');
		};

		
		that.toggleBlockStyling = function() {
			var elements = $('.gridster')[0];
			that.toggleElementStyling(elements)
			$('.gs-w').toggleClass('disabled')
			$('.gridster ul').toggleClass('disabled')
		};
		

		that.renderWidget = function(model) {


		}


		
		that.cancelWidget = function(event) {
			//TODO trigger mouseup event to resize Element
			that.gridster.remove_widget($(event.target).closest('.gs-w'), 10);
		};
		
		
		that.enterWidgets = function() { 

			var widgets = that.getWidgets(numberOfStreams);
			that.bindGridsterToElement();
		
			widgets.forEach( function(widget, i){
					var chartModel = new ChartModel({'id': i+1, 'label': i + 1});
					var template = Mustache.to_html(that.widgetTemplate, chartModel.toJSON());
					// TODO Create directly ChartView
					that.collection.add(chartModel);
					that.gridster.add_widget(template, widget[0], widget[1])
			}); 
		};
				
		
		that = new (Backbone.View.extend(that))();
		return that;
	};
	
	return GridsterController;
	
});
	
