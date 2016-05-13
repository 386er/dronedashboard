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


		that.events = {
			'dblclick': 'setLine'
		};


		that.assignElement = function(el) {
			that.setElement(el);
		};


		that.setLine = function() {
			that.$el.html('PETER')
		}

		

	
		that = new (Backbone.View.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
	};
	


	return ChartView;

});