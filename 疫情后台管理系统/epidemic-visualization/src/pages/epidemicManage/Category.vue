<!--
 * @Description:
 * @Author: ZachGmy
 * @Date: 2020-09-03 09:57:40
 * @LastEditors: ZachGmy
 * @LastEditTime: 2022-06-15 09:49:13
-->
<template>
  <div class="thingManage">
    <!-- 顶部按钮 -->
    <div class="topArea">
      <el-button @click="addHandler" size="small" type="primary">添加</el-button>
    </div>
    <!-- 中间区域 -->
    <div class="content">
      <el-table :data="thingData" style="width: 100%">
        <!-- 序号 -->
        <el-table-column type="index" label="序号" align="center">
        </el-table-column>
        <!-- 分类名称 -->
        <el-table-column prop="name" label="分类名称" align="center">
        </el-table-column>
        <!-- 分类简介 -->
        <el-table-column prop="description" label="分类简介" align="center">
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="editHandler(scope.row)" type="text" size="small"
              >修改</el-button
            >
            <el-button
              @click="deleteHandler(scope.row)"
              type="text"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  
    <!-- 模态框 -->
    <el-dialog
      v-if="dialogVisible"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="70%"
    >
      <!-- 表单开始 -->
      <el-form
      v-if="dialogVisible"
        :model="thingForm"
        
        ref="thingForm"
        label-width="100px"
        class="demo-ruleForm"
      >
      <!-- 名称 -->
        <el-form-item label="名称" prop="name">
          <el-input v-model="thingForm.name"></el-input>
        </el-form-item>
        <!-- 介绍 -->
        <el-form-item label="介绍" prop="description">
          <el-input v-model="thingForm.description"></el-input>
        </el-form-item>
       <!-- 序号 -->
       <el-form-item label="序号" prop="no">
          <el-input v-model="thingForm.no"></el-input>
        </el-form-item>
      </el-form>
      <!-- 表单结束 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitHandler('thingForm')"
          >提交</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {get,post} from '@/utils/request'
  export default {
    data() {
      return {
        thingData:[],
        dialogVisible:false,
        dialogTitle:'',
        thingForm:{},
      }
    },
    created() {
    this.getthingData();
  },
    methods: {
      // 获取资讯数据
     async getthingData(){
      let res = await get("/category/findAll");
      this.thingData=res.data
      },
      // 新增资讯
      addHandler(){
      this.thingForm={}
        this.dialogVisible=true
        this.dialogTitle='新增资讯分类'
      },
      // 提交资讯分类
      submitHandler(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            // 深拷贝
            let data={...this.thingForm}
            post('/category/saveOrUpdate',data).then(res=>{
              this.$message({
              type: "success",
              message: res.message,
            });
            this.getthingData()
            this.thingForm={}
            this.dialogVisible = false;
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
      // 修改资讯
      editHandler(row){
        this.thingForm={...row}
      this.dialogVisible=true
      this.dialogTitle = "修改资讯分类";
      },
      // 删除资讯
      deleteHandler(row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          get('/category/deleteById',{id:row.id}).then(res=>{
            this.$message({
            type: "success",
            message: res.message,
          });
          
          this.getthingData()
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
    },
  }
</script>

<style scoped>

</style>
