define(['jquery',
	'backbone',
	'underscore',
	'modules/login/loginView'
], function($,
	Backbone,
	_,
	LoginView
	) {

	var LoginController = {

		init : function() {

			var loginView = new LoginView();
			loginView.render();
		}

	};

	return LoginController;

});
