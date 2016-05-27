define(['jquery',
	'backbone',
	'underscore',
	'mustache',
	'text!modules/templates/chartHeaderTemplate.html'
], function($,
	Backbone,
	_,
	Mustache,
	Template
	) {

	var ChartView = function() {
		
		var that = {};
		that.instanceID = 'chartHeaderView' + Date.now();


		that.assignElement = function(el) {
			that.setElement(el);
		};


		that.assignModel = function(model) {
			that.model = model;
		};


		that.render = function() {
			var html = Mustache.to_html(Template, {'label': that.model.get('label')});
			that.$el.html(html)
		};

	
		that = new (Backbone.View.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
	};
	


	return ChartView;

});