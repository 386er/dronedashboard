define(['jquery',
	'backbone',
	'underscore',
], function($,
	Backbone,
	_
	) {
		
	var StreamItemModel = function(parameterObj) { 	
	
		var that = {};
	
		that.idAttribute = "_id";
				
		that = new (Backbone.Model.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
		
	};
		
	return StreamItemModel;

});	