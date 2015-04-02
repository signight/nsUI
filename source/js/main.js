require.config({
	paths:{
		"jquery":"lib/jquery.min",
		"backbone":"lib/backbone-min",
		"backbonelocalstorage":"lib/backbone.localStorage-min",
		"underscore":"lib/underscore",
		"text":"lib/text",
		"mock":"lib/mock"
	},
	shim: {
		"backbone": {
			deps: ["underscore"],
			exports: "Backbone"
		},
		'underscore' : {
			exports : '_'
		}
	}
});
require(["jquery"],function () {
})