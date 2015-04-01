require.config({
	paths:{
		"jquery":"lib/jquery.min"
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
require(["jquery","views/index"],function () {
})