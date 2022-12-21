<template>
  <div class="login-container">
    <div class="header">
      <div class="wrapper">
        <div class="title">
          <span style="margin-left: 10px; display: inline-block">
            疫情数据分析可视化平台
          </span>
        </div>
      </div>
    </div>
    <!-- 中间 -->
    <div class="center">
      <!-- 表单 -->
      <div class="form">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
          label-position="left"
          size="small"
        >
          <div
            style="
              font-size: 18px;
              text-align: center;
              height: 48px;
              line-height: 48px;
              font-weight: bold;
            "
          >
            欢迎来到疫情数据分析可视化平台
          </div>
          <div
            style="
              width: 80%;
              margin: 0 auto;
              height: 1px;
              border-bottom: 1px solid #ccc;
              margin-bottom: 1em;
            "
          ></div>
          <el-form-item prop="username">
            <span class="svg-container"> <svg-icon icon-class="user" /> </span>
            <el-input
              v-model="loginForm.username"
              placeholder="Username"
              type="text"
              ref="username"
            />
          </el-form-item>
          <el-tooltip
            v-model="capsTooltip"
            content="Caps lock is On"
            placement="right"
            manual
          >
            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="Password"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                />
              </span>
            </el-form-item>
          </el-tooltip>
          <div>
            <el-button
              :loading="loading"
              style="width: 100%"
              @click.native.prevent="handleLogin"
              >登录</el-button
            >
          </div>
        </el-form>
        <!-- 表单 -->
      </div>
    </div>
  </div>
</template>

<script>
import { post } from "@/utils/request";
import { mapGetters } from "vuex";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      callback();
    };
    const validatePassword = (rule, value, callback) => {
      callback();
    };
    return {
      visible: false,
      form: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        realname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  methods: {
    // 重置表单校验
    clearValidate() {
      this.$refs["registerForm"].clearValidate();
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery,
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
};
</script>

<style lang="scss" scoped>
/* reset element-ui css */
.login-container {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  background-color: #f4f4f4;
  overflow: hidden;
  .wrapper {
    width: 90%;
    margin: 0 auto;
  }
  .header {
    background-color: #008964;
    position: relative;
    color: #ffffff;
    .title {
      font-size: 20px;
      line-height: 60px;
      font-weight: bold;
    }
  }
  .center {
    box-sizing: border-box;
    position: relative;
    background-color: #ffffff;
    top: 60px;
    width: 500px;
    margin: 0 auto;
    border-radius: 5px;
    padding: 2em;
    box-shadow: 0 0 10px #ccc;
  }
}
</style>
