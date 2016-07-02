
define(['jquery',
	'backbone',
	'underscore',
	'modules/headerController',
	'modules/streams/streamItemViewCollection',
	'modules/streams/streamItemModel',
	'modules/streams/streamItemView',
	'text!modules/streams/templates/streamListTemplate.html',
	'modules/streamModel'
], function($,
	Backbone,
	_,
	HeaderController,
	StreamItemViewCollection,
	StreamItemModel,
	StreamItemView,
	StreamListTemplate,
	StreamModel
	) {

	var StreamListView = function() {

		var that = {};
		that.el ='.stream-list';

		that.events = {
			'click .stream-list-adder': 'addStreamItem',
			'click .submit-stream': 'establishStream'
		}



		that.initialize = function() {
		};


		that.assignCollection = function(collection) {
			that.modelCollection = collection;
		};


		that.render = function() {
			that.$el.html(StreamListTemplate)
			that.modelCollection.each(function(item) {
				var itemView = new StreamItemView();
				itemView.assignModel(item);
				itemView.render();
				that.$el.find('.stream-list-wrapper').append(itemView.el);
				itemView.on('removeStream', function(stream) {
					that.removeStream(stream);
				})

			})
		}


		that.addStreamItem = function() {
/*			var 
				numberOfStreams = that.modelCollection.models.length + 1;
				model = new StreamModel({
					'name': 'Stream ' + numberOfStreams,
					'connectionEstablished': false,
					'id': numberOfStreams,
					'label': numberOfStreams
				});
			that.modelCollection.add(model);
			that.render();
			that.delegateEvents();*/
			that.trigger('modelAdded');
		};


		that.establishStream = function(event) {
			var parent = $(event.target).closest('.unconnected');
			var modelID = parent.data('id');
			that.modelCollection.get(modelID).set({'connectionEstablished':true});
			that.render();
		}

		that.removeStream = function(stream) {
			that.modelCollection.remove(stream);
			that.render();
		}



		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return StreamListView;

});