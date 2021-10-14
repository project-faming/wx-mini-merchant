<template>
	<view>
		<van-search :value="shopname" placeholder="搜索商品名称" @search="onSearch" @clear="onSearch"/>
		<view class="default_class" v-if="tabledatalist.length === 0">
			<img src="../../static/img/image-default.png">
			<span>暂无数据</span>
		</view>
		<view v-for="(item,index) in tabledatalist" :key="index" @click="onClickItem(item)">
			<van-card
			  :price="item.retailPrice"
			  :desc="item.brief"
			  :title="item.name"
			  :thumb="item.picUrl"
			/>
		</view>
	</view>
</template>

<script>
	import api from '../../static/api/config.js'
	import Toast from '../../wxcomponents/vant/toast/toast';
	export default {
		data() {
			return {
				shopname: '',
				tabledatalist:[],
				page:1,
				pagesize:10,
				apiurl:'',
			}
		},
		onLoad(option) {
			// console.log(option)
			if(option.type === 'caigou'){
				this.apiurl = 'goods/getList'
			}else{
				this.apiurl = 'teamGoods/getList'
			}
			this.getShopList();
		},
		onReachBottom(){  //上拉触底函数
			if(!this.isLoadMore){  //此处判断，上锁，防止重复请求
				this.isLoadMore=true
				this.page+=1
				this.getShopList()
			}
		},
		methods: {
			onSearch(event){//搜索
				this.shopname = event.detail;
				this.tabledatalist = [],
				this.page = 1,
				this.getShopList()
			},
			getShopList(){//列表查询
				api.request({
					url: this.apiurl,
					method: 'post',
					data:{
						pageNum:this.page,
						pageSize:this.pagesize,
						goodsName:this.shopname,
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
					this.isLoadMore=false
					if(this.page>1){
						this.page-=1
					}
				});
			},
			onClickItem(item) {//选择后传回上一个页面
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				prevPage.setData({
					commoditydata: item
				})
				wx.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style lang="less">
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
</style>
