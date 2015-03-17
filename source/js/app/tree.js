define(['ztree','backbone'],function ($) {
	
	var zv = Backbone.View.extend({

		initialize:function(config){
			console.log(this.$el.length);
			this.$el.append('Some text');
		}
	})

	return zv;

})