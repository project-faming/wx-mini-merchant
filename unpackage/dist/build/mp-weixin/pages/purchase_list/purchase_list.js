(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/purchase_list/purchase_list"],{"2a9f":function(t,a,e){"use strict";e.r(a);var i=e("e27c"),n=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(a,t,(function(){return i[t]}))}(o);a["default"]=n.a},7427:function(t,a,e){"use strict";var i;e.d(a,"b",(function(){return n})),e.d(a,"c",(function(){return o})),e.d(a,"a",(function(){return i}));var n=function(){var t=this,a=t.$createElement,i=(t._self._c,0===t.tabledatalist.length?e("d5b2"):null);t.$mp.data=Object.assign({},{$root:{m0:i}})},o=[]},"8f94":function(t,a,e){"use strict";e.r(a);var i=e("7427"),n=e("2a9f");for(var o in n)"default"!==o&&function(t){e.d(a,t,(function(){return n[t]}))}(o);e("a70a");var s,u=e("f0c5"),c=Object(u["a"])(n["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);a["default"]=c.exports},9059:function(t,a,e){},a70a:function(t,a,e){"use strict";var i=e("9059"),n=e.n(i);n.a},c72c:function(t,a,e){"use strict";(function(t){e("369d");i(e("66fd"));var a=i(e("8f94"));function i(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,e("543d")["createPage"])},e27c:function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=n(e("6e6e"));n(e("058e"));function n(t){return t&&t.__esModule?t:{default:t}}var o={data:function(){return{active:"1",SearchName:"",tabledatalist:[],page:1,pagesize:10,loadStatus:"loading",isLoadMore:!1}},onLoad:function(){this.getTableList()},onReachBottom:function(){this.isLoadMore||(this.isLoadMore=!0,this.page+=1,this.getTableList())},methods:{onClick:function(t){this.active=t.detail.name,this.tabledatalist=[],this.page=1,this.getTableList()},onSearch:function(t){this.SearchName=t.detail,this.tabledatalist=[],this.page=1,this.getTableList()},getTableList:function(){var a=this,e=this.SearchName;e||(e=null),i.default.request({url:"dts-brand-purchase/getList",method:"post",data:{pageNum:this.page,pageSize:this.pagesize,goodsName:e,type:this.active}}).then((function(e){0==e.data.code?e.data.data.list?(a.tabledatalist=a.tabledatalist.concat(e.data.data.list),e.data.data.list.length<a.pagesize?(a.isLoadMore=!0,a.loadStatus="nomore"):a.isLoadMore=!1):(a.isLoadMore=!0,a.loadStatus="nomore"):(t.showToast({title:e.data.message,icon:"none"}),a.isLoadMore=!1,a.page>1&&(a.page-=1))})).catch((function(e){t.showToast({title:"请求出错",icon:"none"}),a.isLoadMore=!1,a.page>1&&(a.page-=1)}))},add_purchase:function(){t.navigateTo({url:"../add_purchase/add_purchase"})}}};a.default=o}).call(this,e("543d")["default"])}},[["c72c","common/runtime","common/vendor"]]]);