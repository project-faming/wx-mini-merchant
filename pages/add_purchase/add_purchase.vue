<template>
	<view>
		<van-cell-group>
			<view class="btton_shop_com">
				<button class="select_button" @click="selectproduct">选择商品</button>
			</view>
			<van-field :value="commodityNmae" readonly clearable label="商品名称" placeholder="请输入商品名称"/>
			<van-field :value="Pricevalue" @input="Pricevalue = $event.detail" type="digit" label="价格" clearable placeholder="请输入价格"/>
			<van-field :value="describe" @input="describe = $event.detail" type="textarea" label="商品描述" :autosize="{maxHeight: 100, minHeight: 80}" clearable placeholder="请输入商品描述"/>
			<van-field :value="numvalue" @input="numvalue = $event.detail" type="number" label="数量" placeholder="请输入数量" clearable :border="false"/>
		</van-cell-group>
		<view class="btton_shop_com">
			<button class="sumber_button" @click="sumberbutton">确 认</button>
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
			}
		},
		onShow() {
			const pages = getCurrentPages()
			const currPage = pages[pages.length - 1] // 当前页
			let data = currPage.data.commoditydata
			if(data){
				this.commodityNmae = data.name
				this.commodityid = data.id
			}
		},
		methods: {
			selectproduct(){
				uni.navigateTo({
					url: '../select_product/select_product?type=caigou'
				});
			},
			postPay(orderId){
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
						debugger
						try{
							wx.requestPayment({
								"timeStamp": payData.jsConfig.timeStamp,
								"nonceStr": payData.jsConfig.nonceStr,
								"package":payData.jsConfig.packages,
								"signType": payData.jsConfig.signType,
								"paySign": payData.jsConfig.paySign,
								"success":(payRes)=>{
									 Toast('支付成功');
								},
								"fail":(payRes)=>{
										Toast('支付失败');
								},
								"complete":(payRes)=>{
									uni.redirectTo({
										url: '../purchase_list/purchase_list'
									});
								}
							})
						}catch(e){
							console.log(e)
							//TODO handle the exception
						}
					}else{
						uni.showToast({title:res.data.message,icon:'none'})
					}
				})
			},
			sumberbutton(){
				let goodsId = this.commodityid;//商品id
				let goodsName = this.commodityNmae;//商品名称
				let goodsPrice = this.Pricevalue;//价格
				let describe = this.describe;//描述
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
				
				api.request({
					url: 'dts-brand-purchase/create',
					method: 'post',
					data:{
						goodsId:goodsId,
						goodsName:goodsName,
						goodsPrice:goodsPrice,
						describe:describe,
						total:total,
					}
				}).then(res=>{
					if(res.data.code==0){
						this.postPay(res.data.data)
					}else{  //接口请求失败的处理
						uni.showToast({title:res.data.message,icon:'none'})
					}
				})
			},
		}
	}
</script>

<style lang="less">
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
</style>
