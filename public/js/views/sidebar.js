define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/sidebar.html'
],function ($,_,Backbone,sidebarTemplate){
	var sidebarView = Backbone.View.extend({
		tpl:_.template(sidebarTemplate),
		tagName:"li",
		render:function () {
			this.$el.append(this.tpl(this.model.toJSON()));
			return this;
		},
		events:{
			"click a":"active"
		},
		active:function () {
			this.$el.siblings().removeClass().end().addClass('active')
		}
	})
	return sidebarView;
})