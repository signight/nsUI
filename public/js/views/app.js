define([
    'jquery',
    'underscore',
    'backbone',
    'collections/sidebar',
    'views/sidebar'
],function ($,_,Backbone,SidebarCollection,SideBarItemView){
    var sidebarView = Backbone.View.extend({
        el:$("#content"),
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
            });
            this.collection = SidebarCollection;
        },
        render:function () {
            this.collection.forEach(function(item) {
               this.append(item);
            },this);
        },
        append:function (item) {
            var sideBarItemView = new SideBarItemView({model:item});
            this.$("#sidebar").append(sideBarItemView.render().el);
        }
    })
    return new sidebarView();
})