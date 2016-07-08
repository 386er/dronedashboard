requirejs(['./common'], function (common) {
    requirejs(['modules/app'], function(app) {
    	app.init();
    });
});