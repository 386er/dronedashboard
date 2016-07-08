requirejs(['./common'], function (common) {
    requirejs(['modules/login/loginController'], function(loginController) {
    	loginController.init();
    });
});