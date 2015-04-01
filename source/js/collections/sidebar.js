define([
	'underscore',
	'backbone',
	'models/sidebar'
],function (_,Barbone,Sidebar) {
	var sideBarCollection = Backbone.Collection.extend({
		model:SideBar,
		url:''
	})
	return new sideBarCollection;
})