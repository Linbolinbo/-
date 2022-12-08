<!--
 * @Description: 
 * @Author: ZachGmy
 * @Date: 2022-12-08 15:16:29
 * @LastEditors: ZachGmy
 * @LastEditTime: 2022-12-08 16:43:24
-->
<template>
  <div>
    <!-- v-for指令 循环遍历data中的数组遍历 在页面中动态进行渲染 -->
    <ul>
      <li v-for="(item, index) in movies" :key="index">
        {{index + 1}}--{{item}}
      </li>

      <div v-for="item in stuArr" :key="item.id">
        {{item.name}}--{{item.age}}
      </div>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        movies:['信条','八佰','盗梦空间','星际穿越','阿凡达2'],
        // 对象数组
        stuArr:[
          {
            id: 1,
            name:'zhangsan',
            age: 20
          },
          {
            id: 2,
            name:'lisi',
            age: 20
          },
          {
            id: 3,
            name:'wangwu',
            age: 20
          },
        ]
      }
    },
  }
</script>

<style scoped>

</style>