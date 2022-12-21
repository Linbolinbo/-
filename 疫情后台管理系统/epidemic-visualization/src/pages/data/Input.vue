<!--
 * @Description:
 * @Author: ZachGmy
 * @Date: 2022-06-28 15:34:24
 * @LastEditors: ZachGmy
 * @LastEditTime: 2022-11-27 20:06:34
-->
<template>
  <div class="dataInputs">
    <!-- 上报表单 -->
    <div class="content" style="width: 70%">
      <el-form
        :model="dataForm"
        ref="dataForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 省市区 -->
        <el-form-item label="省市区选择" prop="pca">
          <el-cascader
            v-model="dataForm.pca"
            :props="{ label: 'name', value: 'name' }"
            :options="pca"
          ></el-cascader>
        </el-form-item>
        <!-- 国家 -->
        <el-form-item label="国家" prop="country">
          <el-input v-model="dataForm.country"></el-input>
        </el-form-item>
        <!-- 确诊 -->
        <el-form-item label="确诊" prop="confirmed">
          <el-input v-model="dataForm.confirmed"></el-input>
        </el-form-item>

        <!-- 疑似 -->
        <el-form-item label="疑似" prop="suspected">
          <el-input v-model="dataForm.suspected"></el-input>
        </el-form-item>
        <!-- 死亡 -->
        <el-form-item label="死亡" prop="dead">
          <el-input v-model="dataForm.dead"></el-input>
        </el-form-item>
        <!-- 治愈 -->
        <el-form-item label="治愈" prop="cure">
          <el-input v-model="dataForm.cure"></el-input>
        </el-form-item>
        <!-- 重症 -->
        <el-form-item label="重症" prop="severe">
          <el-input v-model="dataForm.severe"></el-input>
        </el-form-item>
        <!-- 境外输入 -->
        <el-form-item label="境外输入" prop="outside">
          <el-input v-model="dataForm.outside"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 提交按钮 -->
    <div class="topArea" style="margin-left: 100px">
      <!-- 新增按钮 -->
      <el-button @click="submitHandler('dataForm')" type="primary"
        >提交</el-button
      >
    </div>
  </div>
</template>

<script>
import { get, post } from "@/utils/request";
import pca from "@/assets/pca.json";
export default {
  data() {
    return { 
      dataForm: {},

      pca,
    };
  },
  methods: {
    // 提交
    submitHandler(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          // 深拷贝
          let data = { ...this.dataForm };
          data.province = this.dataForm.pca[0];
          data.city = this.dataForm.pca[1];
          data.area = this.dataForm.pca[2];
          delete data.pca;
          post("/epidemic/saveOrUpdate", data).then((res) => {
            this.$message({
              type: "success",
              message: res.message,
            });
            this.godataList();
            this.dataForm = {};
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 跳转到数据列表
    godataList() {
      this.$router.push({
        path: "/data/list",
      });
    },
  },
};
</script>

<style scoped>

</style>
