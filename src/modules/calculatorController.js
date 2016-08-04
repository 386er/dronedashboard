
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



/*		that.assignModel = function(model) {
			that.model = model;
		};*/

/*		that.showCancel = function() {
			that.$el.find('.stream-list-item-cancel').removeClass('hidden');
		};


		that.hideCancel = function() {
			that.$el.find('.stream-list-item-cancel').addClass('hidden');
		};*/


		that.showValue = function(event) {
			var 
				button = event.target,
				operator = $(button).data('value'),
				input = that.$el.find('.stream-manipulation-input')[0],
				cursorPos = input.selectionStart,
				v = input.value,
				textBefore = v.substring(0,  cursorPos ),
				textAfter  = v.substring( cursorPos, v.length );

			input.value =  textBefore + operator + textAfter;

		};


		that.render = function() {
/*			var html = Mustache.to_html(StreamItemTemplate, that.model.toJSON());
			that.$el.html(html);*/
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