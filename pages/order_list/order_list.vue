<template>
	<view class="chieflist_class" >
		<view class="cardPading">
			<van-tabs type="card" :active="active" @click="onClick" color="#85c43f">
			  <van-tab title="全部" name='1'></van-tab>
			  <van-tab title="已付款" name='201'></van-tab>
			  <van-tab title="已发货" name='301'></van-tab>
			</van-tabs>
		</view>
		
		<view class="default_class" v-if="tabledatalist.length===0">
			<img src="../../static/img/image-default.png">
			<span>暂无数据</span>
		</view>
		<view v-else>
			<view class="list_table_div">
				<view class="tablelist_div" v-for="(item,index) in tabledatalist" :key="index">
					<view class="orderlist_top">
						<text class="textorder">订单编号：{{item.orderSn}}</text>
						<view class="postion_button" v-if="item.orderStatus==201" @click="delivergoods(item.orderId)">发货</view>
						<span class="status_text">{{item.orderStatus==101?'未付款':item.orderStatus==102?'用户取消':item.orderStatus==103?'系统取消':item.orderStatus==204?'团购中':item.orderStatus==202?'申请退款':item.orderStatus==203?'已退款':item.orderStatus==301?'已发货':item.orderStatus==401?'用户收货':item.orderStatus==402?'系统收货':''}}</span>
					</view>
					<view class="order_list_padding" @click="orderdetails(item.orderId)">
						<view class="order_list" v-for="(data,id) in item.orderGoodsList" :key="id">
							<view class="img_userimg">
								<img :src="data.picUrl">
							</view>
							<view class="right_text">
								<span class="name_text">{{data.goodsName}}</span>
								<view class="presentprice">
									<span class="font_icon">￥</span>
									<span class="manynum_text">{{data.price}}</span>
									<span class="number_text">×{{data.number}}</span>
								</view>
							</view>
						</view>
					</view>
					<view class="order_goodsPrice">
						<view class="right_Price">
							<font class="title_all">合计：</font>
							<font class="goodsicon">￥</font>
							<font class="goodsPrice_text">{{item.goodsPrice}}</font>
						</view>
					</view>
				</view>
			</view>
			<view v-show="isLoadMore">
				<uni-load-more :status="loadStatus" ></uni-load-more>
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
				active:'1',
				tabledatalist:[],
				orderid:'',
				formdata:{
					expressName:'',
					expressNumber:'',
				},
								
				page:1,
				pagesize:10,
				loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
				isLoadMore:false,  //是否加载中
				delivershow:false,//发货弹框
			}
		},
		onShow() {
			this.page = 1;
			this.tabledatalist = [];
			this.getTableList();
		},
		onReachBottom(){  //上拉触底函数
			if(!this.isLoadMore){  //此处判断，上锁，防止重复请求
				this.isLoadMore=true
				this.page+=1
				this.getTableList()
			}
		},
		methods: {
			onClick(event) {
				this.active = event.detail.name;
				this.page = 1;
				this.tabledatalist = [];
				this.getTableList();
			},
			orderdetails(val){//商品详情
				uni.navigateTo({
				    url: '../order_details/order_details?id='+val
				});
			},
			getTableList(){
				let status = this.active;
				if(status == 1){
					status = null;
				}
				api.request({
					url: 'order/getList',
					method: 'post',
					data:{
						pageNum:this.page,
						pageSize:this.pagesize,
						orderStatus:status
					}
				}).then(res=>{
					if(res.data.code==0){
						if(res.data.data.list){
							this.tabledatalist=this.tabledatalist.concat(res.data.data.list)
							if(res.data.data.list.length<this.pagesize){  //判断接口返回数据量小于请求数据量，则表示此为最后一页
								this.isLoadMore=true                                             
								this.loadStatus='nomore'
							}else{
								this.isLoadMore=false
							}
						}else{
							this.isLoadMore=true
							this.loadStatus='nomore'
						}
					}else{  //接口请求失败的处理
						uni.showToast({title:res.data.message,icon:'none'})
						this.isLoadMore=false
						if(this.page>1){
							this.page-=1
						}
					}
				}).catch(err=>{
					uni.showToast({title:'请求出错',icon:'none'})
					this.isLoadMore=false
					if(this.page>1){
						this.page-=1
					}
				});
			},
			delivergoods(id){//发货
				this.delivershow = true;
				this.orderid = id;
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
						this.page = 1;
						this.tabledatalist = [];
						this.getTableList();
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
	.chieflist_class{
		.cardPading{
			padding:40rpx 0;
		}
		.default_class{
			text-align: center;
			padding-top: 40rpx;
			img{
				width: 320rpx;
				height: 320rpx;
			}
			span{
				font-size: 28rpx;
				color: #999999;
				font-weight: bold;
				margin-top: 20rpx;
				display: block;
			}
		}
		.list_table_div{
			margin-bottom: 40rpx;
			.tablelist_div{
				border-bottom: 2rpx solid #EEEEEE;
				overflow: hidden;
				.orderlist_top{
					background: #f5f5f5;
					padding: 20rpx 30rpx;
					margin-bottom: 20rpx;
					.textorder{
						font-size: 30rpx;
						color: #cccccc;
					}
					.postion_button{
						background: #85c43f;
						font-size: 28rpx;
						border-radius: 40rpx;
						padding: 10rpx 40rpx;
						color: #fff;
						float: right;
					}
					.status_text{
						font-size: 28rpx;
						float: right;
						color: #85c43f;
					}
				}
				.order_goodsPrice{
					padding: 20rpx;
					overflow: hidden;
					.right_Price{
						float: right;
						.title_all{
							font-size: 28rpx;
							color: #333333;
						}
						.goodsicon{
							font-size: 32rpx;
							color: #EE0A24;
						}
						.goodsPrice_text{
							font-size: 36rpx;
							color: #EE0A24;
						}
					}
				}
				.order_list_padding{
					padding: 0 30rpx;
					.order_list{
						overflow: hidden;
						margin-bottom: 20rpx;
						padding-bottom: 20rpx;
						border-bottom: 2rpx solid #EEEEEE;
						.img_userimg{
							width: 220rpx;
							height: 220rpx;
							float: left;
							margin-right: 20rpx;
							border: 1px solid #ccc;
							border-radius: 10rpx;
							img{
								width: 100%;
								height: 100%;
							}
						}
						.right_text{
							float: left;
							width: calc(100% - 245rpx);
							height: 220rpx;
							.name_text{
								display: block;
								font-size: 28rpx;
								color: #333333;
								margin-bottom: 8rpx;
								font-weight: bold;
								text-overflow: -o-ellipsis-lastline;
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								line-clamp: 2;
								-webkit-box-orient: vertical;
							}
							.text_jianjie{
								display: block;
								font-size: 28rpx;
								color: #999999;
								margin-top: 10rpx;
								text-overflow: -o-ellipsis-lastline;
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								line-clamp: 2;
								-webkit-box-orient: vertical;
							}
							.presentprice{
								.font_icon{
									font-size: 26rpx;
									color: #ee0a24;
								}
								.manynum_text{
									font-size: 36rpx;
									color: #ee0a24;
								}
								.number_text{
									color: #999999;
									font-size: 30rpx;
									margin-left: 5px;
									font{
										font-size: 12px;
										margin-left: 6rpx;
									}
								}
							}
						}
						&:last-child{
							border: none;
							padding: 0;
							margin: 0;
						}
					}
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
	}
</style>
