$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/log/list',
        datatype: "json",
        //显示列值
        colModel: [			
			{ label: 'id', name: 'id', width: 30, key: true },
			{ label: '用户名', name: 'username', width: 50 }, 			
			{ label: '用户操作', name: 'operation', width: 70 }, 			
			{ label: '请求方法', name: 'method', width: 150 }, 			
			{ label: '请求参数', name: 'params', width: 80 },
            { label: '执行时长(毫秒)', name: 'time', width: 80 },
			{ label: 'IP地址', name: 'ip', width: 70 }, 			
			{ label: '创建时间', name: 'createDate', width: 90 }			
        ],
		viewrecords: true, //是否在浏览导航栏显示记录总数
        height: 385,
        rowNum: 10, //每页显示记录数
		rowList : [10,30,50],
        rownumbers: true, //用于改变显示行数的下拉列表框的元素数组
        rownumWidth: 25, 
        autowidth:true,
        multiselect: false, //不能多选
        pager: "#jqGridPager", //导航栏
        //解析从server端发送的数据，例如root赋值为page.list的内容
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        //设置了grid将要向server传递的参数名称
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		q:{
			key: null
		},
	},
	methods: {
		query: function () {
			vm.reload();
		},
		reload: function (event) {
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
                // postData为发送请求的数据，以key:value的形式发送，多个参数可以以逗号”,”间隔；
				postData:{'key': vm.q.key},
                //page为指定查询结果跳转到第几页，这个是作者的bug,应该跳到第一页，不然目前页面在第三页，查询后还在第三页
                page:page
            }).trigger("reloadGrid");
			//重新载入jqGrid表格
		}
	}
});