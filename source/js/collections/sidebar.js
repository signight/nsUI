define([
	'underscore',
	'backbone',
	'models/sidebar'
],function (_,Backbone,Sidebar) {
	var sideBarCollection = Backbone.Collection.extend({
		model:Sidebar,
		url:'api/sidebar.json'
	})
	return new sideBarCollection;
})