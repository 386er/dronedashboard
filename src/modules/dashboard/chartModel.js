define(['jquery',
	'backbone',
	'underscore',
], function($,
	Backbone,
	_
	) {
		
	var ChartModel = function(parameterObj) { 	
	
		var that = {};
	
		that.idAttribute = "_id";

		that.defaults = {
			'chart-type': 'scatter'
		};
				
		that = new (Backbone.Model.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
		
	};
		
	return ChartModel;

});	