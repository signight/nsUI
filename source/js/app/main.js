require.config({
	baseUrl:"../source/js/lib",
	paths:{
		"jquery":"jquery.min",
		"ztree":"../vendor/jquery.ztree.core-3.5.min",
		"indexInit":"../app/indexInit"
	},
	shim: {
		"backbone": {
			deps: ["underscore"],
			exports: "Backbone"
		},
		'underscore' : {
			exports : '_'
		},
		'ztree':{
			deps:['jquery']
		}
	}
});
require(["jquery","indexInit"],function () {
})