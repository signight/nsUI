require.config({
	baseUrl:"../source/js/lib/",
	paths:{
		"jquery":"jquery.min",
		"underscore":"underscore",
		"backbone":"backbone-min",
		"Backbone.LocalSorage":"backbone.localStorage-min",
		"mock":'mock-min',
		"app":"../app/app"
		
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
require(["app"],function () {
	
})