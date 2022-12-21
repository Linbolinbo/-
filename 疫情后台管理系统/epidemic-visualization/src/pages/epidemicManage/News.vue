<!--
 * @Description:
 * @Author: ZachGmy
 * @Date: 2022-06-28 15:09:37
 * @LastEditors: ZachGmy
 * @LastEditTime: 2022-11-27 20:07:31
-->
<template>
  <div class="news">
    <!-- 顶部按钮 -->
    <div class="topArea">
      <el-button type="primary" size="small" @click="addHandler"
        >添加</el-button
      >
    </div>
    <!-- 中间展示区 -->
    <div class="content">
      <el-table :data="newsData" style="width: 100%">
        <!-- 序号 -->
        <el-table-column type="index" label="序号" align="center">
        </el-table-column>
        <!-- 新闻标题 -->
        <el-table-column prop="title" label="新闻标题" width="600px">
        </el-table-column>
        <!-- 新闻分类 -->
        <el-table-column prop="category.name" label="新闻分类" align="center">
        </el-table-column>
        <!-- 发布时间 -->
        <el-table-column label="发布时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.publishTime | fmtDate }}
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="editHandler(scope.row)" type="text" size="small"
              >修改</el-button
            >
            <el-button @click="deleteHandler(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 底部分页 -->
    <div class="page" style="text-align: right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next, total"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 模态框 -->
    <el-dialog v-if="dialogVisible" :title="dialogTitle" :visible.sync="dialogVisible" width="70%">
      <!-- 表单开始 -->
      <el-form ref="form" :model="newsForm" label-width="80px">
        <!-- 新闻标题 -->
        <el-form-item label="新闻标题">
          <el-input v-model="newsForm.title"></el-input>
        </el-form-item>
        <!-- 新闻分类 -->
        <el-form-item label="新闻分类">
          <el-select v-model="newsForm.categoryId" placeholder="请选择活动区域">
            <el-option
              v-for="item in categoryData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 副文本编辑区域 资讯详情-->
        <el-form-item label="资讯详情">
          <Tinymce v-model="newsForm.content" :height="240"></Tinymce>
        </el-form-item>
      </el-form>
      <!-- 表单结束 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitHandler"
          >提交</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { get ,post } from "@/utils/request";
// 1.引入副文本编辑器组件
import Tinymce from "@/components/Tinymce";
export default {
  // 2.声明使用组件
  components: {
    Tinymce,
  },
  data() {
    return {
      newsData: [],
      dialogTitle: "",
      dialogVisible: false,
      newsForm: {},
      categoryData: [],
      // 当前页数
      page: 1,
      // 每页多少数据
      pageSize: 2,
      // 数据总数
      total: 5,
    };
  },
  created() {
    this.getNewsData();
    this.getCategoryData();
  },
  methods: {
    async getNewsData() {
      let params = {
        page: this.page,
        pageSize: this.pageSize,
      };
      let res = await get("/article/pageQuery", params);
      this.newsData = res.data.list;
      this.total = res.data.total;

    },
    // 控制每页显示多少条数据
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getNewsData();
    },
    // 控制当前是第几页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      // 重新加载方法
      this.getNewsData();
    },
    // 获取所有分类数据
    async getCategoryData() {
      let res = await get("/category/findAll");
      this.categoryData = res.data;
    },
    // 新增新闻数据
    addHandler() {
      this.newsForm={}
      this.dialogVisible = true;
      this.dialogTitle = "发布新闻资讯";
    },
    // 修改新闻数据
    editHandler(row) {
      this.newsForm={...row}
      this.dialogVisible = true;
      this.dialogTitle = "修改新闻资讯";
    },
    // 表当提交
    submitHandler(){
      let data={...this.newsForm}
      post('/article/saveOrUpdate',data).then(res=>{
        this.$message({
          type:'success',
          message:res.message
        })
        this.newsForm={}
        this.getNewsData()
        this.dialogVisible=false
      })
    },
    // 删除新闻
    deleteHandler(row){
      this.$confirm("此操作将永久删除医院信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发送请求
          get('/article/deleteById',{id:row.id}).then(res=>{
            // 提示删除成功
            this.$message({
            type: "success",
            message: res.message,
          });
          // 对最后一个数据的处理
          let totalPage=Math.ceil((this.total-1)/this.pageSize)
          let currentPage=this.page>totalPage?totalPage:this.page
          // 没有数据还是保留最后的页面
          this.page=currentPage<1 ? 1:currentPage
          // 刷新数据
          this.getNewsData()
          })
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    }
  },
};
</script>

<style scoped>
</style>
