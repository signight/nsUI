define([
    'jquery',
    'underscore',
    'backbone',
    'views/app'
],function ($,_,Backbone) {
    var TodoRouter = Backbone.Router.extend({
        routes:{
            "/:action":"loadView",
            "*actions": "defaultRoute" 
        }
    })
    var myTodoRouter = new TodoRouter();
    myTodoRouter.on('route:defaultRoute', function (actions) {
        var actions = actions ? actions : "default.html";
        $("#contentBody").load('temp/'+actions);
    });
    myTodoRouter.on('route:loadView', function (action) {
        $("#contentBody").load('temp/'+action);
    });
    Backbone.history.start();
})