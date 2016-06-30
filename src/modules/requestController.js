
define(['jquery',
	'backbone',
	'underscore'
], function($,
	Backbone,
	_
	) {

	var RequestController = function() {

		var that = {};
		that.app = app || {};



		that.getStreams = function() {
			$.ajax({
				type: "GET",
				url: 'streams',
				success: function(data) {
					that.trigger('streamsAvailable', data);
				}
			});
		};


		that.updateStreams = function(models, segmentation) {		
			$.ajax({
				type: "PUT",
				url: 'streams',
				contentType: "application/json",
				data: JSON.stringify(
					{"models": models,
					 "segmentation": segmentation
				})
			});					

		};


		that.createStream = function(models, segmentation) {
			$.ajax({
				type: "POST",
				url: 'streams',
				contentType: "application/json",
				data: JSON.stringify({"name": "cba" + Math.random(),
					 "models": models,
					 "segmentation": segmentation
				})
			});
		};



		that.saveStreams = function(models, segmentation) {
			$.ajax({
				type: "GET",
				url: 'streams',
				success: function(data) {
					if (data.length === 0) {
						that.createStream(models, segmentation);
					} else {
						that.updateStreams(models, segmentation);
					}
				}
			});
		};



		that = new (Backbone.View.extend(that))();
		return that;

	};

	return RequestController;

});