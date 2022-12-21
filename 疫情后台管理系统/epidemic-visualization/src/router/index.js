import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 疫情可视化大屏
  {
    path: '/',
    component: Layout,
    redirect: '/layout/index'
  },
  // 疫情动态
  {
    path: '/layout',
    component: Layout,
    children: [
      {
        path:"index",
        component: () => import('@/pages/EpidemicDynamic'),
        meta: { title: '疫情动态', icon: 'dynamic' }
      }
    ]
  },
  // 实时疫情
  {
    path: '/realTime',
    component: Layout,
    children: [
      {
        path:"index",
        component: () => import('@/pages/RealTime'),
        meta: { title: '实时疫情', icon: 'realTime' }
      }
    ]
  },
  // 地图统计
  {
    path: '/chart',
    component: Layout,
    children: [
      {
        path:"index",
        component: () => import('@/pages/DataStatistics'),
        meta: { title: '数据统计', icon: 'analysis' }
      }
    ]
  },
  // 医院
  {
    path: '/hospital',
    component: Layout,
    meta: { title: '定点医院', icon: 'hospital' },
    children: [
      { //医院列表
        path:"index",
        component: () => import('@/pages/Hospital'),
        meta: { title: '定点医院', icon: 'hospital' }
      },
      { // 医院地图
        path:"map",
        component: () => import('@/pages/HospitalMap'),
        hidden:true,
      }
    ]
  },
  // 疫情管理
  {
    path: '/epidemic',
    component: Layout,
    meta: { title: '疫情管理', icon: 'tree' },
    children: [
      {
        path:"hospital",
        component: () => import('@/pages/epidemicManage/HospitalManage'),
        meta: { title: '定点医院管理'}
      },
      {
        path:"category",
        component: () => import('@/pages/epidemicManage/Category'),
        meta: { title: '资讯分类'}
      },{
        path:"news",
        component: () => import('@/pages/epidemicManage/News'),
        meta: { title: '新闻资讯'}
      },
    ]
  },
  // 疫情数据
  {
    path: '/data',
    component: Layout,
    meta: { title: '疫情数据', icon: 'form' },
    children: [
      {
        path:"list",
        component: () => import('@/pages/data/List'),
        meta: { title: '数据列表'}
      },
      {
        path:"input",
        component: () => import('@/pages/data/Input'),
        meta: { title: '数据上报'}
      }
    ]
  },
  // 用户管理
  {
    path: '/base',
    component: Layout,
    meta: { title: '基础配置', icon: 'user' },
    children: [
      {
        path: "user",
        component: () => import('@/pages/base/User'),
        meta: { title: '用户管理' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
