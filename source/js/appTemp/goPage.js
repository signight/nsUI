define(['jquery'], function($) {
    var loadPage = function(target, query) {
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
