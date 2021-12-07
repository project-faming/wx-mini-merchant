<template>
	<view class="container" @touchmove.stop.prevent="moveHandle" :style="{height:`${height}px`}">
	  <view class="catalog">
		<scroll-view class="nav" scroll-y="true">
		  <view class="item" :class="{'active' : currentCategory.id == item.id }" v-for="(item,index) in categoryList "  :key="index" @click="getCurrentCategory(item)">{{item.name}}</view>
		</scroll-view>
		<scroll-view class="cate" scroll-y="true">
		  <navigator url="url" class="banner">
			<image class="image" :src="currentCategory.picUrl"></image>
			<view class="txt">{{currentCategory.frontName}}</view>
		  </navigator>
		  <view class="hd">
			<text class="line"></text>
			<text class="txt">{{currentCategory.name}}分类</text>
			<text class="line"></text>
		  </view>
		  <view class="bd">
			<view @click="handleClick(item.id)" class="item" :class="{'last':(index+1) % 3 == 0 }" v-for="(item,index) in currentSubCategoryList" :key="index">
			  <image class="icon" :src="item.picUrl"></image>
			  <text class="txt jhx_f2">{{item.name}}</text>
			</view>
		  </view>
		</scroll-view>
	  </view>
	</view>
</template>

<script>
	import api from '../../static/api/config.js'
	export default {
		data(){
			return{
				categoryList: [],
				currentCategory: {},
				currentSubCategoryList: {},
				scrollLeft: 0,
				scrollTop: 0,
				// goodsCount: 0,
				scrollHeight: 0,
				height:500
			}
		},
		onLoad(){
			this.getCatalog();
		},
		onPullDownRefresh() {
		this.getCatalog();
		},
		mounted(){
		  this.getCatalog();
		  uni.getSystemInfo({
		      success:(res)=> {
		          console.log(res.windowHeight);
		  		this.height = res.windowHeight-100
		      }
		  });
		},
		methods:{
		  moveHandle(){
			  return false
		  },
		  getCatalog(){
			   wx.showLoading({
				title: '加载中...',
			  })
			  api.request({
				url: '/c/wx/catalog/index',
				method: 'get',
				c:1
			  }).then((res)=>{
					this.categoryList=res.data.data.categoryList,
					this.currentCategory=res.data.data.currentCategory,
					this.currentSubCategoryList=res.data.data.currentSubCategory
					
			  }).finally(()=>{
				  wx.hideLoading();
			  })
		  },
		  getCurrentCategory(item){
			  api.request({
				url: '/c/wx/catalog/current',
				method: 'get',
				c:1,
				data:{
					id: item.id
				}
			  }).then(res=>{
				  this.currentCategory=res.data.data.currentCategory,
				  this.currentSubCategoryList=res.data.data.currentSubCategory
			  })
		  },
		  handleClick(id){
			  this.$emit('emitClick',id)
		  }
		}
	}
</script>

<style>
	
	.container {
	  background: #f9f9f9;
	  width: 100%;
	  display: flex;
	  flex-direction: column;
	  overflow-y: auto;
	}
	.catalog {
	  flex: 1;
	  width: 100%;
	  background: #fff;
	  display: flex;
	  border-top: 1px solid #fafafa;
	}
	
	.catalog .nav {
	  width: 162rpx;
	  height: 100%;
	}
	
	.catalog .nav .item {
	  text-align: center;
	  line-height: 90rpx;
	  width: 162rpx;
	  height: 90rpx;
	  color: #333;
	  font-size: 28rpx;
	  border-left: 6rpx solid #fff;
	}
	
	.catalog .nav .item.active {
	  color: #85c43f;
	  font-size: 29rpx;
	  border-left: 6rpx solid #85c43f;
	}
	
	.catalog .cate {
	  border-left: 1px solid #fafafa;
	  flex: 1;
	  height: 100%;
	  padding: 0 30rpx 0 30rpx;
	}
	
	.banner {
	  display: block;
	  height: 222rpx;
	  width: 100%;
	  position: relative;
	}
	
	.banner .image {
	  position: absolute;
	  top: 30rpx;
	  left: 0;
	  border-radius: 4rpx;
	  height: 192rpx;
	  width: 100%;
	}
	
	.banner .txt {
	  position: absolute;
	  top: 30rpx;
	  text-align: center;
	  color: #fff;
	  font-size: 28rpx;
	  left: 0;
	  height: 192rpx;
	  line-height: 192rpx;
	  width: 100%;
	}
	
	.catalog .hd {
	  height: 108rpx;
	  width: 100%;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	
	.catalog .hd .txt {
	  font-size: 24rpx;
	  text-align: center;
	  color: #333;
	  padding: 0 10rpx;
	  width: auto;
	}
	
	.catalog .hd .line {
	  width: 100rpx;
	  height: 1px;
	  background: #d9d9d9;
	}
	
	.catalog .bd {
	  height: auto;
	  width: 100%;
	  overflow: hidden;
	}
	
	.catalog .bd .item {
	  display: block;
	  float: left;
	  height: 200rpx;
	  width: 152rpx;
	  margin-right: 28rpx;
	}
	
	.catalog .bd .item.last {
	  margin-right: 0;
	}
	
	.catalog .bd .item .icon {
	  height: 152rpx;
	  width: 152rpx;
	}
	
	.catalog .bd .item .txt {
	  display: block;
	  text-align: center;
	  font-size: 24rpx;
	  color: #333;
	  height: 62rpx;
	  width: 152rpx;
	}

</style>
