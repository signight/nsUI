define(['jquery','underscore','mock'],function ($,_,Mock) {
	var tpl ={
		"list|1-10":[{
			"name":Random.name(),
			"age|1-100":100,
			"email":Random.email()
		}]
	}
	Mock.mock(/\.json/, tpl);
	$("#dataGet").click(function(e) {
		e.preventDefault();
		$.ajax({
			url: 'hello.json',
			type: 'GET',
			dataType: 'json'
		})
		.done(function(data) {
			var tpl=_.template($("#list-temp").html());
			_.each(data.list,function(data) {
			    $("#test tbody").append(tpl(data));
			});
		})	
	});
})