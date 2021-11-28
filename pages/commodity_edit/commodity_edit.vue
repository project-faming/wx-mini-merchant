<template>
	<view>
		<van-cell-group>
			<van-field :value="formdata.goodsName" label="商品名称" placeholder="请输入商品名称" @input="formdata.goodsName = $event.detail"/>
			<van-field :value="formdata.counterPrice" type="number" label="专柜价格" clearable placeholder="请输入专柜价格" @input="formdata.counterPrice = $event.detail"/>
			<van-field :value="formdata.retailPrice" type="number" label="零售价格" clearable placeholder="请输入零售价格" @input="formdata.retailPrice = $event.detail"/>
			<van-field :value="formdata.unit" label="单位" placeholder="请输入单位(如:件/个等)" clearable @input="formdata.unit = $event.detail"/>
			<van-field :value="formdata.brief" label="简介" clearable placeholder="请输入简介" @input="formdata.brief = $event.detail"/>
			<van-field :value="formdata.keywords" label="关键字" placeholder="请输入关键字" clearable @input="formdata.keywords = $event.detail"/>
			<view class="group_field_class">
				<view class="group_border">
					<view class="left_view">主图</view>
					<view class="upload_view" @click="uploadimg_up">
						<view class="upimgview" v-if="formdata.picUrl === ''">
							<img src="../../static/img/upload_img.png">
							<span>上传图片</span>
						</view>
						<img class="imgslooks" v-else :src="formdata.picUrl">
					</view>
				</view>
			</view>
			<view class="group_field_class">
				<view class="group_border">
					<view class="left_view">分类</view>
					<view class="right_view" @click="categoryshow = true">
						<span v-if="!formdata.categoryName" class="nones">请选择分类</span>
						<span v-else>{{formdata.categoryName}}</span>
					</view>
				</view>
			</view>
			<view class="group_field_class">
				<view class="group_border">
					<view class="left_view">状态</view>
					<view class="right_view" @click="statusshow = true">
						<span v-if="!formdata.isOnline" class="nones">请选择状态</span>
						<span v-else>{{formdata.isOnline==1?'上架':formdata.isOnline==2?'下架':''}}</span>
					</view>
				</view>
			</view>
			<view class="group_field_class">
				<view class="group_border">
					<view class="left_view">是否新品</view>
					<view class="right_view" @click="Newproductshow = true">
						<span v-if="!formdata.isNew" class="nones">请选择是否新品</span>
						<span v-else>{{formdata.isNew==0?'否':formdata.isNew==1?'是':''}}</span>
					</view>
				</view>
			</view>
			<view class="group_field_class">
				<view class="group_border">
					<view class="left_view">是否热卖</view>
					<view class="right_view" @click="BestSellersshow = true">
						<span v-if="!formdata.isHot" class="nones">请选择是否热卖</span>
						<span v-else>{{formdata.isHot==0?'否':formdata.isHot==1?'是':''}}</span>
					</view>
				</view>
			</view>
			<view class="group_field_class">
				<view class="group_border">
					<view class="left_view">商品详情</view>
					<view class="right_view">
						<text class="textedit" @click="editor_detil(formdata.detail)">编辑</text>
					</view>
				</view>
			</view>
			<!-- <van-field :value="formdata.detail" :border="false" @input="formdata.detail = $event.detail" type="textarea" label="商品详情" :autosize="{maxHeight: 100, minHeight: 80}" clearable placeholder="请输入商品详情"/> -->
		</van-cell-group>
		<view class="btton_shop_com">
			<button class="sumber_button" @click="sumberbutton">提 交</button>
		</view>
		<van-popup :show="statusshow" position="bottom">
			<van-picker
			  show-toolbar
			  title=" "
			  :columns="statusData"
			  @cancel="statusshow = false"
			  @confirm="statusConfirm"
			/>
		</van-popup>
		<van-popup :show="Newproductshow" position="bottom">
			<van-picker
			  show-toolbar
			  title=" "
			  :columns="yesornodata"
			  @cancel="Newproductshow = false"
			  @confirm="NewproductConfirm"
			/>
		</van-popup>
		<van-popup :show="BestSellersshow" position="bottom">
			<van-picker
			  show-toolbar
			  title=" "
			  :columns="yesornodata"
			  @cancel="BestSellersshow = false"
			  @confirm="BestSellersConfirm"
			/>
		</van-popup>
		<van-popup :show="categoryshow" position="right" custom-style="height: 100%;width:80%" @click-overlay='categoryshow=false'>
			<van-tree-select main-active-class="classactive" style="height: 100%;"
			  :items="categorylist"
			  :main-active-index="mainActiveIndex"
			  :active-id="activeId"
			  @click-nav="onClickNav"
			  @click-item="onClickItem"
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
				formdata:{
					goodsName:'',//商品名称
					id:'',//商品id
					counterPrice:'',//专柜价格
					retailPrice:'',//零售价格
					unit:'',//单位
					brief:'',//简介
					keywords:'',//关键词
					isOnline:'',//状态类型id
					isNew:'',//是否新品
					isHot:'',//是否热卖
					picUrl:'',//图片
					detail:'',//详情
					categoryName:'',//分类名称
					categoryId:'',//分类ID
				},
				categorylist:[],
				mainActiveIndex:0,
				categoryshow:false,//分类弹框
				statusshow:false,//选择状态弹框
				Newproductshow:false,//选择是否新品
				BestSellersshow:false,//选择是否热卖
				statusData:[{text:'上架',id:1},{text:'下架',id:2}],//状态
				yesornodata:[{text:'是',id:1},{text:'否',id:0}],//是否
			}
		},
		onLoad(option) {
			if(option.id !='undefined' && option.id !=''&&option.id != null && option.id != undefined && option.id !='null'){
				this.getcommdetil(option.id);
			}
		},
		onShow() {
			const pages = getCurrentPages()
			const currPage = pages[pages.length - 1] // 当前页
			let data = currPage.data.commoditydata
			if(data){
				this.formdata.detail = decodeURIComponent(data)
			}
			this.getcategory();
		},
		methods: {
			getcategory(){//分类
				api.request({
					url: 'goods/category',
					method: 'post'
				}).then(res=>{
					if(res.data.code == 0){
						let jsonobj = res.data.data.categoryList;
						let str = JSON.stringify(jsonobj);
						let text = new RegExp('label', 'g');
						let id = new RegExp('value', 'g');
						let newStr1 = str && str.replace(text, 'text');
						let newStr = newStr1 && newStr1.replace(id, 'id');
						this.categorylist = JSON.parse(newStr);
					}else{  //接口请求失败的处理
						uni.showToast({title:res.data.message,icon:'none'})
					}
				});
			},
			editor_detil(html){//编辑详情
				uni.navigateTo({
				    url: `../detail_editor/detail_editor?rich=${encodeURIComponent(html)}`
				});
			},
			getcommdetil(id){//详情
				api.request({
					url: 'teamGoods/details',
					method: 'get',
					data:{
						id:id
					}
				}).then(res=>{
					if(res.data.code==0){
						let data = res.data.data;
						this.formdata = {
							goodsName:data.name,//商品名称
							id:data.id,//商品id
							counterPrice:data.counterPrice,//专柜价格
							retailPrice:data.retailPrice,//零售价格
							unit:data.unit,//单位
							brief:data.brief,//简介
							keywords:data.keywords,//关键词
							categoryId:data.categoryId,//分类ID
							categoryName:data.categoryName,//分类ID
							isOnline:data.isOnline,//状态类型id
							isNew:data.isNew,//是否新品
							isHot:data.isHot,//是否热卖
							picUrl:data.picUrl,//图片
							detail:data.detail,//详情
						}
					}else{  //接口请求失败的处理
						uni.showToast({title:res.data.message,icon:'none'})
					}
				});
			},
			uploadimg_up(){//上传图片
				uni.chooseImage({
				    count: 1, //上传图片的数量，默认是9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success:((res)=>{
						const tempFilePaths = res.tempFilePaths;    //拿到选择的图片，是一个数组
						const token = uni.getStorageSync('token');
						uni.uploadFile({
						  url:api.baseurl+'teamGoods/upload',		//post请求的地址
						  filePath:tempFilePaths[0],
						  header:{
							'X-Dts-Token' : token
						  },
						  name:'file',	
						  success: (res) => {
							  var obj = JSON.parse(res.data);
							  if(obj.code == 0){
								this.formdata.picUrl = obj.data.url;
							  }
						  }
						})
					})
				});
			},
			onClickNav({ detail = {} }) {
				this.mainActiveIndex = detail.index || 0
			  },
			
			  onClickItem({ detail = {} }) {
			    const id = this.formdata.categoryId === detail.id ? null : detail.id;
			    const name = this.formdata.categoryName === detail.text ? null : detail.text;
				this.formdata.categoryId = id;
				this.formdata.categoryName = name;
				this.categoryshow = false;
			  },
			statusConfirm(event){//选择状态
				this.formdata.isOnline = event.detail.value.id;
				this.statusshow = false;
			},
			NewproductConfirm(event){//选择是否新品
				this.formdata.isNew = event.detail.value.id;
				this.Newproductshow = false;
			},
			BestSellersConfirm(event){//选择是否热卖
				this.formdata.isHot = event.detail.value.id;
				this.BestSellersshow = false;
			},
			sumberbutton(){//提交
				let data = this.formdata
				let apiurl = '';
				if(data.id === ''){
					apiurl = 'teamGoods/create'
				}else{
					apiurl = 'teamGoods/edit'
				}
				api.request({
					url: apiurl,
					method: 'post',
					data:data
				}).then(res=>{
					if(res.data.code==0){
						Toast('操作成功');
						uni.switchTab({
							url: '../commodity/commodity'
						});
					}else{  //接口请求失败的处理
						uni.showToast({title:res.data.message,icon:'none'})
					}
				});
			},
		}
	}
</script>
<style>
	.van-sidebar-item--selected{
		border-color:#85c43f !important;
	}
	.van-tree-select{
		height: 100% !important;
	}
</style>
<style lang="less" scoped>
	.btton_shop_com{
		padding: 30rpx;
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
				font-size: 28rpx;
				.textedit{
					font-size: 30rpx;
					color: #007AFF;
				}
			}
			.upload_view{
				float: left;
				width:calc(100% - 100px);
				height: 300rpx;
				border: 1px dashed #ccc;
				border-radius: 10rpx;
				.upimgview{
					text-align: center;
					padding-top: 40rpx;
					img{
						width: 160rpx;
						height: 160rpx;
					}
					span{
						display: block;
						font-size: 24rpx;
						color: #aaaaaa;
						font-weight: bold;
					}
				}
				.imgslooks{
					width: 100%;
					height: 100%;
				}
			}
			.nones{
				color: #969799;
			}
		}
	}
</style>
