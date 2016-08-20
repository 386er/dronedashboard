define(['jquery',
	'backbone',
	'underscore',
	'd3',
	'mustache',
	'text!modules/streams/templates/streamStatsTemplate.html',
	'jstat'
], function($,
	Backbone,
	_,
	d3,
	Mustache,
	StatsTemplate,
	jstat
	) {

	var StatsChart = function() {
		

		var that = {};

		that.instanceID = 'statsChart' + Date.now();
		that.random = d3.random.normal(0, 2.5);
		that.n = 1800;
		that.data = d3.range(that.n).map(function(i) {return that.random();});


		that.render = function() {
			var 
				stats = that.getStats(); 
				html = Mustache.to_html(StatsTemplate, stats);
			that.$el.html(html);
		};


		that.getStats = function() {
			that.stats = jStat(that.data);
			that.mean = that.stats.mean();
			that.variance = that.stats.variance();
			that.std = that.stats.stdev();
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