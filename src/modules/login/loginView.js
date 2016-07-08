
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

	var StreamItemView = function(numberOfStreams) {

		var that = {};

		that.el = "#login-wrapper-container"
		that.model = {'login': true}

		that.events = {
			'mousedown .button':'buttonDown',
			'mouseup .button':'buttonUp',
			'mouseout .button':'buttonUp',
			'click .tab': 'changeLoginView'
		}

		that.initialize = function() {

		}


		that.buttonDown = function(event) {
			that.$el.find(event.target).addClass('selected');
		};

		that.buttonUp = function(event) {
			that.$el.find(event.target).removeClass('selected');
		};

		that.showCancel = function() {
			that.$el.find('.stream-list-item-cancel').removeClass('hidden');
		};


/*		that.hideCancel = function() {
			that.$el.find('.stream-list-item-cancel').addClass('hidden');
		};
*/

/*		that.removeStream = function() {
			that.trigger('removeStream', that.model)
		};
*/

		that.changeLoginView = function() {
/*			that.$el.find('.tab').toggleClass('selected');*/
			that.model['login'] = !that.model['login'];
			that.render();
		}


		that.render = function() {
		var html = Mustache.to_html(LoginViewTemplate, that.model);
			that.$el.html(html)
		};



		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return StreamItemView;

});