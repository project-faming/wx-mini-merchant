(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/PersonalCenter/PersonalCenter"],{"0cfb":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("5a90"));a(n("05ca"));function a(t){return t&&t.__esModule?t:{default:t}}var c={data:function(){return{userInfo:null,openSettingBtnHidden:!0,ewmImg:""}},onLoad:function(){this.getuserInfo()},methods:{getuserInfo:function(){var e=this;o.default.request({url:"account/info",method:"post"}).then((function(n){if(0==n.data.code){if(n.data.data){e.userInfo=n.data.data,e.ewmImg=n.data.data.brandUrl;var a=e.ewmImg;a||o.default.request({url:"account/getCode",method:"post"}).then((function(n){0==n.data.code?n.data.data&&(e.ewmImg=n.data.data):t.showToast({title:n.data.message,icon:"none"})})).catch((function(e){t.showToast({title:"请求出错",icon:"none"})}))}}else t.showToast({title:n.data.message,icon:"none"})})).catch((function(e){t.showToast({title:"请求出错",icon:"none"})}))},handleSetting:function(t){t.detail.authSetting["scope.writePhotosAlbum"]?this.openSettingBtnHidden=!0:this.openSettingBtnHidden=!1},saveEwm:function(e){var n=this;t.getSetting({success:function(e){e.authSetting["scope.writePhotosAlbum"]?n.saveImgToLocal():t.authorize({scope:"scope.writePhotosAlbum",success:function(){n.saveImgToLocal()},fail:function(){n.openSettingBtnHidden=!1}})}})},saveImgToLocal:function(e){var n=this,a=this.ewmImg;a||o.default.request({url:"account/getCode",method:"post"}).then((function(e){0==e.data.code?e.data.data&&(n.ewmImg=e.data.data):t.showToast({title:e.data.message,icon:"none"})})).catch((function(e){t.showToast({title:"请求出错",icon:"none"})})),t.showModal({title:"提示",content:"确定保存到相册吗",success:function(e){e.confirm?t.downloadFile({url:n.ewmImg,success:function(e){200===e.statusCode&&t.saveImageToPhotosAlbum({filePath:e.tempFilePath,success:function(){t.showToast({title:"保存成功",icon:"none"})},fail:function(){t.showToast({title:"保存失败",icon:"none"})}})}}):e.cancel}})}}};e.default=c}).call(this,n("543d")["default"])},3694:function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return o}));var a=function(){var t=this,e=t.$createElement;t._self._c},c=[]},"6ecd":function(t,e,n){"use strict";n.r(e);var o=n("0cfb"),a=n.n(o);for(var c in o)"default"!==c&&function(t){n.d(e,t,(function(){return o[t]}))}(c);e["default"]=a.a},"91bf":function(t,e,n){"use strict";(function(t){n("3f5e");o(n("66fd"));var e=o(n("a5d8"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},a5d8:function(t,e,n){"use strict";n.r(e);var o=n("3694"),a=n("6ecd");for(var c in a)"default"!==c&&function(t){n.d(e,t,(function(){return a[t]}))}(c);n("cb4d");var u,i=n("f0c5"),s=Object(i["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);e["default"]=s.exports},bb9e:function(t,e,n){},cb4d:function(t,e,n){"use strict";var o=n("bb9e"),a=n.n(o);a.a}},[["91bf","common/runtime","common/vendor"]]]);