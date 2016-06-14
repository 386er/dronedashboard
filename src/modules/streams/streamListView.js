
define(['jquery',
	'backbone',
	'underscore',
	'modules/headerController',
	'modules/streams/streamItemViewCollection',
	'modules/streams/streamItemModel',
	'modules/streams/streamItemView',
	'text!modules/streams/templates/streamListTemplate.html'
], function($,
	Backbone,
	_,
	HeaderController,
	StreamItemViewCollection,
	StreamItemModel,
	StreamItemView,
	StreamListTemplate
	) {

	var StreamListView = function(numberOfStreams) {

		var that = {};
		that.collection = new StreamItemViewCollection();
		that.el ='.stream-list';

		that.initialize = function() {
			_.range(1, numberOfStreams + 1).forEach(function(i) {
				var model = new StreamItemModel({'name': 'Stream ' + i})
				that.collection.add(model)
			})
		}



		that.render = function() {
			that.$el.html(StreamListTemplate)
			that.collection.each(function(item) {
				var itemView = new StreamItemView();
				itemView.assignModel(item);
				itemView.render();
				that.$el.find('.stream-list-wrapper').append(itemView.el)

			})
		}



		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return StreamListView;

});