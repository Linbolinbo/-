<!--
 * @Description:
 * @Author: ZachGmy
 * @Date: 2022-06-29 18:44:41
 * @LastEditors: ZachGmy
 * @LastEditTime: 2022-11-27 20:07:47
-->
<template>
  <div>
    <!-- 创建中国地图 -->
    <div v-loading="loading" id="china" style="height: 600px"></div>
    <!-- 创建广西地图 -->
    <div v-loading="loading" id="guangxi" style="height: 600px"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // 国内疫情数据
      chinaCovidData: [],
      // 广西疫情数据
      guangxiCovidData:[],
      // 控制加载动画
      loading: true,
    };
  },
  mounted() {
    this.getChinaData();
  },
  methods: {
    // 获取疫情数据
    getChinaData() {
      // axios({
      //   url: "https://api.muxiaoguo.cn/api/epidemic?type=epidemicInfectionData&api_key=30a14043caad3771",
      // }).then((res) => {
        // console.log(res.data.data);
        // let chinaData = res.data.data.map((item) => {
        //   return {
        //     name: item.provinceShortName,
        //     value: item.currentConfirmedCount,
        //   };
        // });
        // this.chinaCovidData = chinaData;


        // 加载中国地图
        this.loadChinaMap();

        // 过滤广西数据
        // let guangxiData = res.data.data.filter(item=>{
        //   return item.provinceName==='广西壮族自治区'
        // })
        // let guangxiRes=guangxiData[0].cities.map(item=>{
        //   return{
        //     name:item.cityName,
        //     value:item.currentConfirmedCount
        //   }
        // })
        // this.guangxiCovidData=guangxiRes
        // 加载广西地图
        this.loadCuangxiMap()
        // 结束加载动画
        this.loading = false;


      // });
    },
    // 加载中国地图
    loadChinaMap() {
      // 加载模拟数据
      var data = [{"name":"北京","value":15282},{"name":"天津","value":5291},{"name":"河北","value":4523},{"name":"山西","value":5265},{"name":"内蒙古","value":9042},{"name":"辽宁","value":5270},{"name":"吉林","value":7562},{"name":"黑龙江","value":10520},{"name":"上海","value":6534},{"name":"江苏","value":8563},{"name":"浙江","value":7229},{"name":"安徽","value":5224},{"name":"福建","value":5233},{"name":"江西","value":4623},{"name":"山东","value":9661},{"name":"河南","value":9517},{"name":"湖北","value":3659},{"name":"湖南","value":6163},{"name":"广东","value":15669},{"name":"广西","value":6915},{"name":"海南","value":3569},{"name":"重庆","value":17224},{"name":"四川","value":10594},{"name":"贵州","value":5686},{"name":"云南","value":5666},{"name":"西藏","value":5644},{"name":"陕西","value":5617},{"name":"甘肃","value":9854},{"name":"青海","value":6990},{"name":"宁夏","value":5222},{"name":"新疆","value":5560},{"name":"台湾","value":90547},{"name":"香港","value":56823},{"name":"澳门","value":15602},{"name":"南海诸岛","value":566},{"name":"南海诸岛","value":24}];

      // 初始化图表
      var map = new Highcharts.Map("china", {
        title: {
          text: "国内疫情确诊分布",
        },
        colorAxis: {
          dataClasses: [
            {
              color: "#FFE1B3",
              to: 10,
            },
            {
              color: "#FDCFA7",
              from: 10,
              to: 100,
            },
            {
              color: "#FBB998",
              from: 100,
              to: 1000,
            },
            {
              color: "#FAA68A",
              from: 1000,
              to: 5000,
            },
            {
              color: "#F8947D",
              from: 5000,
              to: 10000,
            },
            {
              color: "#F57669",
              from: 10000,
              to: 50000,
            },
            {
              color: "#F2544E",
              from: 100000,
            },
          ],
        },
        series: [
          {
            data: data,
            name: "现存确诊",
            mapData: Highcharts.maps["cn/china"],
            joinBy: "name", // 根据 name 属性进行关联
          },
        ],
      });
    },
    // 加载广西地图
    loadCuangxiMap() {
    // 加载模拟数据
    var data = [{"name":"南宁","value":27},{"name":"柳州","value":43},{"name":"桂林","value":89},{"name":"梧州","value":93},{"name":"北海","value":82},{"name":"防城港","value":32},{"name":"钦州","value":4},{"name":"贵港","value":80},{"name":"玉林","value":48},{"name":"百色","value":28},{"name":"贺州","value":62},{"name":"河池","value":61},{"name":"来宾","value":53},{"name":"崇左","value":76}];
      
      // 初始化图表
      var map = new Highcharts.Map("guangxi", {
        title: {
          text: "广西壮族自治区",
        },
        colorAxis: {
          dataClasses: [
            {
              color: "#FFE1B3",
              to: 10,
            },
            {
              color: "#FDCFA7",
              from: 10,
              to: 100,
            },
            {
              color: "#FBB998",
              from: 100,
              to: 1000,
            },
            {
              color: "#FAA68A",
              from: 1000,
              to: 5000,
            },
            {
              color: "#F8947D",
              from: 5000,
              to: 10000,
            },
            {
              color: "#F57669",
              from: 10000,
              to: 50000,
            },
            {
              color: "#F2544E",
              from: 100000,
            },
          ],
        },
        series: [
          {
            data: data,
            name: "随机数据",
            mapData: Highcharts.maps["cn/guangxi"],
            joinBy: "name", // 根据 name 属性进行关联
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
</style>
