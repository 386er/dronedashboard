define(['jquery',
	'backbone',
	'underscore',
	'mustache',
	'text!modules/dashboard/templates/chartHeaderTemplate.html'
], function($,
	Backbone,
	_,
	Mustache,
	Template
	) {

	var ChartView = function() {
		
		var that = {};
		that.instanceID = 'chartHeaderView' + Date.now();
		that.events = {'blur .chart-label': 'setLabel',
					   'keyup .chart-label': 'checkKey'
		}


		that.assignElement = function(el) {
			that.setElement(el);
		};


		that.assignModel = function(model) {
			that.model = model;
		};


		that.setLabel = function(event) {
			var label = event.target.value;
			that.model.set({'label': label})
		}

		that.checkKey = function(event) {
			if (event.keyCode == 13) {
				that.$el.find('.chart-label:focus').blur();
				that.setLabel(event);
			}
		};

		
		that.render = function() {
			var html = Mustache.to_html(Template, {'label': that.model.get('label')});
			that.$el.html(html)
		};

		that.destroy = function() {
			that.$el.html('');
		}

	
		that = new (Backbone.View.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
	};
	


	return ChartView;

});