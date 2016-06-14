
define(['jquery',
	'backbone',
	'underscore',
	'modules/headerController',
	'modules/streams/streamListViewCollection',
	'text!modules/streams/templates/streamListTemplate.html'
], function($,
	Backbone,
	_,
	HeaderController,
	StreamListViewCollection,
	StreamListTemplate
	) {

	var StreamListView = function(numberOfStreams) {

		var that = {};
		that.collection = new StreamListViewCollection();
		that.el ='.stream-list';


		that.render = function() {
			that.$el.html(StreamListTemplate)
		}



		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return StreamListView;

});