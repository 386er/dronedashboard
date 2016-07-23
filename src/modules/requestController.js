
define(['jquery',
	'backbone',
	'underscore'
], function($,
	Backbone,
	_
	) {

	var RequestController = function() {

		var that = {};


		that.getStreams = function() {
			$.ajax({
				type: "GET",
				url: 'streams/' + window.localStorage.userID,
				beforeSend: function(xhr){xhr.setRequestHeader('x-access-token', window.localStorage.token);},
				success: function(data) {
					that.trigger('streamsAvailable', data);
				},
				error: function(error) {
					if (error.status == 401 || error.status == 403) {
						console.log('Status: ' + error.status);
						console.log(error.responseText);
						that.trigger('closeSession');
					} else {
						console.log('Streams could not be loaded: ' + error.status);
					}
				}
			});
		};


		that.updateStreams = function(models, segmentation) {
			$.ajax({
				type: "PUT",
				url: 'streams/' + window.localStorage.userID,
				beforeSend: function(xhr){xhr.setRequestHeader('x-access-token', window.localStorage.token);},
				contentType: "application/json",
				data: JSON.stringify(
					{
						"models": models,
						"segmentation": segmentation
				}),
				success: function(data) {
					console.log('Streams Updated!');
				},
				error: function(error) {
					if (error.status == 401 || error.status == 403) {
						console.log('Status: ' + error.status);
						console.log(error.responseText);
						that.trigger('closeSession');
					} else {
						console.log('Streams could not be updated: ' + error.status);
					}
				}
			});					

		};


		that.loginUser = function(username, password) {
			$.ajax({
				type: "POST",
				url: 'users/login',
				contentType: "application/json",
				data: JSON.stringify({
					"username": username,
					"password": password
				}),
				success: function(data, textStatus) {
					window.localStorage['token'] = data.token;
					window.localStorage['userID'] = data.userID;
					if (typeof data.redirect == 'string') {
						that.trigger('startSession');
					}
				},	
				error: function(data) {
						console.log(data.responseJSON.err.message)
						that.trigger('wrongUserOrPassword')
				}   
			});
		};


		that.logoutUser = function(username, password) {
			$.ajax({
				type: "GET",
				url: 'users/logout',
				contentType: "application/json",
				success: function(data, textStatus) {
					window.localStorage['token'] = undefined;
					window.localStorage['userID'] = undefined;
					if (typeof data.redirect == 'string') {
						that.trigger('closeSession');
					}
				}
			});
		};


		that.signupUser = function(username, password) {
			$.ajax({
				type: "POST",
				url: 'users/register',
				contentType: "application/json",
				data: JSON.stringify({
					"username": username,
					"password": password
				}),
				success: function(data, textStatus) {
					console.log('User ' + username + ' successfully registered!');
					that.trigger('userRegistered');
				},
				error: function(error) {
					console.log('Could not register user!');
				}
			});
		};



		that = new (Backbone.View.extend(that))();
		return that;

	};

	return RequestController;

});