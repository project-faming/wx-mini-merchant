<<<<<<< HEAD
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/add_purchase/add_purchase"],{2709:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(n("e156")),u=o(n("d890"));function o(t){return t&&t.__esModule?t:{default:t}}var c={data:function(){return{commodityNmae:"",commodityid:"",Pricevalue:"",describe:"",numvalue:""}},onShow:function(){var t=getCurrentPages(),e=t[t.length-1],n=e.data.commoditydata;n&&(this.commodityNmae=n.name,this.commodityid=n.id)},methods:{selectproduct:function(){t.navigateTo({url:"../select_product/select_product?type=caigou"})},sumberbutton:function(){var e=this.commodityid,n=this.commodityNmae,o=this.Pricevalue,c=this.describe,i=this.numvalue;e&&n?o?i?a.default.request({url:"dts-brand-purchase/create",method:"post",data:{goodsId:e,goodsName:n,goodsPrice:o,describe:c,total:i}}).then((function(e){0==e.data.code?((0,u.default)("申请成功"),t.navigateTo({url:"../purchase_list/purchase_list"})):t.showToast({title:e.data.message,icon:"none"})})).catch((function(e){t.showToast({title:"请求出错",icon:"none"})})):(0,u.default)("数量不能为空"):(0,u.default)("价格不能为空"):(0,u.default)("商品不能为空")}}};e.default=c}).call(this,n("543d")["default"])},"406e":function(t,e,n){"use strict";n.r(e);var a=n("4ef4"),u=n("dd12");for(var o in u)"default"!==o&&function(t){n.d(e,t,(function(){return u[t]}))}(o);n("f1ab");var c,i=n("f0c5"),d=Object(i["a"])(u["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],c);e["default"]=d.exports},"4b35":function(t,e,n){"use strict";(function(t){n("9eda");a(n("66fd"));var e=a(n("406e"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"4ef4":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var u=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.Pricevalue=e.detail},t.e1=function(e){t.describe=e.detail},t.e2=function(e){t.numvalue=e.detail})},o=[]},"7d61":function(t,e,n){},dd12:function(t,e,n){"use strict";n.r(e);var a=n("2709"),u=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=u.a},f1ab:function(t,e,n){"use strict";var a=n("7d61"),u=n.n(a);u.a}},[["4b35","common/runtime","common/vendor"]]]);
=======
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/add_purchase/add_purchase"],{"0976":function(t,e,n){"use strict";var u;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return u}));var a=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.Pricevalue=e.detail},t.e1=function(e){t.describe=e.detail},t.e2=function(e){t.numvalue=e.detail})},o=[]},"27b5":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=o(n("6441")),a=o(n("013d"));function o(t){return t&&t.__esModule?t:{default:t}}var c={data:function(){return{commodityNmae:"",commodityid:"",Pricevalue:"",describe:"",numvalue:""}},onShow:function(){var t=getCurrentPages(),e=t[t.length-1],n=e.data.commoditydata;n&&(this.commodityNmae=n.name,this.commodityid=n.id)},methods:{selectproduct:function(){t.navigateTo({url:"../select_product/select_product?type=caigou"})},sumberbutton:function(){var e=this.commodityid,n=this.commodityNmae,o=this.Pricevalue,c=this.describe,i=this.numvalue;e&&n?o?i?u.default.request({url:"dts-brand-purchase/create",method:"post",data:{goodsId:e,goodsName:n,goodsPrice:o,describe:c,total:i}}).then((function(e){0==e.data.code?((0,a.default)("申请成功"),t.navigateTo({url:"../purchase_list/purchase_list"})):t.showToast({title:e.data.message,icon:"none"})})).catch((function(e){t.showToast({title:"请求出错",icon:"none"})})):(0,a.default)("数量不能为空"):(0,a.default)("价格不能为空"):(0,a.default)("商品不能为空")}}};e.default=c}).call(this,n("543d")["default"])},3546:function(t,e,n){"use strict";n.r(e);var u=n("27b5"),a=n.n(u);for(var o in u)"default"!==o&&function(t){n.d(e,t,(function(){return u[t]}))}(o);e["default"]=a.a},"569c":function(t,e,n){"use strict";(function(t){n("608e");u(n("66fd"));var e=u(n("d738"));function u(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},8897:function(t,e,n){},c599:function(t,e,n){"use strict";var u=n("8897"),a=n.n(u);a.a},d738:function(t,e,n){"use strict";n.r(e);var u=n("0976"),a=n("3546");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("c599");var c,i=n("f0c5"),d=Object(i["a"])(a["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],c);e["default"]=d.exports}},[["569c","common/runtime","common/vendor"]]]);
>>>>>>> e0ce3172f3a81910845254a71cb140d34a706a30
