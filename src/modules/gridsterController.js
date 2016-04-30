
define(['jquery',
	'backbone',
	'underscore',
	'mustache',
	'gridster',
	'd3',
	'modules/chartView'
], function($,
	Backbone,
	_,
	Mustache,
	Gridster,
	d3,
	ChartView
	) {


	var GridsterController = function(numberOfStreams) {
		
		var 
			that = {}, my = {};
		
		
		that.el ='.wrapper';

		that.gridsterConfiguration = {
					widget_margins: [7, 7],
					widget_base_dimensions: [40, 40],
					autogenerate_stylesheet: true,
					resize: {
						enabled: true,
						max_size: [35, 11],
						min_size: [1, 1]
						}
		};
		
		that.gridster = undefined;
		
		that.events = {
			'click .cancel-button': 'cancelWidget',
			'click .chart': 'selectChartType',
			'mouseover .gs-w': 'showCancelButton',
			'mouseleave .gs-w': 'hideSelectButtons',
		};
		
		


		that.createView = function(element) { 

			var
				className = element.classList[0],
				view = new ChartView({el: '.' + className});
			view.render();
		};


		that.getWidgetConfiguration = function(numberOfStreams) {

			var widgetsConfiguration = [];

			for (var i = 0; i < numberOfStreams; i++) {
				widgetsConfiguration.push([5,6])
			}

			return widgetsConfiguration;
		};



		that.widgetTemplate = 
							'<div class="{{index}}">' +
								'<div class="widget-header">' +
									'<i class="hidden chart bar-chart fa fa-bar-chart"></i>' +
									'<i class="hidden chart spider-chart fa fa-asterisk"></i>' +
									'<i class="hidden chart line-chart fa fa-line-chart"></i>' +
									'<i class="hidden chart cancel-button fa fa-times"></i>' +
								'</div>' +
								'<div class="chart-container">' +
								'</div>' +
							'</div>';

		
		that.selectorTemplate = '<div class="placeholder-box" style="left:10px"> </div>';


						
		that.gridTemplate =  '<ul class="1"></ul>';

		

		that.showCancelButton = function(event) {
			var buttons = event.target.parentElement.children;
			$('.chart').not(buttons).addClass('hidden');
			$(event.target).find('.chart').removeClass('hidden');

		};
		

		that.hideSelectButtons = function(event) {
			$(event.target).find('.chart').addClass('hidden');
		};			


		that.selectChartType = function(event) {
			var target = $(event.target),
				parent = target.parent();

			parent.data('data-type', undefined);
			parent.find('.chart').removeClass('selected');
			target.addClass('selected')
			if (target.hasClass('line-chart')) {
				parent.attr('data-type', 'line');
			} else if (target.hasClass('spider-chart'))  {
				parent.attr('data-type','spider');
			} else {
				parent.attr('data-type','bar');
			}

		};


		that.bindGridsterToElement = function() {
			that.gridster = $(".gridster > ul.1").gridster(that.gridsterConfiguration).data('gridster');
		};


			
		that.freezeBlocks = function() {

			if ( !$('.gridster').length) {
				return;
			}

			that.$el.off();		
			that.removeStylingfromBlocks();
			that.gridster.disable();
			that.trigger('gridCreated');
		};
		

		that.removeStyingFromElement = function(element) {

			$(element).find('span').toggleClass('hidden');
			$(element).find('div').toggleClass('no-hover');
			$(element).children().css({'border':'transparent'});
			$(element).find('i').remove();
			$(element).find('span').remove();
		};

		
		that.removeStylingfromBlocks = function() {

			var elements = $('.gridster')[0];
			that.removeStyingFromElement(elements)
			$('.gs-w').css({'border':'transparent'});
			$('.addBlock').toggleClass('hidden');
			$('.gridster ul').css({'background-color':'transparent'});
			$('i').remove();
			$('span').remove();
		};
		
		
		that.cancelWidget = function(event) {
				var 
					ul = $(event.target).parents('ul'),
					i = parseInt(ul.attr('class'));

				//TODO trigger mouseup event to resize Element
				that.gridster.remove_widget($(event.target).closest('.gs-w'), 10);
		};
		
		
		that.bindBox = function() { 

			var
				html = that.gridTemplate,
				parent = $('.gridster'),
				widgetsConfiguration = that.getWidgetConfiguration(numberOfStreams);
				
			parent.html(html)
			that.bindGridsterToElement();
		
			widgetsConfiguration.forEach( function(widget, i){
					var template = Mustache.to_html(that.widgetTemplate, {'index': 'indx_1' + '_' + (i + 1)});
					widget = [template].concat(widget)
					that.gridster.add_widget.apply(that.gridster, widget)  
			});
		};
				
		
		that = new (Backbone.View.extend(that))();
		return that;
	};
	
	return GridsterController;
	
});
	
