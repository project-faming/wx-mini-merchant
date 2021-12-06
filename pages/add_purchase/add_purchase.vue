<template>
	<view>
		<van-cell-group>
			<view class="btton_shop_com">
				<button class="select_button" @click="selectproduct">选择商品</button>
			</view>
			<view class="detail">
				<label class="detail-label">商品图片</label>
				<image class="detail-image" v-if="detailData.picUrl" :src="detailData.picUrl" mode="aspectFill"></image>
			</view>
			<van-field :value="commodityNmae" disabled label="商品名称" />
			<van-field label="商品简介" :value="detailData.brief" disabled ></van-field>
			<view class="detail">
				<label class="detail-label">商品描述</label>
				<rich-text class="detail-content" :nodes="detailData.detail"></rich-text>
			</view>
			
			<van-field label="商品关键字" :value="detailData.keywords" disabled ></van-field>
			
			<van-field label="商品单位" :value="detailData.unit" disabled ></van-field>
			
			<van-field :value="Pricevalue" @input="Pricevalue = $event.detail" type="digit" label="价格" disabled/>
			<van-field :value="numvalue" @input="numvalue = $event.detail" type="number" label="数量" placeholder="请输入数量" clearable :border="false"/>
		</van-cell-group>
		<view class="btton_shop_com">
			<button class="sumber_button" @click="sumberbutton" :disabled="isDiasble">确 认</button>
		</view>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import api from '../../static/api/config.js'
	import Toast from '../../wxcomponents/vant/toast/toast';
	export default {
		data() {
			return {
				
				commodityNmae:'',//商品名称
				commodityid:'',//商品id
				Pricevalue:'',//价格
				describe:'',//描述
				numvalue:'',//数量
				isDiasble:false,
				detailData:{
					brief:'',// 商品简介
					detail:'',//商品详细介绍
					keywords:'',// 商品关键字
					picUrl:'', // 商品图片
					unit:'',// 商品单位
				}
			}
		},
		onLoad(option){
			console.log(option)
			if(option && option.item){
				let data = JSON.parse(option.item)
				this.commodityNmae = data.name
				this.commodityid = data.id
				this.Pricevalue = data.retailPrice
				const {brief,detail,keywords,picUrl,unit} = data
				this.detailData = {...this.detailData,brief,detail,keywords,picUrl,unit}
			}
		},
		onShow() {
			const pages = getCurrentPages()
			const currPage = pages[pages.length - 1] // 当前页
			let data = currPage.data.commoditydata
			if(data && data.id){
				this.commodityNmae = data.name
				this.commodityid = data.id
				this.Pricevalue = data.retailPrice
				const {brief,detail,keywords,picUrl,unit} = data
				this.detailData = {...this.detailData,brief,detail,keywords,picUrl,unit}
			}
		},
		methods: {
			selectproduct(){
				uni.navigateTo({
					url: '../select_product/select_product?type=caigou'
				});
			},
			postPay(orderId){
				wx.showLoading({
					title: '加载中...',
				})
				api.request({
					url: 'dts-brand-purchase/prepay',
					method: 'post',
					data:{
						orderId:orderId,
					}
				}).then(res=>{
					if(res.data.code==0){
						console.log(res.data.data)
						let payData = res.data.data
						try{
							wx.requestPayment({
								"timeStamp": payData.timeStamp,
								"nonceStr": payData.nonceStr,
								"package":payData.packageValue,
								"signType": payData.signType,
								"paySign": payData.paySign,
								"success":(payRes)=>{
									 Toast('支付成功');
								},
								"fail":(payRes)=>{
										Toast('支付失败');
								},
								"complete":(payRes)=>{
									setTimeout(()=>{
										uni.redirectTo({
											url: '../purchase_list/purchase_list'
										});
									},3000)
									
								}
							})
						}catch(e){
							console.log(e)
							//TODO handle the exception
						}
					}else{
						uni.showToast({title:res.data.message,icon:'none'})
					}
				}).finally(()=>{
					wx.hideLoading();
				})
			},
			sumberbutton(){
				let goodsId = this.commodityid;//商品id
				let goodsName = this.commodityNmae;//商品名称
				let goodsPrice = this.Pricevalue;//价格
				// let describe = this.describe;//描述
				let total = this.numvalue;//数量
				if(!goodsId){
					Toast('商品不能为空');
					return;
				}
				if(!goodsName){
					Toast('商品不能为空');
					return;
				}
				if(!goodsPrice){
					Toast('价格不能为空');
					return;
				}
				if(!total){
					Toast('数量不能为空');
					return;
				}
				wx.showLoading({
					title: '加载中...',
				})
				this.isDiasble = true
				api.request({
					url: 'dts-brand-purchase/create',
					method: 'post',
					data:{
						goodsId:goodsId,
						goodsName:goodsName,
						goodsPrice:goodsPrice,
						describe:this.detailData.detail,
						total:total,
					}
				}).then(res=>{
					if(res.data.code==0){
						this.postPay(res.data.data)
					}else{  //接口请求失败的处理
						uni.showToast({title:res.data.message,icon:'none'})
					}
				}).finally(()=>{
					wx.hideLoading();
					setTimeout(()=>{
						this.isDiasble = false
					},1500)
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.btton_shop_com{
		padding: 30rpx;
		.select_button{
			color: #85c43f;
			border: 2rpx solid #85c43f;
			background: #fff;
			font-size: 28rpx;
			height: 80rpx;
			line-height: 80rpx;
		}
		.sumber_button{
			margin-top: 40rpx;
			color: #fff;
			background: #85c43f;
			font-size: 28rpx;
			height: 90rpx;
			line-height: 90rpx;
			border: none;
		}
	}
	.detail{
		padding: 20rpx 32rpx;
		display: flex;
		justify-content: flex-start;
		position: relative;
		&::after{
			content: '';
			position: absolute;
			pointer-events: none;
			top: auto;
			right: 0;
			bottom: 0;
			left: 16px;
			border-bottom: 1rpx solid #ebedf0;
			transform: scaleY(0.5);
		}
		.detail-label{
			font-size: 28rpx;
			color: #323233;
			display: block;
			width: 180rpx;
		}
		.detail-content{
			flex: 1;
			display: block;
			font-size: 28rpx;
			min-height: 80rox;
			max-height: 128rpx;
			line-height: 44rpx;
			overflow-y: auto;
			color: #969799;
		}
		.detail-image{
			display: block;
			width: 220rpx;
			height:220rpx
		}
		
	}
</style>
