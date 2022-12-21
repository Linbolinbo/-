<!--
 * @Description:
 * @Author: ZachGmy
 * @Date: 2022-06-28 15:10:50
 * @LastEditors: ZachGmy
 * @LastEditTime: 2022-11-27 20:08:10
-->
<template>
  <div class="EpidemicDynamic">
    <!-- 疫情数量展示区域 -->
    <div class="epidemicCount">
      <!-- 当前时间 -->
      <div class="realTime">截止到：{{ new Date() | fmtDate }}</div>
      <!-- 第一部分展示区域 -->
      <div class="first">
        <!-- 新增确诊盒子 -->
        <div class="box">
          <!-- 数量展示 -->
          <div class="count">{{ desc.currentConfirmedIncr }}</div>
          <!-- 标题 -->
          <div class="title">新增确诊</div>
        </div>
        <!-- 新增治愈盒子 -->
        <div class="box">
          <!-- 数量展示 -->
          <div class="count">{{ desc.curedIncr }}</div>
          <!-- 标题 -->
          <div class="title">新增治愈</div>
        </div>
        <!-- 新增死亡盒子 -->
        <div class="box">
          <!-- 数量展示 -->
          <div class="count">{{ desc.deadIncr }}</div>
          <!-- 标题 -->
          <div class="title">新增死亡</div>
        </div>
      </div>
      <!-- 当前时间 -->
      <div class="realTime">截止到：{{ new Date() | fmtDate }}</div>
      <!-- 第二部分展示区域 -->
      <div class="second">
        <!-- 现存确诊 -->
        <div class="box">
          <!-- 数量展示 -->
          <div class="count">{{desc.currentConfirmedCount}}</div>
          <!-- 标题 -->
          <div class="title">现存确诊</div>
        </div>
        <!-- 现有无症状 -->
        <div class="box">
          <!-- 数量展示 -->
          <div class="count">{{desc.seriousCount}}</div>
          <!-- 标题 -->
          <div class="title">现有无症状</div>
        </div>
        <!-- 累积境外输入 -->
        <div class="box">
          <!-- 数量展示 -->
          <div class="count">{{desc.suspectedCount}}</div>
          <!-- 标题 -->
          <div class="title">累积境外输入</div>
        </div>
        <!-- 累积确诊 -->
        <div class="box">
          <!-- 数量展示 -->
          <div class="count">{{desc.confirmedCount}}</div>
          <!-- 标题 -->
          <div class="title">累积确诊</div>
        </div>
        <!-- 累积治愈 -->
        <div class="box">
          <!-- 数量展示 -->
          <div class="count">{{desc.curedCount}}</div>
          <!-- 标题 -->
          <div class="title">累积治愈</div>
        </div>
        <!-- 累积死亡 -->
        <div class="box">
          <!-- 数量展示 -->
          <div class="count">{{desc.deadCount}}</div>
          <!-- 标题 -->
          <div class="title">累积死亡</div>
        </div>
      </div>
    </div>
    <!-- 国内疫情展示区域 -->
    <div class="inLandCovid">
      <!-- 标题 -->
      <div class="realTime">国内病例</div>
      <!-- 表格数据 -->
      <el-table :data="inLandCovid" border style="width: 100%">
        <!-- 省份 -->
        <el-table-column prop="province" label="省份" align="center">
        </el-table-column>
        <!-- 新增确诊 -->
        <el-table-column prop="confirmed" label="新增确诊" align="center">
        </el-table-column>
        <!-- 新增疑似 -->
        <el-table-column prop="suspected" label="新增疑似" align="center">
        </el-table-column>
        <!-- 新增死亡 -->
        <el-table-column prop="dead" label="新增死亡" align="center">
        </el-table-column>
        <!-- 新增治愈 -->
        <el-table-column prop="cure" label="新增治愈" align="center">
        </el-table-column>
        <!-- 境外输入 -->
        <el-table-column prop="outside" label="境外输入" align="center">
        </el-table-column>
      </el-table>
    </div>
    <!-- 标题 -->
    <div class="realTime">国内病例</div>
    <!-- 最新进展展示区域 -->
    <div class="lastedProgress" style="margin-left: -30px">
      <el-timeline>
        <el-timeline-item
          v-for="item in newsData"
          :key="item.id"
          :timestamp="item.publishTime | fmtDate"
          placement="top"
          @click.native="toNewsDetails(item)"
        >
          <el-card>
            <h4>{{ item.title }}</h4>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <!-- 新闻模态框 -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="70%"
      center
    >
      <div v-html="newsContent" ></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false"
          >关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
// 引入封装的get请求
import { get } from "@/utils/request";
export default {
  data() {
    return {
      // 疫情相关数据
      desc: {},
      inLandCovid: [],
      newsData: [],
      centerDialogVisible: false,
      newsTitle:'',
      newsContent:''
    };
  },
  created() {
    this.getEpidemicData();
    this.getInlandCovidData();
    this.getNewsData();
  },
  methods: {
    // 获取疫情数量
    getEpidemicData() {
      axios({
        url: "http://api.tianapi.com/ncov/index?key=3e8e8e29357d55fe43dd3858800f8bc2&date=2022-12-01",
      }).then((res) => {
        this.desc = res.data.newslist[0].desc;
      });
    },
    // 获取国内病例相关数据
    async getInlandCovidData() {
      let params = {
        page: 1,
        pageSize: 10,
      };
      // 发送网络请求
      let res = await get("/epidemic/pageQuery", params);
      // console.log(res);
      this.inLandCovid = res.data.list;
    },
    async getNewsData() {
      let res = await get("/article/findAll");
      this.newsData = res.data;
    },
    toNewsDetails(item) {
      // 弹出模态框
      this.centerDialogVisible = true;
      this.newsTitle=item.title
      this.newsContent=item.content
    },
  },
};
</script>

<style scoped>
/* 设置当前时间和标题样式 */
.realTime {
  margin: 0 auto;
  color: #999999;
  font-size: 20px;
}
/* 设置第一部分区域样式 */
.epidemicCount .first {
  display: flex;
  justify-content: space-between;
}
/* 设置盒子样式 */
.box {
  width: 33%;
  height: 120px;
  background-color: #effaff;
  border-radius: 10px;
  text-align: center;
}
/* 处理盒子样式数量样式 */
.box .count {
  margin-top: 30px;
  font-size: 26px;
  font-weight: bold;
}
/* 处理盒子样式标题样式 */
.box .title {
  margin-top: 5px;
  font-size: 22px;
}
/* 设置第二部分区域样式 */
.epidemicCount .second {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
/* 设置第二部分盒子样式 */
.second .box {
  background-color: #fbf5f0;
  margin-bottom: 5px;
}
</style>
