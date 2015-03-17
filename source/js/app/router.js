define(['jquery','backbone'],function ($,Backbone) {
	var uiRouter=Backbone.Router.extend({
		routes:{
			"":"main",
			"addon/:query":"showPage"
		},
		main:function() {
			$.ajax({
				url: 'default.html',
				type: 'GET',
				dataType: 'html'
			})
			.done(function(url) {
				$("#contentBody").html(url);
			})
		},
		showPage:function (query) {
			$.ajax({
				url: query+".html",
				type: 'GET',
				dataType: 'html'
				
			})
			.done(function(url) {
				$("#contentBody").html(url);

				if(query == "biaoge"){
				var config = {
					el:"#ztreeContent"
				};
				require(["dataTree"],function(Tree){
						var tree =  new Tree(config);
					})
				}
			
			})


		}
	})
	var myRounter=new uiRouter();
	Backbone.history.start();
})