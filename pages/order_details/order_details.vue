<template>
	<view>
		<view class="top_details_view">
			<view class="detaile_list">
				<span class="left_title">订单编号：</span>
				<span class="right_text">{{orderdetile.orderInfo.orderSn}}</span>
			</view>
			<view class="detaile_list">
				<span class="left_title">下单时间：</span>
				<span class="right_text">{{orderdetile.orderInfo.addTime}}</span>
			</view>
			<view class="detaile_list">
				<span class="left_title">收货人：</span>
				<span class="right_text">{{orderdetile.orderInfo.consignee}}</span>
			</view>
			<view class="detaile_list">
				<span class="left_title">联系电话：</span>
				<span class="right_text">{{orderdetile.orderInfo.mobile}}</span>
			</view>
			<view class="detaile_list">
				<span class="left_title">详细地址：</span>
				<span class="right_text">{{orderdetile.orderInfo.address}}</span>
			</view>
		</view>
		<view class="commodity_view_order">
			<view class="title_status">
				<span class="left_text">商品信息</span>
				<view class="postion_button" v-if="orderdetile.orderInfo.orderStatus==201" @click="delivershow = true">发货</view>
				<span class="status_text">{{orderdetile.orderInfo.orderStatus==101?'未付款':orderdetile.orderInfo.orderStatus==102?'用户取消':orderdetile.orderInfo.orderStatus==103?'系统取消':orderdetile.orderInfo.orderStatus==204?'团购中':orderdetile.orderInfo.orderStatus==202?'申请退款':orderdetile.orderInfo.orderStatus==203?'已退款':orderdetile.orderInfo.orderStatus==301?'已发货':orderdetile.orderInfo.orderStatus==401?'用户收货':orderdetile.orderInfo.orderStatus==402?'系统收货':''}}</span>
			</view>
			<view class="commodity_order_view" v-for="(item,index) in orderdetile.orderGoodsList">
				<view class="commodity_img">
					<img :src="item.picUrl">
				</view>
				<view class="comm_right_text">
					<view class="comm_name">{{item.goodsName}}</view>
					<view class="bottom_text">
						<!-- <span class="many_text">规格</span> -->
						<span class="num_text">×{{item.number}}</span>
					</view>
					<view class="manyfont_text">
						<span>￥{{item.price}}</span>
					</view>
				</view>
			</view>
			<view class="order_all_many">
				<view class="order_many_list">
					<span class="title_left">商品合计：</span>
					<span class="many_right">￥{{orderdetile.orderInfo.goodsPrice}}</span>
				</view>
				<view class="order_many_list">
					<span class="title_left">运费：</span>
					<span class="many_right">￥{{orderdetile.orderInfo.freightPrice}}</span>
				</view>
				<view class="order_many_list">
					<span class="title_left">优惠券减免：</span>
					<span class="many_right">-￥{{orderdetile.orderInfo.couponPrice}}</span>
				</view>
				<view class="order_many_list">
					<span class="title_left">团购优惠减免：</span>
					<span class="many_right">-￥{{orderdetile.orderInfo.grouponPrice}}</span>
				</view>
				<view class="order_many_list">
					<span class="title_left">积分减免：</span>
					<span class="many_right">-￥{{orderdetile.orderInfo.integralPrice}}</span>
				</view>
			</view>
			<view class="all_many_view">
				<span class="text_title_left">实付：</span>
				<span class="many_all">￥{{orderdetile.orderInfo.actualPrice}}</span>
			</view>
		</view>
		<van-dialog zIndex="2"
		  use-slot
		  title="发货"
		  :show="delivershow"
		  :show-cancel-button="false"
		  :show-confirm-button="false"
		>
			<view class="cell_group">
				<van-cell-group>
					<van-field :value="formdata.expressName" label="快递公司" placeholder="请输入快递公司名称" @input="formdata.expressName = $event.detail"/>
					<van-field :value="formdata.expressNumber" :border="false" type="number" label="物流单号" clearable placeholder="请输入物流单号" @input="formdata.expressNumber = $event.detail">
						<van-button slot="button" color="#85c43f" size="small" type="primary" @click="qrcode_scan">扫一扫</van-button>
					</van-field>
				</van-cell-group>
			</view>
			<view class="button_views">
				<button class="sumber_button" @click="sumber_express">确认发货</button>
				<button class="close_button" @click="close_express">取消</button>
			</view>
		</van-dialog>
		<van-toast id="van-toast" zIndex="1000" />
	</view>
</template>

