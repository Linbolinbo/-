import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入HomeView页面/组件
import HomeView from '../views/HomeView.vue'

// 告诉Vue 要使用VueRouter
Vue.use(VueRouter)

const routes = [
  // 路由的重定向
  {
    // 要改变指向的url
    path:'/about',
    // 当用户加载根目录的时候 不想加载首页 而是加载关于页面或其他页面
    redirect:'/'
  },
  // 页面路径与页面的一一映射关系
  {
    // 自定义的路径
    path: '/',
    // 命名路由
    name: 'home',
    // 你要显示的页面组件
    component: HomeView,
    // 创建二级路由  子路由
    children:[
      // 足球新闻页面的路由配置
      {
        // Vue在路由的配置文件中 会自动将路径进行补全
        path:'footballNews',
        name:'footballNews',
        component: () => import('../views/footballNews.vue')
      },
      // 篮球新闻页面
      {
        // Vue在路由的配置文件中 会自动将路径进行补全
        path: 'basketballNews',
        name: 'basketballNews',
        component: () => import('../views/basketballNews.vue')
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    // 路由的懒加载模式
    component: () => import('../views/AboutView.vue')
  },
  // 创建用户界面的路由
  {
    // 路由的路径
    path:'/user',
    // 路由的名称
    name: 'user',
    // 要加载的组件
    component: () => import('../views/User.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 做一个导出 
export default router
