<template>
	<view class="chieflist_class" >
		<van-tabs type="card" :active="active" @click="onClick" color="#85c43f">
		  <van-tab title="未审核" name='1'></van-tab>
		  <van-tab title="已审核" name='2'></van-tab>
		</van-tabs>
		<van-search :value="userPhone" placeholder="搜索手机号" @search="onSearch" @clear="onSearch"/>
		<view class="default_class" v-if="tabledatalist.length===0">
			<img src="../../static/img/image-default.png">
			<span>暂无数据</span>
		</view>
		<view v-else>
			<view class="list_table_div">
				<view class="tablelist_div" v-for="(item,index) in tabledatalist" :key="index">
					<view class="img_userimg">
						<img :src="item.avatarUrl">
					</view>
					<view class="right_text">
						<span>昵称：<font>{{item.nickname}}</font></span>
						<span>手机：<font>{{item.userPhone}}</font></span>
						<span>加入时间：<font>{{item.addTime}}</font></span>
						<span>状态：<font>{{item.teamType==1?'未审核':item.teamType==2?'已审核':''}}</font></span>
						<view class="postion_button" v-if="item.teamType==1" @click="dialogstatus(item.id)">审核</view>
					</view>
				</view>
			</view>
			<view v-show="isLoadMore">
				<uni-load-more :status="loadStatus" ></uni-load-more>
			</view>
		</view>
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" confirm-button-color="#85c43f"/>
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
				userPhone:'',
								
				page:1,
				pagesize:10,
				loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
				isLoadMore:false,  //是否加载中
			}
		},
		onLoad() {
			this.getteamlist()
		},

		onReachBottom(){  //上拉触底函数
			if(!this.isLoadMore){  //此处判断，上锁，防止重复请求
				this.isLoadMore=true
				this.page+=1
				this.getteamlist()
			}
		},
		methods: {
			onSearch(event){//搜索
				this.userPhone = event.detail;
				this.tabledatalist = [],
				this.page = 1,
				this.getteamlist()
			},
			onClick(event) {
				this.active = event.detail.name;
				this.page = 1;
				this.tabledatalist = [];
				this.getteamlist();
			},
			getteamlist(){//团长列表
				let phone = this.userPhone;
				if(!phone){
					phone=null;
				}
				api.request({
					url: 'team/getList',
					method: 'post',
					data:{
						pageNum:1,
						pageSize:10,
						userPhone:phone,
						teamType:this.active
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
						uni.showToast({title:res.data.msg,icon:'none'})
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
			dialogstatus(id){//审核
				Dialog.confirm({
				  title: '审核',
				  message: '是否将此申请审核通过？',
				  
				}).then(() => {
				    // on confirm
					api.request({
						url: 'team/pass',
						method: 'post',
						data:{
							id:id
						}
					}).then(res=>{
						if(res.data.code==0){
							Toast('审核通过');
							this.page = 1;
							this.tabledatalist = [];
							this.getteamlist()
						}else{  //接口请求失败的处理
							uni.showToast({title:res.data.msg,icon:'none'})
						}
					}).catch(err=>{
						uni.showToast({title:'请求出错',icon:'none'})
					});
				}).catch(() => {});
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
				overflow: hidden;
				border-bottom: 2rpx solid #ccc;
				padding-bottom: 20rpx;
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
					position: relative;
					height: 220rpx;
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
					.postion_button{
						position: absolute;
						right: 4rpx;
						bottom: 0;
						background: #85c43f;
						font-size: 24rpx;
						border-radius: 40rpx;
						padding: 6rpx 20rpx;
						color: #fff;
					}
				}
				&:last-child{
					border: none;
				}
			}
		}
		
	}
</style>
