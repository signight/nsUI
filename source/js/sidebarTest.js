define([
	'jquery',
	'backbone',
	'text!templates/sidebar.html'
],function ($,Backbone,tpl) {
	var stu= Backbone.Model.extend({
		defaults:{

		},
		idAttribute:"code"
	})
	var stulist =Backbone.Collection.extend({
		model:stu,
		url:'api/sidebar.json',
		initialize:function () {
			this.on('add',function (model,res,opt) {
				console.log(stuList.models[0]);
			})
		}
		
	})
	var stuView = Backbone.View.extend({
		el:$("#sidebar"),
		tpl:_.template(tpl),
		initialize:function () {
			this.listenTo(stuList,'reset',this.render);
		},
		render:function () {
			var items = this.collection.models;
			for (var i = 0; i < items.length; i++) {
				this.$el.append(this.tpl(items[i].toJSON()));
			};
		}
	})
	var stuList = new stulist();
	var view = new stuView({collection:stuList});
	stuList.fetch({
		reset:true,
		success:function (collection,resp) {
			console.log("<------------(◕ω＜)☆/请求发送成功----------->");
			for (var i = 0; i < collection.models.length; i++) {
				console.log(collection.models[i].toJSON());
			};
			console.log("<------------(●˘◡˘●)请求发送结束----------->");
		}
	});
})