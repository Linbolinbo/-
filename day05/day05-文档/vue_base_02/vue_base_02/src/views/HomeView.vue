<!--
 * @Description: 
 * @Author: ZachGmy
 * @Date: 2022-12-09 09:07:30
 * @LastEditors: ZachGmy
 * @LastEditTime: 2022-12-09 14:31:21
-->
<template>
  <div>
    <!-- 在首页中去创建路由的导航 -->
    <!-- 足球导航 在使用时 要记得补全路径  一级路由的路径+二级路由的路径-->
    <!-- <router-link to="/footballNews">足球新闻</router-link> | -->
    <!-- 篮球导航 -->
    <!-- <router-link to="/basketballNews">篮球新闻</router-link> -->

    <!-- 编程式导航 -->
    <button @click="toFootballPage">足球新闻</button>
    <button @click="toBasketBallPage">篮球新闻</button>
    <!-- 路由渲染标签 -->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        homeId:'ndownd912d0j-2j-1jdndn210jd921j',
        message:'我是来自首页的参数'
      }
    },
    methods:{
      // 跳转到足球页面
      toFootballPage(){
        // $router
        // 跳转页面
        // push会在history留下历史记录 replace不会再history留下历史记录
        this.$router.push({
          // 要跳转的路径
          path:'/footballNews',
          // path-query传递参数的方式
          query: {
            homeID: this.homeId,
            message: this.message
          }
        })
      },
      // 跳转到篮球页面
      toBasketBallPage(){
        // 跳转页面
        this.$router.push({
          // 要跳转的路径
          // path:'/basketballNews'
          // 通过命名路由来进行页面的跳转
          name:'basketballNews',
          // name-params传参
          params:{
            homeID: this.homeId,
            message: this.message
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>