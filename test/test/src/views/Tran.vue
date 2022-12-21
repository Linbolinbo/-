<template>
    <div>
    <div class="tran">
      <!-- 输入框 -->
      <el-input style="width:30%" placeholder="请输入内容" v-model="inputStr"  clearable> </el-input>
      <!-- 查询按钮 -->
      <el-button @click="getTran" type="primary">查询</el-button>
      <!-- 结果展示 -->
      <div>{{result}}</div>
    </div>
    </div>
</template>

<script>
    import {get} from '@/http/axios'
    export default {
        data() {
            return {
                inputStr:'',
                result:''
            }
        },
        methods: {
            async getTran(){
                let params={
                    text:this.inputStr
                }
                let res=await get('/api/Tn_tencent?api_key=c332947da4d5a597',params)
                this.result=res.data.data.Translation
                this.$message({
                     message: res.data.data.Translation,
                        type: 'success'
      });
            }
        },
    }
</script>

<style scoped>

</style>