'use strict';
require.config({
	paths:{
		jquery: 'lib/jquery.min',
		underscore: 'lib/underscore',
		backbone: 'lib/backbone-min',
		backboneLocalstorage: 'lib/backbone.localStorage-min',
		text: 'lib/text',
		ztree:'vendor/zTree/jquery.ztree.core-3.5',
		mock:'lib/mock-min'
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
require(["jquery","views/app",'dataTree'],function ($) {
})