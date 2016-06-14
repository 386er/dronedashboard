
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

	var StreamListView = function(numberOfStreams) {

		var that = {};


		that.assignModel = function(model) {
			that.model = model;
		}


		that.render = function() {
		var html = Mustache.to_html(StreamItemTemplate, that.model.toJSON());
			that.$el.html(html)
		}



		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return StreamListView;

});