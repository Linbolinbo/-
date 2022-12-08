<template>
  <div>
    <!-- 实现一个简单的计数器 -->
    <!-- v-on 监听事件 -->
    <button v-on:click="add">+</button>
    <div>{{count}}</div>
    <!-- v-on指令的语法糖 @ -->
    <!-- 监听事件中也可以使用一些简单的表达式 -->
    <button @click="count--" :disabled="count<=0">-</button>
    <br>
    <!-- 有关事件传参的问题 -->
    <!-- 情况一 没有参数传递的情况 方法名后面的小括号是可以省略的 -->
    <!-- 情况二 有一个或多个参数传递 -->
    <button @click="click2Handler('zhangsan','lisi')">按钮二</button>
    <!-- 情况三  -->
    <button @click="click3Handler">按钮三</button>
    <!-- 情况四 既需要自己传递过去的实参 也需要event事件对象 -->
    <button @click="click4Handler('zhangsan', $event)">按钮四</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        count:0
      }
    },
    // 实现我们在结构中定义的方法
    methods: {
      // +1方法
      add(){
        // console.log('按钮被点击了');
        // 如何获取到data中的变量
        this.count ++
      },
      // 情况二
      click2Handler(a, b){
        console.log(a, b);
      },
      // 情况三
      // 方法本身中有一个参数，那么会默认将原生事件event参数传递进去
      click3Handler(a){
        console.log(a);
      },
      // 情况四
      click4Handler(a, b){
        console.log(a, b);
      }
    },
  }
</script>

<style scoped>

</style>