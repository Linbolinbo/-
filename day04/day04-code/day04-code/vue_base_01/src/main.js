// 引入Vue
import Vue from 'vue'
// App.vue是页面的主入口文件
import App from './App.vue'
// 路由
import router from './router'

// 生产环境下的提示信息
Vue.config.productionTip = false

// 创建一个Vue的实例对象
new Vue({
  // ES6简写形式
  router,
  // render渲染函数
  render: h => h(App)
}).$mount('#app')
