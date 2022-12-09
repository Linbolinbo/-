<!--
 * @Description: 
 * @Author: ZachGmy
 * @Date: 2022-12-09 09:07:30
 * @LastEditors: ZachGmy
 * @LastEditTime: 2022-12-09 10:20:26
-->
<template>
  <div>
    <!-- 直接使用插值语法在页面中进行显示 -->
    <!-- <div>{{ msg.split("").reverse().join("") }}</div>
    <div>{{ msg.split("").reverse().join("") }}</div>
    <div>{{ msg.split("").reverse().join("") }}</div>
    <div>{{ msg.split("").reverse().join("") }}</div> -->
    <!-- 调用methods中的返回值 -->
    <!-- <div>{{changeStr()}}</div>
    <div>{{changeStr()}}</div>
    <div>{{changeStr()}}</div>
    <div>{{changeStr()}}</div> -->
    <!-- 使用计算属性 -->
    <!-- <div>{{changeStrCom}}</div>
    <div>{{changeStrCom}}</div>
    <div>{{changeStrCom}}</div>
    <div>{{changeStrCom}}</div> -->
    <!-- 1670134834185 -->
    <div>{{new Date()}}</div>
    <!-- YYYY-MM-DD -->
    <div>{{new Date() | fmtDate_global}}</div>
    <!-- 时间戳 -->
    <div>{{1670134834185 | fmtDate_global}}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg:'hello vue'
      }
    },
    methods: {
      changeStr(){
        console.log('我是methods中的方法');
        return this.msg.split("").reverse().join("")
      }
    },
    // 计算属性 对一些复杂的数据进行处理 复杂的格式化进行处理
    // 计算属性在浏览器中是有缓存的
    // 无论调用多少次计算属性中的 方法 都只会执行一次 剩余的执行数据从缓存中进行获取
    computed:{
      changeStrCom(){
        // 1000行代码进行操作
        console.log('我是计算属性中的方法');
        return this.msg.split("").reverse().join("")
      }
    },
    // 局部过滤器
    filters:{
      
    }
  }
</script>

<style scoped>

</style>
