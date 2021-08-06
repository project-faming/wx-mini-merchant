// const baseurl = 'http://arge.linde.xin/b/api/v1/'
const baseurl = 'https://laijianshengxian.com/b/api/v1/'

import Toast from '../../wxcomponents/vant/toast/toast';
// 公共的请求
 const request = function(options) {
     options.url = baseurl + options.url;
	 if(options.type !=='login'){
		 try {
		    const token = uni.getStorageSync('token');
		    if (token) {
		      options.header = {
		        'X-Dts-Token' : token
		      };
		     }else{
		         uni.navigateTo({
		             url: '../../pages/login/login' 
		         });
		         return;
		     }
		  } catch (err) {
		   Toast('请求失败')
		 }
	 } 
	 return new Promise((resolve, reject) => {
	     uni.request({ ...options,
	       success: res => {
	         if (res.data != '') {
	           if (res.data.code == 40003 || res.data.code == 40004) {
	            uni.navigateTo({
	                url: '../../pages/login/login' 
	            });
	           }
	         }
	         resolve(res);
	       },
	       error: err => {
	         reject(err);
	       },
	       complete: () => {
	         if (options.loading) {
	           uni.hideLoading();
	         }
	       }
	     });
	   });
  }
export default {
	baseurl,
	request
}