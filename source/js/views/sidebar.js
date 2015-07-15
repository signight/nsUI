define([
	'jquery',
	'underscore',
	'backbone',
	'collections/sidebar',
	'text!templates/sidebar.html','router/router'
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
			this.append()
			return this;
		},
		append:function () {
			var that = this;
			this.collection.forEach(function (model) {
				that.$el.append(that.tpl(model.toJSON()));
			})
		}
	})
	return new sidebarView();;
})