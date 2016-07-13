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
		that.requestController = new RequestController();

		that.startLogin = function() {
			that.render();
			that.loginView = new LoginView();
			that.loginView.assignRequestController(that.requestController);
			that.loginView.render();
		}


		that.render = function() {
			that.$el.html(LoginControllerTemplate);
		}


		that = new (Backbone.View.extend(that))();
		return that;

	}

	return LoginController;

});


