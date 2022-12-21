import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/element-variables.scss'  //elementui自定义颜色
import '@/styles/index.scss' // global css 全局样式
import '@/styles/smart.css'   // 当前项目中用户自定义颜色

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import { VueJsonp } from 'vue-jsonp'    // 引用不加{}，会报错

Vue.use(VueJsonp)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// 声明一些配置  size:'small' 设置整个项目中elementui组件的尺寸
Vue.use(ElementUI)

Vue.config.productionTip = false

// 注册一个过滤器
import moment from 'moment'
Vue.filter("fmtDate",function(date){
  return date?moment(date).format('YYYY-MM-DD HH:mm'):'';
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
