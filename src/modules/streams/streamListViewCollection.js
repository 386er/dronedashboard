define(['jquery',
	'backbone',
	'underscore',
	'd3'
], function($,
	Backbone,
	_,
	d3
	) {
		
	var StreamListViewCollection = function() { 	
	
		var that = {};

	

				
		that = new (Backbone.Collection.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
		
	};
		
	return StreamListViewCollection;

});	