<!--
 * @Description:
 * @Author: ZachGmy
 * @Date: 2022-06-28 09:04:49
 * @LastEditors: ZachGmy
 * @LastEditTime: 2022-11-27 20:08:22
-->
<template>
  <div class="hospital">
    <!-- 顶部背景 -->
    <div class="bgArea">医疗救治定点医院和发热门诊一览</div>
    <!-- 搜索 -->
    <div class="searchArea">
      <!-- 搜索框 -->
      <el-input
        style="width: 20%; padding-right: 10px"
        placeholder="请输入内容"
        v-model="inputStr"
        clearable
      >
      </el-input>
      <!-- 搜索按钮 -->
      <el-button type="primary" @click="getHosData">搜索</el-button>
    </div>
    <!-- 医院列表 -->
    <div class="hosArea" @click="toMapPage(item)" v-for="(item, index) in hosData" :key="item.id">
      <!-- 医院信息 -->
      <div class="hosList">
        <!-- 名称 -->
        <div class="hosName">
          <!-- 序号 -->
          <div class="no">{{ index + 1 }}</div>
          {{ item.name }}
        </div>

        <!-- 简介 -->
        <div class="hosDesc">{{ item.flags }}</div>
        <!-- 地址 -->
        <div class="hosAddress">
          {{ item.province + item.city + item.area + item.address }}
        </div>
      </div>
      <!-- 定位 -->
      <div class="distance">
        <!-- 图标 -->
        <div class="icon">
          <img src="../assets/dingwei.png" alt="" width="30px" />
        </div>
        <!-- 距离 -->
        <div class="dis">{{ item.distance }}km</div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "@/utils/request";
export default {
  data() {
    return {
      // 用户输入
      inputStr: "",
      // 医院数据
      hosData: [],
    };
  },
  created() {
    this.getHosData();
    this.getHosDistance();
  },
  methods: {
    // 获取当前位置和医院位置距离
    getHosDistance() {
      let _this=this
      AMap.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量
          offset: [10, 20],
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          position: "RB",
        });

        geolocation.getCurrentPosition(function (status, result) {
          if (status == "complete") {
            onComplete(result);
          } else {
            onError(result);
          }
        });

        function onComplete(data) {
          // data是具体的定位信息
          // console.log(data);

          // 获取医院经纬度
          _this.hosData.map(item=>{
                      // 获取当前经纬度
          let p1 = [data.position.lng,data.position.lat]
          // 获取医院经纬度
          let p2=[item.longitude,item.latitude]
          var dis = AMap.GeometryUtil.distance(p1, p2);
          // 使用$set(目标对象,'新增属性名字',新增属性的值)
          _this.$set(item,'distance',(dis/1000).toFixed(2))
          })
        }

        function onError(data) {
          // 定位出错
          console.log(data);
        }
      });
    },
    // 获取医院数据
    async getHosData() {
      // 设置参数
      let params = {
        page: 1,
        pageSize: 100,
        name: this.inputStr,
      };
      // 发送请求
      let res = await get("/hospital/pageQuery", params);
      // console.log(res);
      this.hosData = res.data.list;
    },
    // 跳转到路由界面，并将点击医院对象传递过去
    toMapPage(item){
      this.$router.push({
        path:'/hospital/map',
        query:item
      })
    }
  },
};
</script>

<style scoped>
/* 顶部背景 */
.bgArea {
  /* 背景图片 */
  background-image: url(../assets/bg1.png);
  width: 100%;
  line-height: 140px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  padding-left: 30px;
  border-radius: 10px;
}
/* 搜索 */
.searchArea {
  margin: 20px 0;
  margin-bottom: 50px;
}
/* 医院区域 */
.hosArea {
  display: flex;
  border-bottom: 1px solid #f8f8f8;
  margin-top: 10px;
}
/* 医院信息 */
.hosArea .hosList {
  flex: 1;
}
/* 序号 */
.hosList .no {
  display: inline-block;
  background-color: #f4f4f4;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
}
/* 医院名称 */
.hosList .hosName {
  font-size: 18px;
}
/* 医院简介 */
.hosList .hosDesc {
  background-color: #ffb34e;
  display: inline-block;
  padding: 0.2em;
  color: white;
  border-radius: 5px;
  margin: 10px 0;
}
/* 医院地址 */
.hosList .hosAddress {
  color: #999;
  margin-bottom: 5px;
}
/* 距离 */
.distance {
  text-align: center;
  margin-left: 10px;
}
</style>
