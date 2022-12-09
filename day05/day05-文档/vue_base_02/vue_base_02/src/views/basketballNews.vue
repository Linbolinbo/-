<template>
  <div class="basketball">
    我是篮球新闻页面
    <!-- 接收name-params传递过来的参数 -->
    <div>{{$route.params}}</div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
.basketball{
  background-color: blanchedalmond;
  width: 100%;
  /* 视窗高度 */
  height: 100vh;
}
</style>