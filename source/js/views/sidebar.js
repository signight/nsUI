define([
	'jquery',
	'underscore',
	'backbone',
	'collections/sidebar',
	'text!templates/sidebar.html'
],function ($,_,Backbone,SidebarCollection,sidebarTemplate){
	var sidebarView = Backbone.View.extend({
		el:$("#sidebar"),
		tpl:_.template(sidebarTemplate),
		collection:SidebarCollection,
		initialize:function () {
			this.listenTo(SidebarCollection,'reset',this.render);
			SidebarCollection.fetch({
				reset:true,
				success:function (collection,resp) {
					console.log("<------------(◕ω＜)☆/请求发送成功----------->");
					for (var i = 0; i < collection.models.length; i++) {
						console.log(collection.models[i].toJSON());
					};
					console.log("<------------(●˘◡˘●)请求发送结束----------->");
				}
			})
		},
		render:function () {
			var items = this.collection.models;
			for (var i = 0; i < items.length; i++) {
				this.$el.append(this.tpl(items[i].toJSON()));
			};
			return this;
		}
	})
	return new sidebarView();;
})