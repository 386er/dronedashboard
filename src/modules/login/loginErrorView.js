
define(['jquery',
	'backbone',
	'underscore',
	'mustache',
	'text!modules/login/templates/loginErrorViewTemplate.html'
], function($,
	Backbone,
	_,
	Mustache,
	LoginErrorViewTemplate
	) {

	var LoginErrorView = function() {

		var that = {};

		that.el = "#login-wrapper-pusher"


		that.render = function(model) {
			if (model === undefined) {
					model = {};
				}
		var html = Mustache.to_html(LoginErrorViewTemplate, model);
			that.$el.html(html)
		};



		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return LoginErrorView;

});