(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order_list/order_list"],{"4cc3":function(e,t,a){},"59c7":function(e,t,a){"use strict";a.r(t);var s=a("c27a"),o=a("8d79");for(var i in o)"default"!==i&&function(e){a.d(t,e,(function(){return o[e]}))}(i);a("af4f");var n,r=a("f0c5"),d=Object(r["a"])(o["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],n);t["default"]=d.exports},"8d79":function(e,t,a){"use strict";a.r(t);var s=a("fed0"),o=a.n(s);for(var i in s)"default"!==i&&function(e){a.d(t,e,(function(){return s[e]}))}(i);t["default"]=o.a},af4f:function(e,t,a){"use strict";var s=a("4cc3"),o=a.n(s);o.a},c27a:function(e,t,a){"use strict";var s;a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return i})),a.d(t,"a",(function(){return s}));var o=function(){var e=this,t=e.$createElement,s=(e._self._c,0===e.tabledatalist.length?a("cbd8"):null);e._isMounted||(e.e0=function(t){e.formdata.expressName=t.detail},e.e1=function(t){e.formdata.expressNumber=t.detail}),e.$mp.data=Object.assign({},{$root:{m0:s}})},i=[]},d034:function(e,t,a){"use strict";(function(e){a("3f5e");s(a("66fd"));var t=s(a("59c7"));function s(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("543d")["createPage"])},fed0:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=i(a("5a90")),o=i(a("05ca"));i(a("1de7"));function i(e){return e&&e.__esModule?e:{default:e}}var n={data:function(){return{active:"1",tabledatalist:[],orderid:"",formdata:{expressName:"",expressNumber:""},page:1,pagesize:10,loadStatus:"loading",isLoadMore:!1,delivershow:!1}},onShow:function(){this.page=1,this.tabledatalist=[],this.getTableList()},onReachBottom:function(){this.isLoadMore||(this.isLoadMore=!0,this.page+=1,this.getTableList())},methods:{onClick:function(e){this.active=e.detail.name,this.page=1,this.tabledatalist=[],this.getTableList()},orderdetails:function(t){e.navigateTo({url:"../order_details/order_details?id="+t})},getTableList:function(){var t=this,a=this.active;1==a&&(a=null),s.default.request({url:"order/getList",method:"post",data:{pageNum:this.page,pageSize:this.pagesize,orderStatus:a}}).then((function(a){0==a.data.code?a.data.data.list?(t.tabledatalist=t.tabledatalist.concat(a.data.data.list),a.data.data.list.length<t.pagesize?(t.isLoadMore=!0,t.loadStatus="nomore"):t.isLoadMore=!1):(t.isLoadMore=!0,t.loadStatus="nomore"):(e.showToast({title:a.data.message,icon:"none"}),t.isLoadMore=!1,t.page>1&&(t.page-=1))})).catch((function(a){e.showToast({title:"请求出错",icon:"none"}),t.isLoadMore=!1,t.page>1&&(t.page-=1)}))},delivergoods:function(e){this.delivershow=!0,this.orderid=e},qrcode_scan:function(){var t=this;e.scanCode({scanType:"barCode",success:function(e){t.formdata.expressNumber=e.result}})},sumber_express:function(){var t=this,a=this.formdata;""!==a.expressName?""!==a.expressNumber?s.default.request({url:"order/ship",method:"post",data:{expressName:a.expressName,expressNo:a.expressNumber,expressType:0,orderId:this.orderid}}).then((function(a){0==a.data.code?((0,o.default)("发货成功"),t.delivershow=!1,t.page=1,t.tabledatalist=[],t.getTableList()):e.showToast({title:a.data.message,icon:"none"})})).catch((function(t){e.showToast({title:"请求出错",icon:"none"})})):(0,o.default)("快递单号不能为空"):(0,o.default)("快递公司名称不能为空")},close_express:function(){this.delivershow=!1,this.formdata={expressName:"",expressNumber:""},(0,o.default)("已取消发货")}}};t.default=n}).call(this,a("543d")["default"])}},[["d034","common/runtime","common/vendor"]]]);