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


		that.template = '<input value="   "></input>'


		that.assignElement = function(el) {
			that.setElement(el);
			that.setLine();
		};


		that.setLine = function() {
			that.$el.html(that.template)
		}

		

	
		that = new (Backbone.View.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
	};
	


	return ChartView;

});