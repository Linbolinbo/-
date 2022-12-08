<!--
 * @Description: 
 * @Author: ZachGmy
 * @Date: 2022-12-08 15:16:29
 * @LastEditors: ZachGmy
 * @LastEditTime: 2022-12-08 16:23:42
-->
<template>
  <div>
    <!-- 简单的做一个成绩判断 v-if v-else-if v-else-->
    <div v-if="score >= 90">
      <button>90</button>
    </div>
    <div v-else-if="score >= 80">良好</div>
    <div v-else-if="score >= 60">及格</div>
    <div v-else>不及格</div>
    <!-- 成绩输入框 -->
    <input type="text" @keyup.enter="scoreInputHandler">
    <br>
    <!-- v-if和v-show的一个对比 -->
    <div v-if="isShow">我是v-if显示的</div>
    <div v-show="isShow">我是v-show显示的</div>
    <button @click="toggleHandler">切换显示与隐藏</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 定义一个分数
        score: 0,
        // 是否显示
        isShow: false
      }
    },
    methods: {
      toggleHandler(){
        this.isShow = !this.isShow
      },
      scoreInputHandler(event){
        console.log(event.target.value);
        // 将用户输入的成绩赋值给data中的变量
        this.score = event.target.value
      }
    },
  }
</script>

<style scoped>

</style>
