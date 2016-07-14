
define(['jquery',
	'backbone',
	'underscore',
	'mustache',
	'text!modules/login/templates/loginViewTemplate.html'
], function($,
	Backbone,
	_,
	Mustache,
	LoginViewTemplate
	) {

	var LoginView = function() {

		var that = {};

		that.el = "#login-wrapper-container"
		that.model = {'login': true}

		that.events = {
			'mousedown .button':'buttonDown',
			'mouseup .button':'buttonUp',
			'mouseout .button':'buttonUp',
			'click .login-tab': 'changeLoginView',
			'click .login-button': 'loginUser',
			'click .signup-button': 'signupUser'
		}

		that.initialize = function() {

		}


		that.assignRequestController = function(requestController) {
			that.requestController = requestController;
		}


		that.buttonDown = function(event) {
			that.$el.find(event.target).addClass('selected');
		};

		that.buttonUp = function(event) {
			that.$el.find(event.target).removeClass('selected');
		};


		that.changeLoginView = function() {
			that.model['login'] = !that.model['login'];
			that.delegateEvents();
			that.render();
		};

		that.loginUser = function() {
			var inputs = that.$el.find('input')
			var username = inputs[0].value;
			var password = inputs[1].value;
			that.requestController.loginUser(username, password);
		};

		
		that.signupUser = function() {
			var inputs = that.$el.find('input')
			var username = inputs[0].value;
			var password = inputs[1].value;
			that.requestController.signupUser(username, password);
		};


		that.render = function() {
		var html = Mustache.to_html(LoginViewTemplate, that.model);
			that.$el.html(html)
		};



		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return LoginView;

});