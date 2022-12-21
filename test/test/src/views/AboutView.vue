<template>
  <div>
    查询类型[1=当天,2=未来7天,3=未来8-15天,4.降雨预测]<el-input style="width=100px" placeholder="请输入内容" v-model="input" clearable>
    </el-input>

    城市名:<el-input placeholder="请输入内容" v-model="input2" clearable>
    </el-input>
    <button type="" @click="getdata">查询</button>
    <div>
      温度是{{ wendu }}，天气是{{ tianqi }}
    </div>

  </div>
</template>

<script>
import { get } from '@/http/axios'
export default {
  data() {
    return {
      input: '',
      input2: '',
      wendu: '',
      tianqi: ''
    }
  },
  methods: {
    async getdata() {
      let params = {
        type: this.input,
        city: this.input2
      }
      let res = await get('/api/tianqi?api_key=49e46301524a71b5', params)
      this.wendu = res.data.data.temp
      this.tianqi = res.data.data.weather

    }
  },
}
</script>

<style scoped>

</style>