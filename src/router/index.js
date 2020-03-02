import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout'

import Test from './modules/test'

Vue.use(VueRouter)

/**
 * //当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * hidden: true // (默认 false)
 * 
 * //当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * redirect: 'noRedirect'
 * 
 * //当设置为true时，一直显示根路由，默认当路由下面只有一个子路由时默认将子路由展示来代替根路由
 * alwaysShow: true
 * 
 * //设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * name: 'router-name'
 * 
 * meta: {
 *    roles: ['admin', '...'] // 该路由运行访问的身份，父路由的权限一定要包含所有子路由的权限。
 *    title: 'title' // 设置该路由在侧边栏和面包屑中展示的名字
 *    icon: 'svg-name' // 设置该路由的图标，只在一级路由生效
 *    fullScreen: false // 默认false，如果设置为true，则该路由会将内容全屏展示（不显示侧边栏及头部） 
 *    cache: false // 默认false，如果设置为true，则会被<keep-active>缓存
 *    breadcrumb: false // 如果设置为false，则不会在breadcrumb面包屑中显示
 *    affix: true // 默认true，
 *    highlightName: 'dashboard' // 匹配当前路由时，可指定侧边栏高亮的菜单项
 * }
 * 
 */

// 白名单
export const whileList = ['401', '404', 'login']
 
// 公有的路由
export const constantRoutes = [
  {
    path: '/401',
    name: '401',
    hidden: true,
    component: () => import('@/views/ErrorPage/401')
  },
  {
    path: '/404',
    name: '404',
    hidden: true,
    component: () => import('@/views/ErrorPage/404')
  },
  {
    path: '/redirect',
    name: 'redirect',
    hidden: true,
    component: Layout,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    hidden: true
  },
  {
    path: '/',
    name: 'index',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard'),
        meta: {
          title: 'dashboard',
          icon: 'el-icon-menu',
          affix: true
        }
      }
    ]
  }
]

// 需要判断权限的路由
export const asyncRoutes = [
  // * 需要放在最后
  Test,
  { path: '*', redirect: '/404', hidden: true }
]


const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export default router
