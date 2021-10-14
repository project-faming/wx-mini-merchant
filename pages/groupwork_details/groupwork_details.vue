<template>
	<view class="groupwork_detailes">
		<view class="imgs_view">
			<img :src="groupworkData.picUrl">
		</view>
		<van-cell-group>
			<van-field :value="groupworkData.goodsName" readonly label="商品名称"/>
			<van-field :value="groupworkData.goodsPrice" readonly label="拼团价格"/>
			<!-- <van-field :value="groupworkData" readonly label="团长昵称"/> -->
			<van-field :value="groupworkData.userPhone" readonly label="团长手机"/>
			<van-field :value="groupworkData.type == 1?'进行中':groupworkData.type == 2?'已成团':groupworkData.type == 3?'进行中':groupworkData.type == 4?'未成团':''" readonly label="状态"/>
			<van-field :value="groupworkData.expireTime" readonly label="过期时间"/>
			<van-field :value="groupworkData.discountMember" readonly label="成团人数" :border="false"/>
		</van-cell-group>
	</view>
</template>

<script>
	import api from '../../static/api/config.js'
	import Toast from '../../wxcomponents/vant/toast/toast';
	export default {
		data() {
			return {
				groupworkid:'',//团id
				groupworkData:[]
			}
		},
		onLoad(option) {
			// wx.showShareMenu({
			// 		withShareTicket:true,
			// 		//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
			// 		menus:["shareAppMessage","shareTimeline"]
			// 	})
			 this.groupworkid = option.id;
			 this.getgroupdetails();
		},
		//发送给朋友
		// onShareAppMessage(res) {
		// 	return {
		// 		title: '欢迎使用xxx商城',
		// 		type: 0,
		// 		path: '/pages/index/index?id=' + distSource,
		// 		summary: "",
		// 		imageUrl: "https://58d.oss-cn-hangzhou.aliyuncs.com/goods/ttg_1596073788000.png"
		// 	}
		// },
		//分享到朋友圈
		// onShareTimeline(res) {
		// 	let distSource = uni.getStorageSync('openid');
		// 	if (distSource) {
		// 		return {
		// 			title: '欢迎使用xxx商城',
		// 			type: 0,
		// 			query: 'id=' + distSource,
		// 			summary: "",
		// 			imageUrl: "https://58d.oss-cn-hangzhou.aliyuncs.com/goods/ttg_1596073788000.png"
		// 		}
		// 	}
		// },
		methods: {
			getgroupdetails(){//获取详情
				api.request({
					url: 'teamList/details',
					method: 'get',
					data:{
						id:this.groupworkid
					}
				}).then(res=>{
					if(res.data.code==0){
						this.groupworkData = res.data.data;
					}else{  //接口请求失败的处理
						uni.showToast({title:res.data.message,icon:'none'})
					}
				});
			},
		}
	}
</script>

<style lang="less">
	.groupwork_detailes{
		.imgs_view{
			margin-bottom: 40rpx;
			height: 400rpx;
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
