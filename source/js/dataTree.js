define(['jquery','api/api','ztree'],function () {
	var setting ={};
	$.ajax({
		url: 'tree.json',
		type: 'GET',
		dataType: 'json'
	})
	.done(function(data) {
		console.log("LOOOOOOOOOOOOOOOOL!");
		$.fn.zTree.init($("#treeDemo"),setting,data.list1);
	})
})