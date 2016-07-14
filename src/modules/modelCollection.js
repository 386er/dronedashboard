define(['jquery',
	'backbone',
	'underscore',
	'd3'
], function($,
	Backbone,
	_,
	d3
	) {
		
	var ModelCollection = function(parameterObj) { 	
	
		var that = {};


		that.destroy = function () {
			that.models.forEach(function(model) {
				model = undefined;
			})
			that.models = undefined;
		};


				
		that = new (Backbone.Collection.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
		
	};
		
	return ModelCollection;

});	