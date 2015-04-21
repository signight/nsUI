define([
	'underscore',
	'backbone',
	'models/sidebar'
],function (_,Backbone,Sidebar) {
	var SidebarCollection = Backbone.Collection.extend({
		model:Sidebar,
		url:'source/js/api/sidebar.json'
	})
	return new SidebarCollection;
})