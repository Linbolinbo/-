import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    ,
    children:[
      {
        path:'foot',
        name:'foot',
        component:()=>import('../views/footnew.vue')
      },
      {
        path:'basket',
        name:'basket',
        component:()=>import('../views/baketball.vue')
      }
    ]
  },
  {
    path:'/user',
    name:'user',
    component:()=>import('../views/User.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router