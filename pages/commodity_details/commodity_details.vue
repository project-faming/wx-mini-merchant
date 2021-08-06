<template>
	<view class="groupwork_detailes">
		<view class="imgs_view">
			<img :src="commodityData.picUrl">
		</view>
		<view class="commodity_viewclass">
			<view class="many_class">
				<span class="many_font">
					<span class="icon_span">￥</span>
					{{commodityData.retailPrice}}
				</span>
				<span class="many_nums">/{{commodityData.unit}}</span>
			</view>
			<view class="status_span">状态:{{commodityData.isOnline == 1?'上架':'下架'}}</view>
			<view class="commodity_name">{{commodityData.name}}</view>
			<view class="commodity_text">{{commodityData.brief}}</view>
			<rich-text class="rich_text" v-if="commodityData.detail" :nodes="formatRichText(commodityData.detail)"></rich-text>
		</view>
	</view>
</template>

<script>
	import api from '../../static/api/config.js'
	export default {
		data() {
			return {
				commodityid:'',//团id
				active:'',
				commodityData:null
			}
		},
		onLoad(option) {
			this.commodityid = option.id;
			this.active = option.type;
			this.getCommodity();
		},
		methods: {
			getCommodity(){
				let apiurl = '';
				if(this.active == 0){
					apiurl = 'teamGoods/details';
				}
				if(this.active == 1){
					apiurl = 'goods/details';
				}
				api.request({
					url: apiurl,
					method: 'get',
					data:{
						id:this.commodityid
					}
				}).then(res=>{
					if(res.data.code == 0){
						this.commodityData = res.data.data;
					}else{  //接口请求失败的处理
						uni.showToast({title:res.data.message,icon:'none'})
					}
				}).catch(err=>{
					uni.showToast({title:'请求出错',icon:'none'})
				});
			},
			formatRichText(richText){
			  if(richText != null){
				  let str= richText.replace(/< img[^>]*>/gi,function(match,capture){
				  	match = match.replace('< ', '<').replace('< ', '<');
				  	return match;
				  });
					let newRichText= str.replace(/<img[^>]*>/gi,function(match,capture){
						match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
						match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
						match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
						return match;
					});
					
					newRichText = newRichText.replace(/style="[^"]+"/gi,function(match,capture){
						match = match.replace(/width:[^;]+;/gi, 'width:100%;').replace(/width:[^;]+;/gi, 'width:100%;');
						return match;
					});
					newRichText = newRichText.replace(/<br[^>]*\/>/gi, '');
					newRichText = newRichText.replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;margin:10px 0;"');
					return newRichText;
				}else{
					return null;
				}
			}

		}
	}
</script>
<style lang="less">
	.rich_text{
		img{
			width: 100%;
		}
	}
	.groupwork_detailes{
		.imgs_view{
			height: 500rpx;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.commodity_viewclass{
			padding: 40rpx;
			.many_class{
				margin-bottom: 10rpx;
				.many_font{
					font-size: 40rpx;
					color: red;
					font-weight: bold;
					.icon_span{
						font-size: 28rpx;
						font-weight: 400;
					}
				}
				.many_nums{
					font-size: 32rpx;
					color: #999;
				}
			}
			.status_span{
				font-size: 28rpx;
				color: #666;
				margin-bottom: 6rpx;
			}
			.commodity_name{
				font-size: 32rpx;
				color: #333333;
				font-weight: bold;
				margin-bottom: 6rpx;
			}
			.commodity_text{
				font-size: 28rpx;
				color: #333333;
				margin-bottom: 6rpx;
			}
		}
	}
</style>
