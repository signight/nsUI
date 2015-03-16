define(['jquery','backbone'],function ($,Backbone) {
	var uiRouter=Backbone.Router.extend({
		routes:{
			"addon/:query":"showPage"
		},
		showPage:function (query) {
			$.ajax({
				url: query+".html",
				type: 'GET',
				dataType: 'html'
				
			})
			.done(function(url) {
				$("#contentBody").html(url);
			})
		}
	})
	var myRounter=new uiRouter();
	Backbone.history.start();
})