<template>
  <div class="user">
    <!-- 按钮 -->
    <div class="btns">
      <el-button type="primary" size="small" @click="toAdd">添加</el-button>
    </div>
    <!-- /按钮 -->
    <!-- 内容 -->
    <el-table size="small" :data="users.list">
      <el-table-column label="序号" type="index" :index="1"></el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="姓名" prop="realname"></el-table-column>
      <el-table-column label="性别" prop="gender"></el-table-column>
      <el-table-column label="手机号" prop="telephone"></el-table-column>
      <el-table-column label="出生日期" prop="birth"></el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template v-slot:default="scope">
          <el-button type="text" size="mini" @click="editUser(scope.row)" >修改</el-button>
          <el-button type="text" size="mini" @click="delUser(scope.row)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- /内容 -->
    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      @current-change="currentChangeHandler"
      :current-page="param.page"
      :page-size="param.pageSize"
      :total="users.total">
    </el-pagination>
    <!-- /分页 -->
    <!-- 模态框 -->
    <el-dialog title="用户" :visible.sync="visible" width="60%">
      <el-form label-width="80px" size="small">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.realname"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
           <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" value-format="timestamp"> </el-date-picker>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="form.telephone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submit" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- /模态框 -->
  </div>
</template>

<script>
// 1. 导入请求函数
import {get,post } from '@/utils/request'
export default {
  data(){
    return {
      visible:false,
      param:{
        page:1,
        pageSize:10
      },
      users:{},
      form:{
        gender:"女"
      }
    }
  },
  // 2.在vue实例创建完毕之后就调用加载用户信息的接口
  created(){
    this.loadUserData();
  },
  methods:{
    // 修改用户信息
    editUser(row){
      // 将要修改的信息赋值给当前表单，进行双向数据绑定，再次基础上完成修改操作
      this.form = row;
      this.visible = true;
    },
    // 删除用户信息
    delUser(row){
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = "/baseUser/deleteById";
        get(url,{id:row.id}).then(response => {
          this.$message({type:"success",message:response.message});
          this.loadUserData();
        })
      })
    },
    // 提交表单
    submit(){
      // 1. 获取表单数据  this.form
      // 2. 交互
      let url = "/baseUser/saveOrUpdate"
      post(url,this.form).then(response => {
        // 3. 提示
        this.$message({type:"success",message:response.message});
        // 4. 关闭模态框
        this.visible = false;
        // 5. 刷新数据
        this.loadUserData();
      })
     
    },
    // 加载用户信息
    loadUserData(){
      let url ="/baseUser/pageQuery";
      get(url,this.param).then(response => {
        this.users = response.data;
      })
    },
    // 打开模态框去添加，
    toAdd(){
      this.form = {gender:"女"}
      this.visible = true;
    },
    // 翻页
    currentChangeHandler(page){
      this.param.page = page;
      this.loadUserData();
    }
  }
}
</script>