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
require(["jquery","views/sidebar"],function ($) {
})