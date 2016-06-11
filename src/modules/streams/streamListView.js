
define(['jquery',
	'backbone',
	'underscore',
	'modules/headerController',
	'text!modules/streams/templates/streamListTemplate.html'
], function($,
	Backbone,
	_,
	HeaderController,
	StreamListTemplate
	) {

	var StreamListView = function(numberOfStreams) {

		var that = {};		

		that.el ='.sub-wrapper';

/*		that.assignHeaderController = function(headerController) {
			that.headerController = headerController;
		}
*/

		that.render = function() {
			that.$el.html(StreamListTemplate)
		}



		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return StreamListView;

});