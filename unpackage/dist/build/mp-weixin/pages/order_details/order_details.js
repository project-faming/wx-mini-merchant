(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order_details/order_details"],{"23e3":function(e,t,r){},"4afc":function(e,t,r){"use strict";(function(e){r("9eda");a(r("66fd"));var t=a(r("8ae0"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,r("543d")["createPage"])},"77c6":function(e,t,r){"use strict";var a;r.d(t,"b",(function(){return n})),r.d(t,"c",(function(){return o})),r.d(t,"a",(function(){return a}));var n=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.delivershow=!0},e.e1=function(t){e.formdata.expressName=t.detail},e.e2=function(t){e.formdata.expressNumber=t.detail})},o=[]},"870a":function(e,t,r){"use strict";r.r(t);var a=r("b5f1"),n=r.n(a);for(var o in a)"default"!==o&&function(e){r.d(t,e,(function(){return a[e]}))}(o);t["default"]=n.a},"8ae0":function(e,t,r){"use strict";r.r(t);var a=r("77c6"),n=r("870a");for(var o in n)"default"!==o&&function(e){r.d(t,e,(function(){return n[e]}))}(o);r("abcb");var s,d=r("f0c5"),u=Object(d["a"])(n["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],s);t["default"]=u.exports},abcb:function(e,t,r){"use strict";var a=r("23e3"),n=r.n(a);n.a},b5f1:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=o(r("e156")),n=o(r("d890"));o(r("2739"));function o(e){return e&&e.__esModule?e:{default:e}}var s={data:function(){return{orderdetile:null,orderid:"",delivershow:!1,formdata:{expressName:"",expressNumber:""}}},onLoad:function(e){this.orderid=e.id,this.getorderDetile()},methods:{getorderDetile:function(){var t=this;a.default.request({url:"order/details",method:"get",data:{id:this.orderid}}).then((function(r){0==r.data.code?t.orderdetile=r.data.data:e.showToast({title:r.data.message,icon:"none"})})).catch((function(t){e.showToast({title:"请求出错",icon:"none"})}))},qrcode_scan:function(){var t=this;e.scanCode({scanType:"barCode",success:function(e){t.formdata.expressNumber=e.result}})},sumber_express:function(){var t=this,r=this.formdata;""!==r.expressName?""!==r.expressNumber?a.default.request({url:"order/ship",method:"post",data:{expressName:r.expressName,expressNo:r.expressNumber,expressType:0,orderId:this.orderid}}).then((function(r){0==r.data.code?((0,n.default)("发货成功"),t.delivershow=!1,t.getorderDetile()):e.showToast({title:r.data.message,icon:"none"})})).catch((function(t){e.showToast({title:"请求出错",icon:"none"})})):(0,n.default)("快递单号不能为空"):(0,n.default)("快递公司名称不能为空")},close_express:function(){this.delivershow=!1,this.formdata={expressName:"",expressNumber:""},(0,n.default)("已取消发货")}}};t.default=s}).call(this,r("543d")["default"])}},[["4afc","common/runtime","common/vendor"]]]);