<!--
 * @Description:
 * @Author: ZachGmy
 * @Date: 2022-06-28 08:54:35
 * @LastEditors: ZachGmy
 * @LastEditTime: 2022-11-27 20:08:39
-->
<template>
  <div>
    <!-- 返回按钮 -->
    <el-button type="primary" @click="goBack">返回</el-button>
    <div id="container" style="height: 600px"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 当前医院中心点
      position: [],
    };
  },
  created() {
    // 获取路由传递来的参数
    let { longitude, latitude } = this.$route.query;
    this.position = [+longitude, +latitude];
  },
  mounted() {
    // 根据中心点加载地图
    var map = new AMap.Map("container", {
      zoom: 11, //级别
      center: this.position, //中心点坐标
      viewMode: "3D", //使用3D视图
    });
    // 添加标记
    var marker = new AMap.Marker({
      position: this.position, //位置
    });
    map.add(marker); //添加到地图

    //实时路况图层
    var trafficLayer = new AMap.TileLayer.Traffic({
      zIndex: 10,
    });
    map.add(trafficLayer); //添加图层到地图
  },

  methods: {
    // 返回上一页
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
</style>
