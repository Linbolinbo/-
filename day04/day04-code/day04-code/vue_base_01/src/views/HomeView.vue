<template>
  <!-- 编写页面结构 -->
  <!-- 注意点 当前template模板下 只允许有一个div根节点 -->
  <div class="root">
    <!-- 使用插值语法进行显示 {{}} -->
    <div>{{message}}</div>
    <!-- 同一个标签内 也可以使用多个插值语法 -->
    <div>{{message}}{{count}}</div>
    <!-- 在插值语法中 也可以使用一些简单的表达式 -->
    <div>{{count*100}}</div>
    <!-- 加载html标签字符串 v-html-->
    <div v-html="aHref"></div>

    <!-- 使用动态绑定来给属性进行变量的绑定 v-bind-->
    <img v-bind:src="imgUrl" alt="">
    <br>
    <!-- 语法糖形式 : -->
    <a :href="aStr">百度</a>
  </div>
</template>

<script>
// 处理的是网络请求相关和业务逻辑相关的处理
  export default {
    // vue给我们提供了很多个选项
    // data是一个数据或变量存放的容器
    // 编程方式 声明式编程
    data() {
      return {
        // 在data中声明一个变量
        message:'Hello Vue',
        count: 100,
        aHref:'<a href="https://www.baidu.com">百度一下</a>',
        // 图片的url路径
        imgUrl:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F076c839571bbf704605a73b4782991a9eab6fcee137bb-x7ZwYw_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624691909&t=d66fa397e46962394ea49c5d00f4dc38',
        // a标签的url路径
        aStr:'https://www.baidu.com'
      }
    },
    // 所有的方法全部写在methods里
    methods: {

    },
    computed:{

    }
  }
</script>


<style scoped>
/* 设置页面样式 */
</style>


// 编程范式 命令式编程
// 原生JS的DOM操作
// 1.创建节点
// 2.获取节点
// 3.获取数据
// 4.将输入插入到对应的节点中
// 5.将节点插入到对应的页面结构中