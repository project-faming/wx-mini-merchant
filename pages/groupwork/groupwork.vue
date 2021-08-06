<template>
	<view class="chieflist_class">
		<van-tabs type="card" :active="active" @click="onClick" color="#85c43f">
		  <van-tab title="进行中" name='1'></van-tab>
		  <van-tab title="已成团" name='2'></van-tab>
		</van-tabs>
		<van-search :value="teamListName" placeholder="搜索拼团活动" @search="onSearch" @clear="onSearch" />
		<view class="default_class" v-if="tabledatalist.length === 0">
			<img src="../../static/img/image-default.png">
			<span>暂无数据</span>
		</view>
		<view v-else>
			<view class="list_table_div">
				<view class="tablelist_div" v-for="(item,index) in tabledatalist" :key="index" @click="dialogstatus(item.id)">
					<view class="img_userimg">
						<img :src="item.picUrl">
					</view>
					<view class="right_text">
						<span>拼团名称：<font>{{item.teamListName}}</font></span>
						<span>拼团价格：<font>{{item.discount}}</font></span>
						<span>团长手机：<font>{{item.userPhone}}</font></span>
						<span>进度：<font>{{item.userDiscountMember}}人/{{item.discountMember}}人</font></span>
						<span>状态：<font>{{item.type == 1?'进行中':item.type == 2?'已成团':''}}</font></span>
					</view>
				</view>
			</view>
			<view v-show="isLoadMore">
				<uni-load-more :status="loadStatus" ></uni-load-more>
			</view>
		</view>
		<view class="buttonrightpost" @click="add_groupwork">创建</view>
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
				teamListName:'',
				tabledatalist:[],
								
				page:1,
				pagesize:10,
				loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
				isLoadMore:false,  //是否加载中
			}
		},
		onShow() {
			this.tabledatalist = [],
			this.page = 1,
			this.getTableList();
			let token = uni.getStorageSync('token');
			if(token===''){
				uni.navigateTo({
					url: '../login/login'
				});
			}
		},
		onReachBottom(){  //上拉触底函数
			if(!this.isLoadMore){  //此处判断，上锁，防止重复请求
				this.isLoadMore=true
				this.page+=1
				this.getTableList()
			}
		},
		methods: {
			onSearch(event){//搜索
				this.teamListName = event.detail;
				this.tabledatalist = [],
				this.page = 1,
				this.getTableList()
			},
			onClick(event) {//筛选
				if(this.active != event.detail.name){
					this.active = event.detail.name;
					this.tabledatalist = [],
					this.page = 1,
					this.getTableList()
				}
			},
			dialogstatus(val){//查看详情
				uni.navigateTo({
				    url: '../groupwork_details/groupwork_details?id='+val
				});
			},
			getTableList(){//列表查询
				let name = this.teamListName;
				if(!name){
					name=null;
				}
				api.request({
					url: 'teamList/getList',
					method: 'post',
					data:{
						pageNum:this.page,
						pageSize:this.pagesize,
						teamListName:name,
						type:this.active
					}
				}).then(res=>{
					if(res.data.code==0){
						if(res.data.data.list){
							this.tabledatalist = this.tabledatalist.concat(res.data.data.list)
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
			add_groupwork(){//申请采购跳转
				uni.navigateTo({
					url: '../add_groupwork/add_groupwork'
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
					height: 220rpx;
					span{
						display: block;
						font-size: 28rpx;
						color: #333333;
						margin-bottom: 8rpx;
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
	}
</style>
