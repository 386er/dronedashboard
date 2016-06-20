
define(['jquery',
	'backbone',
	'underscore'
], function($,
	Backbone,
	_
	) {

	var RequestController = function() {

		var that = {};
		that.app = app || {};

		that.getData = function() {

			$.get( "localhost:8080/index.html", function( data ) {
				console.log(data)
			});


		};

		that = new (Backbone.View.extend(that))();
		return that;

	};



/*
Yes, if you follow CORS rules
 
386er
386er
which means ? can you give me alink ?
 
Kevin B
Kevin B
or reverse proxy the http server on 3000 to a folder within the 8080 server.
or reverse proxy the api to a subfolder of the 3000
*/

	return RequestController;

});