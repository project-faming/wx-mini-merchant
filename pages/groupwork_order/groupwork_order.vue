<template>
	<view class="chieflist_class" >
		<view class="paddingnont">
			<van-tabs type="card" :active="active" @click="onClick" color="#85c43f">
			  <van-tab title="未核销" name='1'></van-tab>
			  <van-tab title="已核销" name='2'></van-tab>
			</van-tabs>
		</view>
		<view class="default_class" v-if="tabledatalist.length===0">
			<img src="../../static/img/image-default.png">
			<span>暂无数据</span>
		</view>
		<view v-else>
			<view class="list_table_div">
				<view class="tablelist_div" v-for="(item,index) in tabledatalist" :key="index">
					<view class="img_userimg" @click="getgroupdetil(item.id)">
						<img :src="item.picUrl">
					</view>
					<view class="right_text">
						<span>团长昵称：<font>{{item.nickName}}</font></span>
						<span>团长手机：<font>{{item.phone}}</font></span>
						<span>参与时间：<font>{{item.addTime}}</font></span>
						<span>状态：<font>{{item.type==1?'未核销':item.type==2?'已核销':''}}</font></span>
						<span v-if="item.type==2">核销时间：<font>{{item.codeTime}}</font></span>
						<view class="postion_button" v-if="item.type==1" @click="dialogstatus(item.id)">核销</view>
					</view>
				</view>
			</view>
			<view v-show="isLoadMore">
				<uni-load-more :status="loadStatus" ></uni-load-more>
			</view>
		</view>
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" confirm-button-color="#85c43f"	 />
		<van-dialog use-slot title="核销" :show="writeoffdialog" show-cancel-button @close="writeoffdialog = false" @cancel="writeoffclose" @confirm="writeoffconfirm">
			<van-cell-group class="writeoclass">
			  <van-field :value="writeoffnumber" placeholder="请输入核销码" :border="false" @input="writeoffnumber = $event.detail"/>
			</van-cell-group>
		</van-dialog>
		<van-popup :show="showdetile" @close="showdetile=false" custom-style="width:80%">
			<view class="group_detil_class">
				<view class="list_ul">
					商品名称:{{groupdetil.goodsName}}
				</view>
				<view class="list_ul">
					金额: <font class="manytext">￥{{groupdetil.discount}}</font>
				</view>
				<view class="list_ul">
					状态:{{groupdetil.type==1?'未核销':groupdetil.type==2?'已核销':''}}
				</view>
				<view class="list_ul">
					商家ID:{{groupdetil.brandId}}
				</view>
				<view class="list_ul">
					参与时间:{{groupdetil.addTime}}
				</view>
			</view>
		</van-popup>
	</view>
</template>

<script>
	import api from '../../static/api/config.js'
	import Toast from '../../wxcomponents/vant/toast/toast';
	import Dialog  from '../../wxcomponents/vant/dialog/dialog';
	export default {
		data() {
			return {
				showdetile:false,
				groupdetil:null,
				active:'1',
				tabledatalist:[],
				writeoffdialog:false,
				writeoffID:'',//记录ID
				writeoffnumber:'',//核销码
								
				page:1,
				pagesize:9,
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
			getgroupdetil(id){
				api.request({
					url: 'teamorder/details',
					method: 'get',
					data:{
						id:id
					}
				}).then(res=>{
					if(res.data.code==0){
						this.groupdetil = res.data.data;
						this.showdetile = true;
					}else{  //接口请求失败的处理
						uni.showToast({title:res.data.message,icon:'none'})
					}
				});
			},
			onClick(event) {
				this.active = event.detail.name;
				this.tabledatalist = [],
				this.page = 1,
				this.getTableList()
			},
			getTableList(){
				api.request({
					url: 'teamorder/getList',
					method: 'post',
					data:{
						pageNum:this.page,
						pageSize:this.pagesize,
						type:Number(this.active)
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
			dialogstatus(val){//核销弹框
				this.writeoffdialog = true
				this.writeoffID = val
			},
			writeoffclose() {//关闭
				this.writeoffdialog = false;
				this.writeoffnumber = '';
			},
			writeoffconfirm(){//核销提交
				if(this.writeoffnumber){
					api.request({
						url: 'teamorder/changeCode',
						method: 'post',
						data:{
							code:this.writeoffnumber,
							orderId:this.writeoffID
						}
					}).then(res=>{
						if(res.data.code == 0){
							Toast('核销成功');
							this.writeoffdialog = false;
							this.writeoffnumber = '';
							this.tabledatalist = [],
							this.page = 1,
							this.getTableList()
						}else{  //接口请求失败的处理
							uni.showToast({title:res.data.message,icon:'none'});
						}
					}).catch(err=>{
					});
				}
			},
		}
	}
</script>

<style lang="less">
	.group_detil_class{
		padding: 40rpx;
		.list_ul{
			font-size: 36rpx;
			color: #333333;
			line-height: 60rpx;
			.manytext{
				font-size: 40rpx;
				color: #EE0A24;
			}
		}
	}
	.chieflist_class{
		padding: 40rpx;
		.paddingnont{
			margin-bottom: 40rpx;
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
			.tablelist_div{
				margin-bottom: 20rpx;
				overflow: hidden;
				border-bottom: 2rpx solid #ccc;
				padding-bottom: 20rpx;
				.img_userimg{
					width: 220rpx;
					height: 230rpx;
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
					height: 230rpx;
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
		.writeoclass{
			padding: 40rpx;
		}
	}
</style>
