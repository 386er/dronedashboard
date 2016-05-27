
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

			view.assignModel(chartModel);	
			view.render();
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
			that.removeStylingfromBlocks();
			that.gridster.disable();
			that.trigger('gridCreated');
		};
		

		that.removeStylingFromElement = function(element) {
			$(element).find('span').toggleClass('hidden');
			$(element).find('div').toggleClass('no-hover');
			$(element).children().css({'border':'transparent'});
			$(element).find('i').remove();
			$(element).find('span').remove();
		};

		
		that.removeStylingfromBlocks = function() {
			var elements = $('.gridster')[0];
			that.removeStylingFromElement(elements)
			$('.gs-w').css({'border':'transparent'});
			$('.gridster ul').css({'background-color':'transparent'});
			$('i').remove();
			$('span').remove();
		};
		
		
		that.cancelWidget = function(event) {
			//TODO trigger mouseup event to resize Element
			that.gridster.remove_widget($(event.target).closest('.gs-w'), 10);
		};
		
		
		that.enterWidgets = function() { 

			var widgets = that.getWidgets(numberOfStreams);
			that.bindGridsterToElement();
		
			widgets.forEach( function(widget, i){
					var template = Mustache.to_html(that.widgetTemplate, {'index': (i + 1)});
					widget = [template].concat(widget)
					that.gridster.add_widget.apply(that.gridster, widget);

					var chartModel = new ChartModel({'chart-type':'scatter', 'id': i+1, 'label': i + 1});
					that.collection.add(chartModel);

			}); 
		};
				
		
		that = new (Backbone.View.extend(that))();
		return that;
	};
	
	return GridsterController;
	
});
	
