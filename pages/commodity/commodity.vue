<template>
	<view class="chieflist_class" >
		<van-tabs type="card" :active="active" @click="onClick" color="#85c43f">
		  <van-tab title="门店商品" name='0'></van-tab>
		  <van-tab title="平台商品" name='1'></van-tab>
		</van-tabs>
			<van-search :value="SearchName" placeholder="搜索商品名称" @search="onSearch" @clear="onSearch"/>
			<view class="default_class" v-if="tabledatalist.length===0">
				<img src="../../static/img/image-default.png">
				<span>暂无数据</span>
			</view>
			<view v-else>
				<view class="list_table_div">
					<view class="tablelist_div" v-for="(item,index) in tabledatalist" :key="index" @click="commedit(item)">
						<!-- commoditydetails  跳转详情事件 -->
						<view class="img_userimg" >
							<img :src="item.picUrl">
						</view>
						<view class="right_text">
							<span class="name_text">{{item.name}}</span>
							<span class="text_jianjie">{{item.brief}}</span>
							<span class="originalprice">￥{{item.counterPrice}}</span>
							<span class="presentprice">￥{{item.retailPrice}}</span>
							<span class="status_text" v-if="active == 0">状态：{{item.isOnline == 2?'下架':item.isOnline == 1?'上架':''}}</span>
						</view>
						<view class="postion_button" v-if="active == 0">
							<van-button class="buttonrout" v-if="active == 1 && item.isOnline == 2" color="#85c43f" plain round size="mini" @click="putshelves(item.id)">上架</van-button>
							<van-button class="buttonrout" v-if="active == 1 && item.isOnline == 1" color="#ee0a24" plain round size="mini" @click="offshelf(item.id)">下架</van-button>
							<van-button class="buttonrout" v-if="active == 0" color="#85c43f" plain round size="mini" @click="commedit(item)">编辑</van-button>
						</view>
					</view>
				</view>
				<view v-show="isLoadMore">
					<uni-load-more :status="loadStatus" ></uni-load-more>
				</view>
			</view>
			<view v-if="active == 0" class="buttonrightpost" @click="add_groupwork">新增</view>
		<view v-if="active == 1" class="buttonrightpost buttonrightpost-class" @click="$refs.popup.open()">分类</view>
		<uni-popup ref="popup" type="top" background-color="#fff">
			<platform-store @emitClick="handleClick"></platform-store>
		</uni-popup>
					<!-- <platform-store></platform-store> -->
			
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" confirm-button-color="#85c43f"/>
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant/toast/toast';
	import Dialog  from '../../wxcomponents/vant/dialog/dialog';
	import api from '../../static/api/config.js'
	import PlatformStore from './platform-store.vue'
	export default {
		components:{
			PlatformStore
		},
		data() {
			return {
				active:'0',
				SearchName:'',
				tabledatalist:[],
				id:null,		
				page:1,
				pagesize:10,
				loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
				isLoadMore:false,  //是否加载中
			}
		},
		
		onShow() {
			this.tabledatalist = [],
			this.page = 1,
			this.getTableList()
		},
		onReachBottom(){  //上拉触底函数
			if(!this.isLoadMore){  //此处判断，上锁，防止重复请求
				this.isLoadMore=true
				this.page+=1
				this.getTableList()
			}
		},
		onHide(){
			this.id=null	
		},
		methods: {
			handleClick(id){
				this.id=id
				this.page = 1,
				this.tabledatalist = [],
				this.getTableList()
				this.$refs.popup.close()
			},
			onSearch(event){//搜索
				this.SearchName = event.detail;
				this.tabledatalist = [],
				this.id=null
				this.page = 1,
				this.getTableList()
			},
			onClick(event) {//筛选
				this.id=null
				this.active = event.detail.name;
				this.tabledatalist = [],
				this.page = 1,
				this.getTableList()
			},
			commoditydetails(id){//商品详情
				uni.navigateTo({
				    url: '../commodity_details/commodity_details?id='+id+'&type='+this.active
				});
			},
			getTableList(){
				let name = this.SearchName;
				if(!name){
					name=null;
				}
				let apiurl = '';
				if(this.active==0){
					apiurl = 'teamGoods/getList';
				}
				if(this.active==1){
					apiurl = 'goods/getList';
				}
				api.request({
					url: apiurl,
					method: 'post',
					data:{
						pageNum:this.page,
						pageSize:this.pagesize,
						goodsName:name,
						categoryId:this.id
					},
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
			add_groupwork(){//商品管理
				uni.navigateTo({
					url: '../commodity_edit/commodity_edit'
				});
			},
			commedit(item){//编辑
				if(this.active == 0){
					uni.navigateTo({
						url:`../commodity_edit/commodity_edit?id=${item.id}`
					});
				}else{
					let data = JSON.stringify(item)
					uni.navigateTo({
						url: `/pages/add_purchase/add_purchase?item=${data}`
					});
				}
			},
			putshelves(id){//上架
				Dialog.confirm({
					title: '上架',
					message: '是否将此商品上架？',
				}).then(() => {
					api.request({
						url: 'goods/changeStatus',
						method: 'get',
						data:{
							id:id
						}
					}).then(res=>{
						if(res.data.code==0){
							Toast('上架成功');
							this.tabledatalist = [],
							this.page = 1,
							this.getTableList()
						}else{  //接口请求失败的处理
							uni.showToast({title:res.data.message,icon:'none'})
						}
					}).catch(err=>{
						uni.showToast({title:'请求出错',icon:'none'})
					});
				}).catch(() => {
					Toast('取消上架')
				});
			},
			offshelf(id){//下架
				Dialog.confirm({
					title: '下架',
					message: '是否将此商品下架？',
				}).then(() => {
					api.request({
						url: 'goods/changeStatus',
						method: 'get',
						data:{
							id:id
						}
					}).then(res=>{
						if(res.data.code==0){
							Toast('下架成功');
							this.tabledatalist = [],
							this.page = 1,
							this.getTableList()
						}else{  //接口请求失败的处理
							uni.showToast({title:res.data.message,icon:'none'})
						}
					})
				}).catch(() => {
					Toast('取消下架')
				});
			},
			
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
						font-size: 24rpx;
						color: #999999;
						margin-bottom: 8rpx;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.originalprice{
						text-decoration:line-through;
						font-size: 28rpx;
						color: #C0C0C0;
					}
					.presentprice{
						margin-left: 20rpx;
						font-size: 32rpx;
						color: #ee0a24;
					}
					.status_text{
						font-size: 28rpx;
						display: block;
						color: #666666;
						margin-top: 5rpx;
					}
				}
				.postion_button{
					text-align: right;
					.buttonrout{
						margin-left: 20rpx;
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
			left: 20rpx;
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
		.buttonrightpost-class{
			top: 280rpx;
			left: 80%;
		}
	}
</style>
