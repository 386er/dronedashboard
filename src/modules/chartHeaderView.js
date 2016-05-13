define(['jquery',
	'backbone',
	'underscore'
], function($,
	Backbone,
	_
	) {

	var ChartView = function() {
		
		var that = {};
		that.instanceID = 'chartHeaderView' + Date.now();

		
		that.render = function() {
		};

	
		that = new (Backbone.View.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
	};
	


	return ChartView;

});