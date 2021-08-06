<template>
	<view class="user">
		<view class='header bg-color acea-row row-between-wrapper'>
			<view class='picTxt acea-row row-between-wrapper' bindtap="goLogin">
				<view class='pictrue'>
					<open-data class="imagedata" type="userAvatarUrl"></open-data>
				</view>
				<view class='text'>
					<view class='acea-row row-middle'>
						<open-data class="name line1" type="userNickName"></open-data>
					</view>
					<view class='id'>手机号：{{userInfo.mobile}}</view>
					<view class='id'>门店：{{userInfo.name}}</view>
				</view>
			</view>
		</view>
		<view class="qrcode_shop">
			<view class="title_font">
				我的店铺二维码
			</view>
			<view class="qrcode_img_view">
				<view class="qrcode_img">
					<img :src="userInfo.brandUrl">
				</view>
				<button v-if="openSettingBtnHidden" class="purple_btn" @click="saveEwm">
					保存到相册
				</button>
				<button v-else class="purple_btn" hover-class="none" open-type="openSetting" @opensetting='handleSetting'>
					保存到相册
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../static/api/config.js'
	import Toast from '../../wxcomponents/vant/toast/toast';
	export default {
		data() {
			return {
				userInfo:null,
				openSettingBtnHidden: true,//是否授权
				ewmImg:"",//这是要保存的图片
			}
		},
		onLoad() {
			this.getuserInfo()
		},
		methods:{
			getuserInfo(){
				api.request({
					url: 'account/info',
					method: 'post'}).then(res=>{
						if(res.data.code==0){
							if(res.data.data){
								this.userInfo= res.data.data;
								this.ewmImg = res.data.data.brandUrl;
								let img = this.ewmImg;
								if(!img){
									api.request({
										url: 'account/getCode',
										method: 'post'
									}).then(res=>{
										if(res.data.code==0){
											if(res.data.data){
												this.ewmImg = res.data.data;
											}
										}else{  //接口请求失败的处理
											uni.showToast({title:res.data.message,icon:'none'})
										}
									}).catch(err=>{
										uni.showToast({title:'请求出错',icon:'none'})
									})
								}
							}
						}else{  //接口请求失败的处理
							uni.showToast({title:res.data.message,icon:'none'})
						}
					}).catch(err=>{
						uni.showToast({title:'请求出错',icon:'none'})
					})
			},
			handleSetting(e){//是否授权
				if (!e.detail.authSetting['scope.writePhotosAlbum']) {
					this.openSettingBtnHidden = false
				} else {
					this.openSettingBtnHidden = true
				}
			},
			saveEwm(e){//获取相册授权
				uni.getSetting({
					success:((res)=>{
						if (!res.authSetting['scope.writePhotosAlbum']) {
								uni.authorize({
									scope: 'scope.writePhotosAlbum',
									success:(()=>{
										//这里是用户同意授权后的回调
										this.saveImgToLocal();
									}),
									fail:(()=>{
										//这里是用户拒绝授权后的回调
										this.openSettingBtnHidden=false
									}),
								})
							} else {//用户已经授权过了
								this.saveImgToLocal();
							}
						
					}) 
				})
			},
			saveImgToLocal(e){//保存图片
				let img = this.ewmImg;
				if(!img){
					api.request({
						url: 'account/getCode',
						method: 'post',
					}).then(res=>{
						if(res.data.code==0){
							if(res.data.data){
								this.ewmImg = res.data.data;
							}
						}else{  //接口请求失败的处理
							uni.showToast({title:res.data.message,icon:'none'})
						}
					}).catch(err=>{
						uni.showToast({title:'请求出错',icon:'none'})
					});
				}
				uni.showModal({
					title: '提示',
					content: '确定保存到相册吗',
					success: ((res)=>{
						if (res.confirm) {
							uni.downloadFile({
								url: this.ewmImg,//图片地址
								success: ((res) =>{
									if (res.statusCode === 200){
										uni.saveImageToPhotosAlbum({
											filePath: res.tempFilePath,
											success:(()=>{
												uni.showToast({
													title: "保存成功",
													icon: "none"
												})
											}),
											fail:(()=>{
												uni.showToast({
													title: "保存失败",
													icon: "none"
												});
											}),
										})
									}
								})
							})
						} else if (res.cancel) {
				
						}
					})
				});
			},
		}
	}
</script>

<style lang="less">
	.user{
		.header{
			padding:0 40rpx;
			position:relative;
			background-color: #85c43f;
			.picTxt{
				padding-top: 40rpx;
				.pictrue{
					width:120rpx;
					height:120rpx;
					float: left;
					border-radius:50%;
					border:2px solid #f5f5f5;
					overflow: hidden;
					.imagedata{
						width:100%;
						height:100%;
					}
				}
				.text{
					float: left;
					width:calc(100% - 162rpx);
					color:rgba(255,255,255,1);
					margin-left:35rpx;
					.name{
						color:#fff;
						font-size:28rpx;
						max-width:470rpx;
					}
					.id{
						color:rgba(255,255,255,0.6);
						font-size:24rpx;
						margin-top:6rpx;
					}
				}
				&::after{
					content: "";
					display: block;
					height: 0;
					clear:both;
					visibility: hidden;
				}
			}
			&::after{
				content:'';
				height:100rpx;
				width: 100%;
				border-radius: 0 0 50% 50%;
				background-color: #85c43f;
				position: absolute;
				left: 0;
				right: 0;
				z-index: -1;
			}
		}
		.qrcode_shop{
			margin-top: 120rpx;
			.title_font{
				text-align: center;
				font-size: 28rpx;
				font-weight: bold;
				color: #666666;
			}
			.qrcode_img_view{
				margin-top: 40rpx;
				padding: 0 80rpx;
				.qrcode_img{
					border: 2rpx solid #EEEEEE;
					border-radius: 6rpx;
					width: 100%;
					overflow: hidden;
					img{
						width: 100%;
					}
				}
				.purple_btn{
					width: 100%;
					border: 2rpx solid #85c43f;
					background: #ffffff;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					border-radius: 10rpx;
					font-size: 28rpx;
					color: #85c43f;
					margin-top: 20rpx;
				}
			}
		}
	}
</style>
