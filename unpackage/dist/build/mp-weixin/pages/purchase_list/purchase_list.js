(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/purchase_list/purchase_list"],{"436f":function(t,a,e){"use strict";var i=e("8a74"),n=e.n(i);n.a},"8a74":function(t,a,e){},aa13:function(t,a,e){"use strict";var i;e.d(a,"b",(function(){return n})),e.d(a,"c",(function(){return o})),e.d(a,"a",(function(){return i}));var n=function(){var t=this,a=t.$createElement,i=(t._self._c,0===t.tabledatalist.length?e("cbd8"):null);t.$mp.data=Object.assign({},{$root:{m0:i}})},o=[]},b8f6:function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=n(e("5a90"));n(e("05ca"));function n(t){return t&&t.__esModule?t:{default:t}}var o={data:function(){return{active:"1",SearchName:"",tabledatalist:[],page:1,pagesize:10,loadStatus:"loading",isLoadMore:!1}},onLoad:function(){this.getTableList()},onReachBottom:function(){this.isLoadMore||(this.isLoadMore=!0,this.page+=1,this.getTableList())},methods:{onClick:function(t){this.active=t.detail.name,this.tabledatalist=[],this.page=1,this.getTableList()},onSearch:function(t){this.SearchName=t.detail,this.tabledatalist=[],this.page=1,this.getTableList()},getTableList:function(){var a=this,e=this.SearchName;e||(e=null),i.default.request({url:"dts-brand-purchase/getList",method:"post",data:{pageNum:this.page,pageSize:this.pagesize,goodsName:e,type:this.active}}).then((function(e){0==e.data.code?e.data.data.list?(a.tabledatalist=a.tabledatalist.concat(e.data.data.list),e.data.data.list.length<a.pagesize?(a.isLoadMore=!0,a.loadStatus="nomore"):a.isLoadMore=!1):(a.isLoadMore=!0,a.loadStatus="nomore"):(t.showToast({title:e.data.message,icon:"none"}),a.isLoadMore=!1,a.page>1&&(a.page-=1))})).catch((function(e){t.showToast({title:"请求出错",icon:"none"}),a.isLoadMore=!1,a.page>1&&(a.page-=1)}))},add_purchase:function(){t.navigateTo({url:"../add_purchase/add_purchase"})}}};a.default=o}).call(this,e("543d")["default"])},c278:function(t,a,e){"use strict";(function(t){e("3f5e");i(e("66fd"));var a=i(e("eb7a"));function i(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,e("543d")["createPage"])},c4c4:function(t,a,e){"use strict";e.r(a);var i=e("b8f6"),n=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(a,t,(function(){return i[t]}))}(o);a["default"]=n.a},eb7a:function(t,a,e){"use strict";e.r(a);var i=e("aa13"),n=e("c4c4");for(var o in n)"default"!==o&&function(t){e.d(a,t,(function(){return n[t]}))}(o);e("436f");var s,c=e("f0c5"),u=Object(c["a"])(n["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);a["default"]=u.exports}},[["c278","common/runtime","common/vendor"]]]);