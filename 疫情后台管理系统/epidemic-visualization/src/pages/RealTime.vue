<!--
 * @Description:
 * @Author: ZachGmy
 * @Date: 2022-06-26 16:42:20
 * @LastEditors: ZachGmy
 * @LastEditTime: 2022-11-27 20:08:54
-->
<template>
  <div>
    <div id="realTime_container" style="height: calc(100vh / 2)"></div>
    <div id="container" style="height: calc(100vh / 2)"></div>
  </div>
  
  
</template>

<script>
export default {
  mounted() {
    this.loadCharts1();
    this.loadCharts2()
  },
  methods: {
    // 加载折现图
    loadCharts1() {
      var chart = Highcharts.chart("container", {
        // 类型
        chart: {
          type: "line",
        },
        // 标题
        title: {
          text: "城市疫情对比图",
        },
        subtitle: {
          text: "数据来源: 广西科技大学",
        },
        xAxis: {
          categories: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
        },
        yAxis: {
          title: {
            text: "数量 (个)",
          },
        },
        plotOptions: {
          line: {
            dataLabels: {
              // 开启数据标签
              enabled: true,
            },
            // 关闭鼠标跟踪，对应的提示框、点击事件会失效
            // enableMouseTracking: false,
          },
        },
        // 鼠标移入事件
        tooltip: {
          headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
          pointFormat:
            '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
          shared: true,
        },
        series: [
          {
            name: "广东",
            data: [
              7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9,
              9.6,
            ],
          },
          {
            name: "广西",
            data: [
              3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8,
            ],
          },
        ],
      });
    },
    loadCharts2() {
      Highcharts.setOptions({
        global: {
          useUTC: false,
        },
      });
      function activeLastPointToolip(chart) {
        var points = chart.series[0].points;
        chart.tooltip.refresh(points[points.length - 1]);
      }
      var chart = Highcharts.chart("realTime_container", {
        chart: {
          type: "spline",
          marginRight: 10,
          events: {
            load: function () {
              var series = this.series[0],
                chart = this;
              activeLastPointToolip(chart);
              setInterval(function () {
                var x = new Date().getTime(), // 当前时间
                  y = Math.random(); // 随机值
                series.addPoint([x, y], true, true);
                activeLastPointToolip(chart);
              }, 1000);
            },
          },
        },
        title: {
          text: "动态模拟实时数据",
        },
        xAxis: {
          type: "datetime",
          tickPixelInterval: 150,
        },
        yAxis: {
          title: {
            text: null,
          },
        },
        tooltip: {
          formatter: function () {
            return (
              "<b>" +
              this.series.name +
              "</b><br/>" +
              Highcharts.dateFormat("%Y-%m-%d %H:%M:%S", this.x) +
              "<br/>" +
              Highcharts.numberFormat(this.y, 2)
            );
          },
        },
        legend: {
          enabled: false,
        },
        series: [
          {
            name: "随机数据",
            data: (function () {
              // 生成随机值
              var data = [],
                time = new Date().getTime(),
                i;
              for (i = -19; i <= 0; i += 1) {
                data.push({
                  x: time + i * 1000,
                  y: Math.random(),
                });
              }
              return data;
            })(),
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
</style>
