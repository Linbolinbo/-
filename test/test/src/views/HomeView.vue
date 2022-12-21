<template>
  <div>
    <div class="hisTod">
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in history"
          :key="index"
          :timestamp="item.year + '-' + item.month + '-' + item.day"
          placement="top"
        >
          <el-card>
            <h4>{{ item.title }}</h4>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import { get } from "@/http/axios";
export default {
  data() {
    return {
      history: [],
    };
  },
  created() {
    this.getHis();
  },
  methods: {
    async getHis() {
      let res = await get("/api/lishijr?api_key=0b0c3893a95d6987");
      // console.log(res);
      this.history = res.data.data;
    },
  },
};
</script>

<style scoped>
</style>
