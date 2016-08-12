
define(['jquery',
	'backbone',
	'underscore',
	'mustache',
	'modules/headerController',
/*	'modules/streams/streamItemViewCollection',
	'modules/streams/streamItemModel',
	'text!modules/streams/templates/streamItemTemplate.html'*/
], function($,
	Backbone,
	_,
	Mustache,
	HeaderController
/*	StreamItemViewCollection,
	StreamItemModel,
	StreamItemTemplate*/
	) {

	var CalculatorController = function() {

		var that = {};

		that.events = {
/*			'mouseover':'showCancel',
			'mouseout':'hideCancel',
			'click .stream-list-item-cancel': 'removeStream',*/
			'click td': 'showValue'
/*			'click stream-manipulation-apply': 'insertValue'*/
		};

		that.assignElement = function(el) {
			that.setElement(el);
		};


		that.clearInput = function() {
			var input = that.$el.find('.stream-manipulation-input')[0];
			input.value = 'x';
		};


		that.showValue = function(event) {
			var
				button = event.target,
				operator = $(button).data('value'),
				input = that.$el.find('.stream-manipulation-input')[0],
				cursorPos = input.selectionStart,
				v = input.value,
				textBefore = v.substring(0,  cursorPos ),
				textAfter  = v.substring( cursorPos, v.length );

			if (operator === 'AC') {
				that.clearInput();
				return;
			}

			input.value =  textBefore + operator + textAfter;
			input.selectionStart = cursorPos + 1;

		};


		that.render = function() {
			var input = that.$el.find('.stream-manipulation-input')[0];
			input.selectionStart = 1;
		};

/*		that.triggerManipulation = function() {
			that.trigger('enableManipulation', that.model);
		};*/

		that.destroy = function() {

		};


		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return CalculatorController;

});