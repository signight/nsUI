define(['jquery','api/api','text!../templates/table1.html'],function ($,data,tpl) {
	$("#doSearch").click(function(event) {
        event.preventDefault();
        $.ajax({
            url: 'table1.json',
            type: 'get',
            dataType: 'json'
        })
        .done(function(data) {
            var tpl = _.template(tpl);
            $("#table1 tbody").html("");
            //$("#jiekuanTable tbody").append(_.template($("#test").html(),data));
            _.each(data.list1,function (data) {
                $("#table1 tbody").append(tpl(data))
            });
            // _.each(data.list2,function (data) {
            //     $("#baoxiaoTable tbody").append(tpl(data))
            // });
        })        
    });
    // $("#form_line_submit").click(function() {
    //     event.preventDefault();
    //     $("#list").hide();
    //     var tpl = _.template($("#test2").html());
    //     _.each(data2.list,function (data) {
    //         $("#hexiaojieguoTable tbody").append(tpl(data))
    //     });
    //     $("#hexiaojieguoTable").show();
    //     $(this).hide();
    // });
})