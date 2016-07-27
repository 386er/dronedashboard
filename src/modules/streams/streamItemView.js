
define(['jquery',
	'backbone',
	'underscore',
	'mustache',
	'modules/headerController',
	'modules/streams/streamItemViewCollection',
	'modules/streams/streamItemModel',
	'text!modules/streams/templates/streamItemTemplate.html'
], function($,
	Backbone,
	_,
	Mustache,
	HeaderController,
	StreamItemViewCollection,
	StreamItemModel,
	StreamItemTemplate
	) {

	var StreamItemView = function() {

		var that = {};

		that.events = {
			'mouseover':'showCancel',
			'mouseout':'hideCancel',
			'click .stream-list-item-cancel': 'removeStream',
			'click': 'triggerManipulation'
		};


		that.assignModel = function(model) {
			that.model = model;
		};

		that.showCancel = function() {
			that.$el.find('.stream-list-item-cancel').removeClass('hidden');
		};


		that.hideCancel = function() {
			that.$el.find('.stream-list-item-cancel').addClass('hidden');
		};


		that.removeStream = function() {
			that.trigger('removeStream', that.model);
		};


		that.render = function() {
			var html = Mustache.to_html(StreamItemTemplate, that.model.toJSON());
			that.$el.html(html);
		};

		that.triggerManipulation = function() {
			that.trigger('enableManipulate');
		};


		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return StreamItemView;

});