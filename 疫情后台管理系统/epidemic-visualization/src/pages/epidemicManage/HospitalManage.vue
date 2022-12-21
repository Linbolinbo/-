<!--
 * @Description:
 * @Author: ZachGmy
 * @Date: 2022-06-28 15:28:04
 * @LastEditors: ZachGmy
 * @LastEditTime: 2022-11-27 20:07:19
-->
<template>
  <div class="hosManage">
    <!-- 顶部按钮 -->
    <div class="topArea">
      <!-- 新增按钮 -->
      <el-button @click="addHandler" size="small" type="primary"
        >新增</el-button
      >
    </div>
    <!-- 中间表格 -->
    <div class="content">
      <el-table :data="hosData" style="width: 100%">
        <!--序号  -->
        <el-table-column type="index" label="序号" align="center">
        </el-table-column>
        <!-- 医院名称 -->
        <el-table-column prop="name" label="医院名称" align="center">
        </el-table-column>
        <!-- 医院简介 -->
        <el-table-column prop="introduce" label="医院简介" align="center">
        </el-table-column>
        <!-- 医院地址 -->
        <el-table-column label="医院简介" align="center">
          <!-- 作用域插槽赋值 -->
          <template slot-scope="scope">
            {{
              scope.row.province +
              scope.row.city +
              scope.row.area +
              scope.row.address
            }}
          </template>
        </el-table-column>
        <!-- 标记 -->
        <el-table-column
          :show-overflow-tooltip="true"
          prop="flags"
          label="标记"
          align="center"
        >
        </el-table-column>
        <!-- 经度 -->
        <el-table-column prop="longitude" label="经度" align="center">
        </el-table-column>
        <!-- 纬度 -->
        <el-table-column prop="latitude" label="纬度" align="center">
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
    <el-dialog
      v-if="dialogVisible"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="70%"
    >
      <!-- 表单区域start -->
      <el-form
        :model="hosForm"
        :rules="hosRules"
        ref="hosForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 名称 -->
        <el-form-item label="名称" prop="name">
          <el-input v-model="hosForm.name"></el-input>
        </el-form-item>
        <!-- 介绍 -->
        <el-form-item label="介绍" prop="introduce">
          <el-input type="textarea" v-model="hosForm.introduce"></el-input>
        </el-form-item>
        <!-- 省市 -->
        <el-form-item label="省市区选择" prop="pca">
          <el-cascader
            v-model="hosForm.pca"
            :props="{ label: 'name', value: 'name' }"
            :options="pca"
          ></el-cascader>
        </el-form-item>
        <!-- 详细地址 -->
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="hosForm.address"></el-input>
        </el-form-item>
        <!-- 标记 -->
        <el-form-item label="标记" prop="flags">
          <el-input v-model="hosForm.flags"></el-input>
        </el-form-item>
        <!-- 经度 -->
        <el-form-item label="经度" prop="longitude">
          <el-input v-model="hosForm.longitude"></el-input>
        </el-form-item>
        <!-- 纬度 -->
        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="hosForm.latitude"></el-input>
        </el-form-item>
      </el-form>
      <!-- 表单区域end -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitHandler('hosForm')"
          >提交</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { get, post } from "@/utils/request";
import pca from "@/assets/pca.json";
export default {
  data() {
    return {
      hosData: [],
      // 当前页数
      page: 1,
      // 每页多少数据
      pageSize: 2,
      // 数据总数
      total: 5,
      // 模态框的显示
      dialogVisible: false,
      // 声明表单对象
      hosForm: {},
      // 接收省市区数据
      pca,
      // 声明表单验证规则
      hosRules: {
        // 名称
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        // 详细地址
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
        // 标记
        flags: [{ required: true, message: "请输入标记", trigger: "blur" }],
        // 经度
        longitude: [{ required: true, message: "请输入经度", trigger: "blur" }],
        // 纬度
        latitude: [{ required: true, message: "请输入纬度", trigger: "blur" }],
      },
      // 模态框标题
      dialogTitle: "",
    };
  },
  created() {
    this.getHosData();
  },
  methods: {
    // 获取医院信息
    async getHosData() {
      let params = {
        page: this.page,
        pageSize: this.pageSize,
      };
      let res = await get("/hospital/pageQuery", params);
      this.hosData = res.data.list;
      this.total = res.data.total;
    },
    // 控制每页显示多少条数据
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getHosData();
    },
    // 控制当前是第几页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      // 重新加载方法
      this.getHosData();
    },
    // 新增医院信息
    addHandler() {
      // 清空表单
      this.hosForm = {};
      // 显示模态框
      this.dialogVisible = true;
      // 标题
      this.dialogTitle = "新增医院信息";
    },
    // 修改医院信息
    editHandler(row) {
      // 将已有的信息赋值表单中
      // 扩展运算符
      console.log(row);
      this.hosForm = { ...row };
      // 将省市区数据渲染进来
      this.hosForm.pca = [row.province, row.city, row.area];
      // 显示模态框
      this.dialogVisible = true;
      // 标题
      this.dialogTitle = "修改医院信息";
    },
    // 保存或更新定点医院数据
    submitHandler(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 设置参数
          let data = { ...this.hosForm };
          // 设置省市区参数
          data.province = this.hosForm.pca[0];
          data.city = this.hosForm.pca[1];
          data.area = this.hosForm.pca[2];
          // 去除pca参数
          delete data.pca;
          // console.log(data);
          // alert('submit!');
          // 发送请求
          post("/hospital/saveOrUpdate ", data).then((res) => {
            // 添加成功提示
            this.$message({
              type: "success",
              message: res.message,
            });
            // 刷新页面
            this.getHosData();
            // 清空表单
            this.hosForm = {};
            // 关闭模态框
            this.dialogVisible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除医院信息
    deleteHandler(row) {
      // 提示用户
      this.$confirm("此操作将永久删除医院信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发送请求
          get('/hospital/deleteById',{id:row.id}).then(res=>{
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
          this.getHosData()
          })
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
</style>
