define(['jquery','text!pageInit.html','backbone','_'],function ($,text,Backbone._) {
	var link = Backbone.Model.extend({});
	var linklist = Backbone.Collection.extend({
		model:link,
		url:""
	})
})