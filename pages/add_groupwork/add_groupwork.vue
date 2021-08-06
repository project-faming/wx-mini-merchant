<template>
	<view>
		<van-cell-group>
			<view class="btton_shop_com">
				<button class="select_button" @click="selectproduct">选择商品</button>
			</view>
			<van-field :value="commodityNmae" readonly label="商品名称" placeholder="请选择商品名称"/>
			<van-field :value="teamListName" @input="teamListName = $event.detail" label="拼团标题" clearable placeholder="请输入拼团标题"/>
			<van-field :value="numberpeople" @input="numberpeople = $event.detail" type="number" label="成团人数" clearable placeholder="请输入成团人数"/>
			<view class="group_field_class">
				<view class="group_border">
					<view class="left_view">到期时间</view>
					<view class="right_view" @click="Timepopupshow = true">
						<span v-if="expiretime === ''" class="nones">请选择到期时间</span>
						<span v-else>{{expiretime}}</span>
					</view>
				</view>
			</view>
			<van-field :value="groupprice" @input="groupprice = $event.detail" type="digit" label="拼团价格" placeholder="请输入拼团价格"/>
			<van-field :value="commission" @input="commission = $event.detail" label="团长佣金" placeholder="请输入团长佣金" clearable />
			<view class="group_field_class">
				<view class="group_border none_border">
					<view class="left_view">选择团长</view>
					<view class="right_view" @click="groupworkshow = true">
						<span v-if="groupwork_name === ''" class="nones">请选择团长</span>
						<span v-else>{{groupwork_name}}</span>
					</view>
				</view>
			</view>
		</van-cell-group>
		<view class="btton_shop_com">
			<button class="sumber_button" @click="sumberbutton">确 认</button>
		</view>
		<van-popup :show="Timepopupshow" position="bottom">
		  <van-datetime-picker
		    type="date"
			:min-date="minDate"
			:formatter="formatter"
		    @confirm="onConfirm"
		    @cancel="Timepopupshow = false"/>
		</van-popup>
		<van-popup :show="groupworkshow" position="bottom">
			<van-search placeholder="请输入团长手机号搜索"  @search="onSearch"/>
			<van-picker
			  show-toolbar
			  title=" "
			  :columns="groupworkData"
			  @cancel="groupworkshow = false"
			  @confirm="groupworkConfirm"
			/>
		</van-popup>
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
				teamListName:'',//拼团标题
				numberpeople:'',//拼团人数
				expiretime:'',//到期时间
				groupprice:'',//拼团价格
				commission:'',//团长佣金
				groupwork_name:'',//团长
				groupwork_id:'',//团长ID
				groupworkshow:false,//选择团长弹框
				Timepopupshow:false,//选择时间弹框
				minDate: new Date().getTime(),
				userPhone:'',
				groupworkData:[],//团长手机号				
			}
		},
		onLoad() {
			
		},
		onShow() {
			const pages = getCurrentPages()
			const currPage = pages[pages.length - 1] // 当前页
			let data = currPage.data.commoditydata
			if(data){
				this.commodityNmae = data.name
				this.commodityid = data.id
			}
			this.getteamlist();
		},
		methods: {
			selectproduct(){//选择商品跳转
				uni.navigateTo({
					url: '../select_product/select_product'
				});
			},
			formatter(type, value) {//日期初始化
				if (type === 'year') {
					return `${value}年`;
				} else if (type === 'month') {
					return `${value}月`;
				} else if (type === 'day') {
					return `${value}日`;
				}
				return value;
			},
			add0(m){return m<10?'0'+m:m },
			onConfirm(event) {//选择时间
				var time = new Date(event.detail);
				var y = time.getFullYear();
				var m = time.getMonth()+1;
				var d = time.getDate();
				var h = time.getHours();
				var mm = time.getMinutes();
				var s = time.getSeconds();
				this.expiretime = y+'-'+this.add0(m)+'-'+this.add0(d);
				this.Timepopupshow = false;
			},
			onSearch(event){//搜索
				this.userPhone = event.detail;
				this.getteamlist();
			},
			groupworkConfirm(event){//选择团长
				this.groupwork_name = event.detail.value.text;
				this.groupwork_id = event.detail.value.id;
				this.groupworkshow = false;
			},
			sumberbutton(){//提交
				let commodityid = this.commodityid;//商品id
				let numberpeople = this.numberpeople;//拼团人数
				let expiretime = this.expiretime;//到期时间
				let groupprice = this.groupprice;//拼团价格
				let commission = this.commission;//团长佣金
				let teamListName = this.teamListName;//拼团标题
				let groupwork_id = this.groupwork_id;//团长ID
				if(!commodityid){
					Toast('商品不能为空');
					return;
				}
				if(!teamListName){
					Toast('拼团标题不能为空');
					return;
				}
				if(!numberpeople){
					Toast('人数不能为空');
					return;
				}
				if(!expiretime){
					Toast('到期时间不能为空');
					return;
				}
				if(!groupprice){
					Toast('拼团价格不能为空');
					return;
				}
				if(!commission){
					Toast('团长佣金不能为空');
					return;
				}
				if(!groupwork_id){
					Toast('团长不能为空');
					return;
				}
				api.request({
					url: 'teamList/create',
					method: 'post',
					data:{
						commissionRate:commission,
						discount:groupprice,
						discountMember:numberpeople,
						expireTime:expiretime,
						goodsId:commodityid,
						teamListName:teamListName,
						userId:groupwork_id
					}
				}).then(res=>{
					if(res.data.code==0){
						Toast('创建成功');
						uni.switchTab({
							url: '../groupwork/groupwork'
						});
					}else{  //接口请求失败的处理
						uni.showToast({title:res.data.message,icon:'none'})
					}
				}).catch(err=>{
					uni.showToast({title:'请求出错',icon:'none'})
				});
			},
			getteamlist(){//团长列表
				let phone= this.userPhone;
				if(!phone){
					phone = null
				}
				api.request({
					url: 'team/getList',
					method: 'post',
					data:{
						pageNum:1,
						pageSize:1000,
						userPhone:phone,
						teamType:2
					}
				}).then(res=>{
					if(res.data.code==0){
						let data = res.data.data.list;
						if(data){
							let arr = [];
							for(let i = 0;i< data.length;i++){
								arr.push({text:data[i].nickname+','+data[i].userPhone,id:data[i].userId})
							}
							this.groupworkData = arr;
						}
					}else{  //接口请求失败的处理
						uni.showToast({title:res.data.message,icon:'none'})
					}
				}).catch(err=>{
					uni.showToast({title:'请求出错',icon:'none'})
				});
			}
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
	.group_field_class{
		padding: 10px 0 0 16px;
		overflow: hidden;
		.group_border{
			overflow: hidden;
			padding-bottom: 10px;
			border-bottom: 1px solid #f5f5f5;
			.left_view{
				max-width: 90px;
				min-width: 90px;
				float: left;
				font-size: 14px;
				color: #323233;
			}
			.right_view{
				float: left;
				width:calc(100% - 90px);
				height: 24px;
				color: #323233;
				font-size: 14px;
			}
			.nones{
				color: #969799;
			}
		}
		.none_border{
			border: none;
		}
	}
</style>
