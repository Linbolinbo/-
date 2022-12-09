<!--
 * @Description: 
 * @Author: ZachGmy
 * @Date: 2022-12-09 09:07:30
 * @LastEditors: ZachGmy
 * @LastEditTime: 2022-12-09 09:42:45
-->
<template>
  <div>
    <!-- 获取输入框中输入的值 -->
    <!-- v-model -->
    <!-- <input type="text" v-model="inputText"> -->
    <!--  -->

    <!-- 多行文本框 -->
    <!-- <textarea cols="30" rows="10" v-model="inputText"></textarea> -->

    <!-- .lazy 当输入框失去焦点时 或者 用户按下enter键时 再一次性的获取到用户输入的数据 -->
    <!-- <input type="text" v-model.lazy="inputText">
    <div>你输入的值是:{{inputText}}</div> -->

    <!-- .number -->
    <!-- <input type="text" v-model.number="inputText">
    <div>你输入的值是:{{typeof inputText}}</div> -->

    <!-- .trim 去除字符串首尾的空格 -->
    <input type="text" v-model.trim="inputText">
    <div>你输入的值是:aaaaaaa{{inputText}}aaaaaa</div>

    <div id="container"></div>
  </div>
</template>

<script>
// 引入局部使用的第三方插件
import moment from 'moment'
  export default {
    data() {
      return {
        inputText:100
      }
    },
    // 生命周期钩子函数
    created() {
      // 让test方法自动执行
      this.test()
    },
    mounted() {
      console.log('mounted');
    },
    // 方法
    methods: {
      test(){
        console.log('页面加载时 需要自动执行的方法');
      }
    },
  }
</script>

<style scoped>

</style>