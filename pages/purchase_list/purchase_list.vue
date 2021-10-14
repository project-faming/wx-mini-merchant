<template>
	<view class="chieflist_class" >
		<van-tabs type="card" :active="active" @click="onClick" color="#85c43f">
		  <van-tab title="已申请" name='1'></van-tab>
		  <van-tab title="申请通过" name='2'></van-tab>
		  <van-tab title="申请未通过" name='3'></van-tab>
		</van-tabs>
		<van-search :value="SearchName" placeholder="搜索商品" @search="onSearch" @clear="onSearch"/>
		<view class="default_class" v-if="tabledatalist.length===0">
			<img src="../../static/img/image-default.png">
			<span>暂无数据</span>
		</view>
		<view v-else>
			<view class="list_table_div">
				<view class="tablelist_div" v-for="(item,index) in tabledatalist" :key="index">
					<view class="img_userimg">
						<img :src="item.picUrl">
					</view>
					<view class="right_text">
						<span>商品名称：<font>{{item.goodsName}}</font></span>
						<span>数量：<font>{{item.total}}</font></span>
						<span>申请时间：<font>{{item.addTime}}</font></span>
						<span>状态：<font>{{item.type==1?'已申请':item.type==2?'申请通过':item.type==3?'申请未通过':''}}</font></span>
					</view>
				</view>
			</view>
			<view v-show="isLoadMore">
				<uni-load-more :status="loadStatus" ></uni-load-more>
			</view>
		</view>
		<view class="buttonrightpost" @click="add_purchase">申请</view>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import api from '../../static/api/config.js'
	import Toast from '../../wxcomponents/vant/toast/toast';
	export default {
		data() {
			return {
				active:'1',
				SearchName:'',
				tabledatalist:[],
								
				page:1,
				pagesize:10,
				loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
				isLoadMore:false,  //是否加载中
			}
		},
		onLoad() {
			this.getTableList()
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
				this.tabledatalist = [],
				this.page = 1,
				this.getTableList()
			},
			onSearch(event){//搜索
				this.SearchName = event.detail;
				this.tabledatalist = [],
				this.page = 1,
				this.getTableList()
			},
			getTableList(){
				let name = this.SearchName;
				if(!name){
					name=null;
				}
				api.request({
					url: 'dts-brand-purchase/getList',
					method: 'post',
					data:{
						pageNum:this.page,
						pageSize:this.pagesize,
						goodsName:name,
						type:this.active
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
			add_purchase(){//申请采购跳转
				uni.navigateTo({
					url: '../add_purchase/add_purchase'
				});
			}
		}
	}
</script>

<style lang="less">
	.chieflist_class{
		padding: 40rpx;
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
			.tablelist_div{
				margin-bottom: 20rpx;
				border-bottom: 2rpx solid #ccc;
				padding-bottom: 20rpx;
				overflow: hidden;
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
					span{
						display: block;
						font-size: 28rpx;
						color: #333333;
						margin-bottom: 10rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						font{
							font-weight: 400;
							color: #999999;
						}
					}
				}
				&:last-child{
					border: none;
				}
			}
		}
		.buttonrightpost{
			position: fixed;
			bottom: 50rpx;
			right: 20rpx;
			box-shadow:0 2rpx 10rpx 0 rgba(0,0,0,0.2);
			background: #85c43f;
			border: none;
			border-radius: 100rpx;
			width: 100rpx;
			height: 100rpx;
			color: #fff;
			line-height: 100rpx;
			font-size: 26rpx;
			overflow: hidden;
			text-align: center;
		}
	}
</style>
