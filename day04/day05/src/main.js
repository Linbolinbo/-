import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.config.productionTip = false
Vue.filter("fmtDate_global", function (date) {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
