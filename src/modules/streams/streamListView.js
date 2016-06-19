
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
/*		that.collection = new StreamItemViewCollection();*/
		that.el ='.stream-list';
		that.numberOfStreams = numberOfStreams;

		that.events = {
			'click .stream-list-adder': 'addStreamItem',
			'click .submit-stream': 'establishStream'
		}



		that.initialize = function() {
/*			_.range(1, numberOfStreams + 1).forEach(function(i) {
				var model = new StreamItemModel({
					'name': 'Stream ' + i,
					'connectionEstablished': true,
					'id': i
			});
				that.collection.add(model)
			})*/
		};


		that.assignCollection = function(collection) {
			that.collection = collection;
		};


		that.render = function() {
			that.$el.html(StreamListTemplate)
			that.collection.each(function(item) {
				var itemView = new StreamItemView();
				itemView.assignModel(item);
				itemView.render();
				that.$el.find('.stream-list-wrapper').append(itemView.el)

			})
		}


		that.addStreamItem = function() {
			that.numberOfStreams += 1;

			var numberOfStreams = that.collection.models.length;

			var model = new StreamItemModel({
				'name': 'Stream ' + that.numberOfStreams,
				'connectionEstablished': false,
				'id': that.numberOfStreams,
				'label': that.numberOfStreams
			});
			that.collection.add(model);
			that.trigger('modelAdded');
			that.render();
			that.delegateEvents();
		};


		that.establishStream = function(event) {
			var parent = $(event.target).closest('.unconnected');
			var modelID = parent.data('id');
			that.collection.get(modelID).set({'connectionEstablished':true});
			that.render();
		}






		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return StreamListView;

});