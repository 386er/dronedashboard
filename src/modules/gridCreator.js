
define(['jquery',
	'backbone',
	'underscore',
	'mustache',
	'colorpicker',
	'gridster',
	'd3'
], function($,
	Backbone,
	_,
	Mustache,
	colorpicker,
	Gridster,
	d3
	) {


	var GridCreator = function() {
		
		var 
			that = {}, my = {};
		
		
		that.el ='.wrapper';

		that.gridsterConfiguration = {
					widget_margins: [5, 5],
					widget_base_dimensions: [100, 55],
					autogenerate_stylesheet: true,
					resize: {
						enabled: true,
						max_size: [8, 8],
						min_size: [1, 1]
						}
		};
		
		that.gridster = {};
		
		that.events = {
			'click .addBlock': 'getNewSelectorBox',
			'click .freeze-block': 'freezeBlocks',
			'click .cancel-box': 'cancelWidget',
			'click .color-box' : 'triggerColorPick',
			'mouseover .gs-w': 'showCancelButton',
			'mouseleave .gs-w': 'hideCancelButton',
			'mouseover .selector-box': 'highlightBoxes',
			'mouseleave .selector-box': 'unhighlightBoxes',
			'click .selector-box': 'bindBox'
		};
		
		that.widgetsConfiguration = {

			1 : [
					[6, 3]
			],

			2:  [
					[6, 2],
					[6, 1]
			],

			3: [
					[3, 2],
					[3, 2],
					[6, 1]
			],

			4:  [
					[3, 2],
					[3, 2],
					[3, 1],
					[3, 1],
			],

			5:  [
					[3, 1],
					[1, 3],
					[1, 3],
					[1, 3],
					[3, 2]
			],

			6:  [
					[3, 1],
					[1, 3],
					[1, 3],
					[1, 3],
					[3, 2],
					[6, 1]
			],

			7:  [
					[3, 1],
					[1, 3],
					[1, 3],
					[1, 3],
					[3, 2],
					[3, 1],
					[3, 1]
			],

			8:  [
					[3, 1],
					[1, 3],
					[1, 3],
					[1, 3],
					[3, 2],
					[3, 1],
					[3, 1],
					[6, 1]
			],

			9:  [
					[3, 1],
					[1, 3],
					[1, 3],
					[1, 3],
					[3, 2],
					[3, 1],
					[3, 1],
					[3, 1],
					[3, 1]
			],

			10:  [
					[3, 1],
					[1, 3],
					[1, 3],
					[1, 3],
					[3, 2],
					[3, 1],
					[3, 1],
					[3, 1],
					[3, 1],
					[6, 1]
			]				
		};

		that.widgetTemplate = 
							'<div class="{{index}}">' +
								'<i class="hidden cancel-box fa fa-times"></i>' +
								'<i class="hidden color-box fa fa-paint-brush"></i>' +
							'</div>';

		
		that.selectorTemplate = 
						'<div class="placeholder-box" style="left:10px">' +
							'<div class="button-wrapper">' +
								'{{#selectorbox}}' +
								'<a class="selector-box {{.}}" data-key="{{.}}"></a>' +
								'{{/selectorbox}}' +
							'</div>' +
						'</div>';

		that.selectorData = {'selectorbox': [1,2,3,4,5,6,7,8,9,10]}

						
		that.gridTemplate =  '<ul class="{{currentElement}}"></ul>';

		
		that.data = {'currentElement' : 0};

		that.showCancelButton = function(event) {

			var buttons = event.target.parentElement.children;

			$('.cancel-box').not(buttons).addClass('hidden');
			$('.color-box').not(buttons).addClass('hidden');
			$(event.target).find('.cancel-box').removeClass('hidden');
			$(event.target).find('.color-box').removeClass('hidden');
		};
		

		that.hideCancelButton = function(event) {
			$(event.target).find('.cancel-box').addClass('hidden');
			$(event.target).find('.color-box').addClass('hidden');
		};			

		that.bindGridsterToElement = function(index) {
			that.gridster[index] = $(".gridster > ul." + index).gridster(that.gridsterConfiguration).data('gridster');
		};


		that.triggerColorPick = function(event) {
			$(event.target).trigger('getColor');
		};


		that.getNewSelectorBox = function() {
			var html = Mustache.render(that.selectorTemplate, that.selectorData)
			that.$el.find('.sub-wrapper').append(html);
		};
		
		that.highlightBoxes = function() {
			var 
				box = event.target,
				outerBox = $(event.target).parent(),
				numOfBoxes = box.dataset.key,
				rangeBoxes = _.range(1,parseInt(numOfBoxes) + 1),
				classes = _.map(rangeBoxes, function(num){ return '.' + num ; });
				
			_.forEach(classes, function(entry){
				$(outerBox).find(entry).addClass('select');
			})	
				console.log(classes)
				
			
		}
		
		that.unhighlightBoxes = function() {
			
			$('.select').removeClass('select');
		}
		
		
		that.freezeBlocks = function() {

			if ( !$('.gridster').length) {
				return;
			}

			that.$el.off();
			$(document.body).off('dblclick');		
			that.removeStylingfromBlocks();

			var keys = _.keys(that.gridster);
			keys.forEach(function(key){
				if (that.gridster[key] !== undefined) {
					that.gridster[key].disable();
				}
			})
			that.trigger('gridCreated');
		};
		

		
		that.removeStylingfromBlocks = function() {
			that.$el.find('.placeholder-box').remove();
			$('.gridster').find('span').toggleClass('hidden');
			$('.gridster').find('div').toggleClass('no-hover');
			$('.gridster').children().css({'border':'transparent'});
			$('.gs-w').css({'border':'transparent'});
			$('.addBlock').toggleClass('hidden');
			$('.freeze-block').toggleClass('hidden');
			$('.gridster ul').css({'background-color':'transparent'});
			$('i').remove();
			$('span').remove();
		};
		
		
		that.cancelWidget = function(event) {
				var 
					ul = $(event.target).parents('ul'),
					i = parseInt(ul.attr('class')),
					numOfBlocks = that.$el.find('.gridster').length;
				
				if (ul.children().length < 2) {
					that.gridster[i].destroy();
					ul.parents('.gridster').fadeOut(10).remove();

					if (numOfBlocks < 2){
						that.$el.find('.freeze-block').addClass('locked');
					}
					return;
				}

				that.gridster[i].remove_widget(event.target.parentElement, 10);		
		};
		
		
		that.bindBox = function(event) { 

			that.data.currentElement += 1;
			
			var
				index = that.data.currentElement,
				html = Mustache.to_html(that.gridTemplate, that.data),
				numOfElements = parseInt(event.target.dataset.key),
				parent = $(event.target.parentElement.parentElement);
				
			parent.removeClass('placeholder-box');
			parent.addClass('gridster')
			parent.html(html)
			that.bindGridsterToElement(index);

			$.each(that.widgetsConfiguration[numOfElements], function(i, widget){
				var template = Mustache.to_html(that.widgetTemplate, {'index': 'indx_' + index + '_' + (i + 1)});
				widget = [template].concat(widget)
				that.gridster[index].add_widget.apply(that.gridster[index], widget)  
			});			
			$('.' + index).find('div').colorPicker({animationSpeed:0});

			if( $('.freeze-block').hasClass('locked')) {
				$('.freeze-block').removeClass('locked');
			}
		};
				
		
		that = new (Backbone.View.extend(that))();
		
		return that;
	};
	
	return GridCreator;
	
});
	
