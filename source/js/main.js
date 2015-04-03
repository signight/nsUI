'use strict';
require.config({
	paths:{
		jquery: 'lib/jquery.min',
		underscore: 'lib/underscore',
		backbone: 'lib/backbone-min',
		backboneLocalstorage: 'lib/backbone.localStorage-min',
		text: 'lib/text'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		}
	}
});
require(["jquery","views/sidebar"],function ($,sidebarView) {
	// var el =$("#sidebar"),
	// 	tpl = tpl;
	// var data ={
	// 	list:[{"name": "结构1","url":"go.html"},{"name": "结构2","url":"index.html"},{"name": "结构3","url":"index.html"}]
	// }
	// var html=_.template(tpl,data);
	// el.append(html)
	new sidebarView();
})