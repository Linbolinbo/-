import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入moment
import moment from 'moment'

import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.filter('过滤器的名称', function (要处理的参数) {
  // 拿到对应的参数 进行过滤
})
// 全局注册
Vue.filter("fmtDate_global", function (date) {
  return moment(date).format("YYYY-MM-DD D-M-Y");
  // 或者return自己编写的时间处理函数
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
