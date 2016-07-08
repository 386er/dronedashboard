
define(['jquery',
	'backbone',
	'underscore',
	'mustache',
	'text!modules/login/templates/loginViewTemplate.html'
], function($,
	Backbone,
	_,
	Mustache,
	LoginViewTemplate
	) {

	var StreamItemView = function(numberOfStreams) {

		var that = {};

		that.el = "#login-wrapper-container"

		that.events = {
/*			'mouseover':'showCancel',
			'mouseout':'hideCancel',
			'click .stream-list-item-cancel': 'removeStream'*/
		}

		that.initialize = function() {

		}


/*		that.assignModel = function(model) {
			that.model = model;
		};

		that.showCancel = function() {
			that.$el.find('.stream-list-item-cancel').removeClass('hidden');
		};


		that.hideCancel = function() {
			that.$el.find('.stream-list-item-cancel').addClass('hidden');
		};


		that.removeStream = function() {
			that.trigger('removeStream', that.model)
		};*/


		that.render = function() {
		var html = Mustache.to_html(LoginViewTemplate, {});
			that.$el.html(html)
		};



		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return StreamItemView;

});