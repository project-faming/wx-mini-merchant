<template>
	<view class="content_loginclass">
		<view class="img_topimg">
			<image src="../../static/img/login_time.png" mode="widthFix" class="img_class"></image>
			<view class="font_text">
				优加是全新打造的B2C（Business-to-Consumer，商业零售)购物平台
				旨在整合国内外广大品牌商、生产商，为商家和消费者之间提供一站式产品购销解决方案。
				商城专注经营精品时尚的女装、男装、女鞋、男鞋、化妆品、运动鞋、时尚配饰、箱包、数码、家电等数万种百货商品。
			</view>
		</view>
		<view class="button_bottom">
			<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</button>
			<view class="our_lintindex" @click="getonut">返回首页</view>
		</view>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant/toast/toast';
	import api from '../../static/api/config.js'
	var that;
	export default {
		data() {
			return {
				
			}
		},
		created(){
			that = this;
		},
		onLoad() {
			// wx.getUserInfo({
			//   success:((res)=>{
			//    var userInfo = res.userInfo
			// 	getApp().globalData.userinfo = userInfo;
			// 	uni.setStorage({
			// 	 key:"userinfo",
			// 	 data:userInfo
			// 	})
			//    that.getonut();
			// 	 // var nickName = userInfo.nickName//昵称
			// 	 // var avatarUrl = userInfo.avatarUrl//头像
			// 	 // var gender = userInfo.gender //性别 0：未知、1：男、2：女
			//   })
			// })
		},
		methods: {
			getPhoneNumber(e){
				if(e.detail.errMsg=="getPhoneNumber:ok"){
					wx.login({
					  success (res) {
						if (res.code) {
						  //发起网络请求
						  api.request({
							url: 'account/phone',
							type:'login',
							method:'post',
							data: {
							  code: res.code,
							  encryptedData:e.detail.encryptedData,
							  iv:e.detail.iv
							}
						  }).then(result=>{
								if(result.data.code==0){
									uni.setStorage({
									 key:"token",
									 data:result.data.data.token
									})
									that.getonut();
								}else{  //接口请求失败的处理
									uni.showToast({title:result.data.message,icon:'none'})
								}
							}).catch(err=>{
							})
						} else {
							Toast(res.errMsg)
						}
					  }
					})
				}else{
					Toast.fail('拒绝授权')
				}
			},
			getonut(){
				uni.reLaunch({//信息更新成功后跳转到小程序首页
					url: '../index/index'
				});
			}
		}
	}
</script>

<style lang="less">
	.content_loginclass{
		.img_topimg{
			.img_class{
				width: 100%;
			}
			.font_text{
				font-size: 32rpx;
				color: #333333;
				line-height: 50rpx;
				font-weight: bold;
				padding: 20rpx;
			}
		}
		.button_bottom{
			padding: 80rpx;
			button{
				background: #85c43f;
				font-size: 28rpx;
				height: 96rpx;
				line-height: 96rpx;
				color: #fff;
				border: 0;
			}
			.our_lintindex{
				font-size: 32rpx;
				color: #85c43f;
				text-align: center;
				margin-top: 20rpx;
			}
		}
		
	}
</style>
