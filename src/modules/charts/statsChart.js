define(['jquery',
	'backbone',
	'underscore',
	'd3',
	'mustache',
	'text!modules/streams/templates/streamStatsTemplate.html',
], function($,
	Backbone,
	_,
	d3,
	Mustache,
	StatsTemplate
	) {

	var StatsChart = function() {
		

		var that = {};

		that.instanceID = 'statsChart' + Date.now();
		that.random = d3.random.normal(0, 2.5);
		that.n = 1800;
		that.data = d3.range(that.n).map(function(i) {return that.random();});


		that.render = function() {
			var stats = that.getStats();
			var html = Mustache.to_html(StatsTemplate, stats);
			that.$el.html(html);
		};


		that.getStats = function() {

			var array = [];

			that.mean = d3.sum(that.data)/that.n;
			that.data.forEach(function(date) { array.push(Math.pow((date - that.mean),2)); });
			that.variance = d3.sum(array);
			that.std = Math.pow(that.variance,0.5);

			return {'mean':that.mean, 'std': that.std, 'variance':that.variance, 'n':that.n};
		};





		that.assignElement = function(el) {
			that.setElement(el);
		};


		that.destroy = function() {
			that.$el.html('');
			that.$el.off();
		};



			
		that = new (Backbone.View.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
	};
	


	return StatsChart;

});