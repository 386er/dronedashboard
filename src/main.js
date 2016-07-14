requirejs(['./common'], function (common) {
    requirejs(['modules/app'], function(App) {
    	var app = new App();
    	app.init();
    });
});