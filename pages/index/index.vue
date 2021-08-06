<template>
	<div class="content_index">
		<div class="nav-area__item leftclass" @click="pushrouter('1')">
			<img src="../../static/img/Chiefimg.png">
			<span>团长功能</span>
		</div>
		<div class="nav-area__item rightclass" @click="pushrouter('2')">
			<img src="../../static/img/purchaseimg.png">
			<span>采购模块</span>
		</div>
		<div class="nav-area__item leftclass" @click="pushrouter('3')">
			<img src="../../static/img/Group_order.png">
			<span>拼团订单</span>
		</div>
		<van-toast id="van-toast" />
	</div>
</template>

<script>
	import Toast from '../../wxcomponents/vant/toast/toast';
	import api from '../../static/api/config.js'
	export default {
		data() {
			return {
			}
		},
		onLoad() {
			
		},
		onShow(){
			   
		},
		methods: {
			pushrouter(val){//点击跳转
				let token = uni.getStorageSync('token');
				if(token===''){
					uni.navigateTo({
						url: '../login/login'
					});
				}else{
					if(val === '1'){
						uni.navigateTo({
							url: '../chief_list/chief_list'
						});
					}
					if(val === '2'){
						uni.navigateTo({
							url: '../purchase_list/purchase_list'
						});
					}
					if(val === '3'){
						uni.navigateTo({
							url: '../groupwork_order/groupwork_order'
						});
					}
				}
			},
		}
	}
</script> 

<style lang="less">
	.content_index{
		padding: 80rpx;
		.nav-area__item{
			width: 250rpx;
			height: 250rpx;
			border: 1rpx solid #85c43f;
			border-radius: 10rpx;
			text-align: center;
			margin-bottom: 40rpx;
			img{
				margin-top: 50rpx;
				width: 100rpx;
				height: 100rpx;
			}
			span{
				display: block;
				font-size: 24rpx;
				color: #85c43f;
				font-weight: bold;
			}
		}
		.leftclass{
			float: left;
		}
		.rightclass{
			float: right;
		}
	}
</style>
