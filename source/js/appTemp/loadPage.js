define(['jquery'], function($) {
   loadDialog:function (query) {
   	 $.ajax({
        url: query + ".html",
        type: 'GET',
        dataType: 'html'

   		 })
	    .done(function(url) {
	        $("#contentBody").html(url);
	    })
   }
})
