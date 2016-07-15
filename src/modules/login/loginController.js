define(['jquery',
	'backbone',
	'underscore',
	'mustache',
	'modules/login/loginView',
	'modules/login/loginErrorView',
	'modules/requestController',
	'text!modules/login/templates/loginControllerTemplate.html'
], function($,
	Backbone,
	_,
	Mustache,
	LoginView,
	LoginErrorView,
	RequestController,
	LoginControllerTemplate
	) {


	var LoginController = function() {
		
		var that = {};
		that.el = 'body'

		that.init = function() {
			that.render();
			that.loginErrorView = new LoginErrorView();
			that.loginErrorView.render();
			that.loginView = new LoginView();
			that.loginView.assignRequestController(that.requestController);
			that.loginView.render();
		}

		that.assignRequestController = function(requestController) {
			that.requestController = requestController;
		}


		that.render = function(model) {
			if (model === undefined) {
				model = {};
			}
			var html = Mustache.to_html(LoginControllerTemplate, model);
			that.$el.html(html);
		}

		that.destroy = function() {
			that.loginView.remove();
			that.off();
			that.$el.html('');
		};


		that.renderWrongUserOrPassword = function() {
			that.loginErrorView.render({'wrongUserOrPassword':true})
		};


		that = new (Backbone.View.extend(that))();
		return that;

	}

	return LoginController;

});


