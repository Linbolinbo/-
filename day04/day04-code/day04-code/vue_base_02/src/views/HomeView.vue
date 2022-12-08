<!--
 * @Description: 
 * @Author: ZachGmy
 * @Date: 2022-12-08 15:16:29
 * @LastEditors: ZachGmy
 * @LastEditTime: 2022-12-08 15:59:03
-->
<template>
  <div>
    <!-- .stop 阻止事件冒泡 -->
    <!-- <div class="father" @click="fatherClick">我是父元素
      <div class="son" @click.stop="sonClick">我是子元素</div>
    </div> -->

    <!-- 阻止事件的默认行为 .prevent-->
    <!-- <form action="test.php">
      <input type="submit" value="提交"
      @click.prevent="submitHandler">
    </form> -->

    <!-- 只允许按钮被点击一次 .once-->
    <!-- <button @click.once="fatherClick">登录</button> -->

    <!-- 监听键盘事件 -->
    <input type="text" @keyup.enter="inputHandler">
  </div>
</template>

<script>
  export default {
    methods: {
      // 键盘输入事件
      inputHandler(event){
        console.log(event.target.value);
      },
      // 父元素点击事件
      fatherClick(){
        console.log('fatherClick');
      },
      // 子元素点击事件
      sonClick(){
        console.log('sonClick');
      },
      // 表单提交事件
      submitHandler(){
        console.log('submit');
      }
    },
  }
</script>

<style scoped>

</style>