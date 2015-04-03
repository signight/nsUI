define([
	'jquery',
	'underscore',
	'backbone',
	'collections/sidebar',
	'text!templates/sidebar.html'
],function ($,_,Backbone,Sidebar,SidebarTpl) {
	var sidebarView = Backbone.View.extend({
		tpl:_.template(SidebarTpl),
		initialize:function () {
			this.render();
		},
		render:function () {
			alert(JSON.stringify(Sidebar.fetch()));
			this.$el.html(this.tpl(Sidebar));
			return this;
		}
	})
	return sidebarView;
})