<script>
	import api from '../../static/api/config.js'
	import Toast from '../../wxcomponents/vant/toast/toast';
	import Dialog  from '../../wxcomponents/vant/dialog/dialog';
	export default {
		data() {
			return {
				orderdetile:null,
				orderid:'',
				delivershow:false,
				formdata:{
					expressName:'',
					expressNumber:'',
				},
			}
		},
		onLoad(option){
			this.orderid = option.id;
			this.getorderDetile();
		},
		methods: {
			getorderDetile(){
				api.request({
					url: 'order/details',
					method: 'get',
					data:{
						id:this.orderid
					}
				}).then(res=>{
					if(res.data.code==0){
						this.orderdetile = res.data.data;
					}else{  //接口请求失败的处理
						uni.showToast({title:res.data.message,icon:'none'})
					}
				}).catch(err=>{
					uni.showToast({title:'请求出错',icon:'none'})
				});
			},
			qrcode_scan(){//扫一扫获取条码
				uni.scanCode({
					scanType: 'barCode',
					success:((res)=>{
						this.formdata.expressNumber = res.result;
					})
				});
			},
			sumber_express(){//确认发货
				let data = this.formdata;
				if(data.expressName === ''){
					Toast("快递公司名称不能为空");
					return;
				}
				if(data.expressNumber === ''){
					Toast("快递单号不能为空");
					return;
				}
				api.request({
					url: 'order/ship',
					method: 'post',
					data:{
						expressName:data.expressName,
						expressNo:data.expressNumber,
						expressType:0,
						orderId:this.orderid
					}
				}).then(res=>{
					if(res.data.code==0){
						Toast("发货成功");
						this.delivershow = false;
						this.getorderDetile();
					}else{  //接口请求失败的处理
						uni.showToast({title:res.data.message,icon:'none'})
					}
				}).catch(err=>{
					uni.showToast({title:'请求出错',icon:'none'})
				});
				
			},
			close_express(){//取消发货
				this.delivershow = false;
				this.formdata = {
					expressName:'',
					expressNumber:'',
				};
				Toast("已取消发货");
			},
		}
	}
</script>

<style lang="less">
	.top_details_view{
		padding: 40rpx;
		border-bottom: 10rpx solid #eeeeee;
		.detaile_list{
			margin-bottom: 20rpx;
			overflow: hidden;
			.left_title{
				float: left;
				width: 200rpx;
				font-size: 28rpx;
				color: #333333;
			}
			.right_text{
				float: left;
				width: calc(100% - 200rpx);
				font-size: 28rpx;
				color: #999999;
			}
			&:last-child{
				margin-bottom: 0;
			}
		}
	}
	.cell_group{
		margin-top: 20rpx;
	}
	.button_views{
		padding: 40rpx;
		.sumber_button{
			border: none;
			background: #85c43f;
			font-size: 28rpx;
			color: #ffffff;
			height: 90rpx;
			line-height: 90rpx;
			border-radius: 10rpx;
			margin-bottom: 20rpx;
		}
		.close_button{
			border: 1px solid #85c43f;
			background: #ffffff;
			font-size: 28rpx;
			color: #85c43f;
			height: 90rpx;
			line-height: 90rpx;
			border-radius: 10rpx;
		}
	}
	.commodity_view_order{
		padding: 40rpx;
		.title_status{
			overflow: hidden;
			border-bottom: 1px solid #EEEEEE;
			padding-bottom: 20rpx;
			.postion_button{
				background: #85c43f;
				font-size: 28rpx;
				border-radius: 40rpx;
				padding: 10rpx 40rpx;
				color: #fff;
				float: right;
			}
			.left_text{
				float: left;
				font-size: 28rpx;
				color: #333333;
			}
			.status_text{
				float: right;
				color: #c02021;
				font-size: 28rpx;
			}
		}
		.commodity_order_view{
			overflow: hidden;
			margin-top: 30rpx;
			.commodity_img{
				float: left;
				width: 200rpx;
				height: 200rpx;
				border: 2rpx solid #EEEEEE;
				border-radius: 8rpx;
				overflow: hidden;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.comm_right_text{
				float: left;
				width: calc(100% - 224rpx);
				margin-left: 20rpx;
				.comm_name{
					font-size: 32rpx;
					color: #333333;
				}
				.bottom_text{
					margin-top: 6rpx;
					overflow: hidden;
					.many_text{
						font-size: 28rpx;
						color: #999999;
						float: left;
					}
					.num_text{
						font-size: 28rpx;
						color: #999999;
						float: right;
					}
				}
				.manyfont_text{
					margin-top: 6rpx;
					font-size: 28rpx;
					color: #c02021;
				}
			}
		}
		.order_all_many{
			margin-top: 20rpx;
			padding-bottom: 14rpx;
			border-bottom: 2rpx solid #EEEEEE;
			.order_many_list{
				overflow: hidden;
				margin-bottom: 6rpx;
				.title_left{
					float: left;
					color: #999999;
					font-size: 24rpx;
				}
				.many_right{
					float: right;
					color: #666666;
					font-size: 24rpx;
				}
			}
			
		}
		.all_many_view{
			margin-top: 20rpx;
			overflow: hidden;
			.text_title_left{
				float: left;
				font-size: 28rpx;
				color: #333333;
				font-weight: bold;
			}
			.many_all{
				float: right;
				font-size: 28rpx;
				color: #c02021;
				font-weight: bold;
			}
		}
		
	}
</style>
