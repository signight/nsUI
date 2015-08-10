'use strict';
require.config({
	paths:{
		jquery: 'lib/jquery.min',
		underscore: 'lib/underscore',
		backbone: 'lib/backbone-min',
		backboneLocalstorage: 'lib/backbone.localStorage-min',
		text: 'lib/text',
		ztree:'vendor/zTree/jquery.ztree.core-3.5',
		highlight:'vendor/prettify',
		mock:'lib/mock-min',
		doc:'vendor/docs.min'
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
		highlight:{
			deps:['jquery'],
			exports:'highlight'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		}
	}
});
require(["jquery","highlight","views/app",'routers/router'],function ($) {
	 prettyPrint();
})