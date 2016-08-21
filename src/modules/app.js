
define(['jquery',
	'backbone',
	'underscore',
	'modules/mainController',
	'modules/requestController',
	'modules/login/loginController',
	'socket'
], function($,
	Backbone,
	_,
	MainController,
	RequestController,
	LoginController,
	io
	) {

	var app = function() {

		var that = {};
		window.app = {};
		that.app = window.app;
		that.app['windowFocued'] = true;
		that.mainController = new MainController();
		that.requestController = new RequestController();

		that.init = function() {


			that.mainController.assignRequestController(that.requestController);
			that.mainController.init();

			that.requestController.on('startSession', function () {
				that.loginController.destroy();
				that.loginController = undefined;
				that.mainController = new MainController();
				that.mainController.assignRequestController(that.requestController);
				that.mainController.init();
			});

			that.requestController.on('closeSession', function() {
				that.mainController.destroy();
				that.mainController = undefined;
				that.loginController = new LoginController();
				that.loginController.assignRequestController(that.requestController);
				that.loginController.init();
			});


			that.requestController.on('wrongUserOrPassword', function() {
				that.loginController.renderWrongUserOrPassword();
			});


			that.requestController.on('userRegistered', function() {
				that.loginController.renderUserRegistered();
			});


/*			$(window).focus(function() {
				that.app['windowFocued'] = true;
			});

			$(window).blur(function() {
				that.app['windowFocued'] = false;
			});*/


		};


		return that;
	};

	return app;

});