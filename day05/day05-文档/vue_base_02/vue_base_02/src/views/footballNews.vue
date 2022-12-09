<template>
  <div class="football">
    我是足球新闻页面
    <!-- 直接在页面结构中接收参数 -->
    <!-- $router用于页面的跳转 -->
    <!-- $route用于参数的接收 -->
    <div>{{$route.query}}</div>
    <div>homeID:{{$route.query.homeID}}</div>
  </div>
</template>

<script>
  export default {
    created() {
      this.test()
    },
    methods: {
      test(){
        console.log(this.$route.query);
      }
    },
  }
</script>

<style scoped>
/* 给根节点设置一些样式 */
.football{
  background-color: aquamarine;
  width: 100%;
  /* 视窗高度 */
  height: 100vh;
}
</style>