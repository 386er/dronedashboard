requirejs(['./common'], function (common) {
    requirejs(['modules/login/loginController'], function(LoginController) {
    	var loginController = new LoginController();
    	loginController.startLogin();
    });
});