define(['jquery',
	'backbone',
	'underscore',
	'd3'
], function($,
	Backbone,
	_,
	d3
	) {
		
	var ChartViewCollection = function() { 	
	
		var that = {};
		that.views = {}


		that.add = function(view) {
			var viewModelID = view.getModelID();
			that.views[viewModelID] = view;
		};


		that.remove = function(id) {
			that.views[id] = undefined;
			delete that.views[id];
		};


		that.get = function(id) {
			return that.views[id];
		};


		that.getViews = function() {
			var
				viewsContainer = [],
				keys = _.keys(that.views);

			keys.forEach(function(key) {
				viewsContainer.push(that.views[key])
			});

			return viewsContainer;
		};


		that = new (Backbone.View.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
		
	};
		
	return ChartViewCollection;

});	