define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/sidebar.html',
	'router/router'
],function ($,_,Backbone,sidebarTemplate){
	var sidebarView = Backbone.View.extend({
		tpl:_.template(sidebarTemplate),
		render:function () {
			this.$el.append(this.tpl(this.model.toJSON()));
			return this;
		}
	})
	return sidebarView;
})