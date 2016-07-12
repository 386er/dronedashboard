define(['jquery',
	'backbone',
	'underscore',
	'modules/login/loginView',
	'modules/requestController'
], function($,
	Backbone,
	_,
	LoginView,
	RequestController
	) {

	var LoginController = {

		init : function() {

			var loginView = new LoginView();
			var  requestController = new RequestController();

			loginView.assignRequestController(requestController);
			loginView.render();
		}

	};

	return LoginController;

});
