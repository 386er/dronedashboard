define(['jquery',
	'backbone',
	'underscore',
	'd3'
], function($,
	Backbone,
	_,
	d3
	) {
		
	var ChartModelCollection = function(parameterObj) { 	
	
		var that = {};

	

				
		that = new (Backbone.Collection.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
		
	};
		
	return ChartModelCollection;

});	