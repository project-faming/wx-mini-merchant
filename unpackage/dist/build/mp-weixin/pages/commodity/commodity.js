(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/commodity/commodity"],{"4d7d":function(t,a,e){"use strict";var i=e("ea16"),o=e.n(i);o.a},"875a":function(t,a,e){"use strict";e.r(a);var i=e("e514"),o=e.n(i);for(var n in i)"default"!==n&&function(t){e.d(a,t,(function(){return i[t]}))}(n);a["default"]=o.a},"8a4f":function(t,a,e){"use strict";(function(t){e("3f5e");i(e("66fd"));var a=i(e("8d66"));function i(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,e("543d")["createPage"])},"8d66":function(t,a,e){"use strict";e.r(a);var i=e("d09d"),o=e("875a");for(var n in o)"default"!==n&&function(t){e.d(a,t,(function(){return o[t]}))}(n);e("4d7d");var s,d=e("f0c5"),c=Object(d["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);a["default"]=c.exports},d09d:function(t,a,e){"use strict";var i;e.d(a,"b",(function(){return o})),e.d(a,"c",(function(){return n})),e.d(a,"a",(function(){return i}));var o=function(){var t=this,a=t.$createElement,i=(t._self._c,0===t.tabledatalist.length?e("cbd8"):null);t.$mp.data=Object.assign({},{$root:{m0:i}})},n=[]},e514:function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=s(e("05ca")),o=s(e("1de7")),n=s(e("5a90"));function s(t){return t&&t.__esModule?t:{default:t}}var d={data:function(){return{active:"0",SearchName:"",tabledatalist:[],page:1,pagesize:10,loadStatus:"loading",isLoadMore:!1}},onShow:function(){this.tabledatalist=[],this.page=1,this.getTableList()},onReachBottom:function(){this.isLoadMore||(this.isLoadMore=!0,this.page+=1,this.getTableList())},methods:{onSearch:function(t){this.SearchName=t.detail,this.tabledatalist=[],this.page=1,this.getTableList()},onClick:function(t){this.active=t.detail.name,this.tabledatalist=[],this.page=1,this.getTableList()},commoditydetails:function(a){t.navigateTo({url:"../commodity_details/commodity_details?id="+a+"&type="+this.active})},getTableList:function(){var a=this,e=this.SearchName;e||(e=null);var i="";0==this.active&&(i="teamGoods/getList"),1==this.active&&(i="goods/getList"),n.default.request({url:i,method:"post",data:{pageNum:this.page,pageSize:this.pagesize,goodsName:e}}).then((function(e){0==e.data.code?e.data.data.list?(a.tabledatalist=a.tabledatalist.concat(e.data.data.list),e.data.data.list.length<a.pagesize?(a.isLoadMore=!0,a.loadStatus="nomore"):a.isLoadMore=!1):(a.isLoadMore=!0,a.loadStatus="nomore"):(t.showToast({title:e.data.message,icon:"none"}),a.isLoadMore=!1,a.page>1&&(a.page-=1))})).catch((function(e){t.showToast({title:"请求出错",icon:"none"}),a.isLoadMore=!1,a.page>1&&(a.page-=1)}))},add_groupwork:function(){t.navigateTo({url:"../commodity_edit/commodity_edit"})},commedit:function(a){t.navigateTo({url:"../commodity_edit/commodity_edit?id="+a})},putshelves:function(a){var e=this;o.default.confirm({title:"上架",message:"是否将此商品上架？"}).then((function(){n.default.request({url:"goods/changeStatus",method:"get",data:{id:a}}).then((function(a){0==a.data.code?((0,i.default)("上架成功"),e.tabledatalist=[],e.page=1,e.getTableList()):t.showToast({title:a.data.message,icon:"none"})})).catch((function(a){t.showToast({title:"请求出错",icon:"none"})}))})).catch((function(){(0,i.default)("取消上架")}))},offshelf:function(a){var e=this;o.default.confirm({title:"下架",message:"是否将此商品下架？"}).then((function(){n.default.request({url:"goods/changeStatus",method:"get",data:{id:a}}).then((function(a){0==a.data.code?((0,i.default)("下架成功"),e.tabledatalist=[],e.page=1,e.getTableList()):t.showToast({title:a.data.message,icon:"none"})})).catch((function(a){t.showToast({title:"请求出错",icon:"none"})}))})).catch((function(){(0,i.default)("取消下架")}))}}};a.default=d}).call(this,e("543d")["default"])},ea16:function(t,a,e){}},[["8a4f","common/runtime","common/vendor"]]]);