define(['jquery',
	'backbone',
	'underscore',
	'modules/login/loginView',
	'modules/requestController',
	'text!modules/login/templates/loginControllerTemplate.html'
], function($,
	Backbone,
	_,
	LoginView,
	RequestController,
	LoginControllerTemplate
	) {


	var LoginController = function() {
		
		var that = {};
		that.el = 'body'

		that.init = function() {
			that.render();
			that.loginView = new LoginView();
			that.loginView.assignRequestController(that.requestController);
			that.loginView.render();
		}

		that.assignRequestController = function(requestController) {
			that.requestController = requestController;
		}


		that.render = function() {
			that.$el.html(LoginControllerTemplate);
		}

		that.destroy = function() {
			that.loginView.remove();
			that.off();
			that.$el.html('');
		};


		that = new (Backbone.View.extend(that))();
		return that;

	}

	return LoginController;

});


