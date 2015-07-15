define([
    'jquery',
    'underscore',
    'backbone',
],function ($,_,Backbone) {
    var TodoRouter = Backbone.Router.extend({
        routes:{
            "*jump":"showAbout"
        },
        showAbout:function (param) {
            alert(param)
        }
    })

    var myTodoRouter = new TodoRouter();

    Backbone.history.start();
})