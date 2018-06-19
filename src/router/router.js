import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Store from '../store/store'
import App from '../App'
import Login from '../page/Login/Index'
import Charts from '../page/Charts/charts'

import {deviceInfo} from "../util/device"
import {setCookie,getCookie} from '../util/utils'

import {MessageChange} from "../util/utils"

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: App,
    children: [
      {path: '/Charts', name: '图表', component: Charts},
      {path: '/Login', name: '登录', component: Login},
      {path:'*', redirect: '/Login'}
    ]
  }
]
const router = new VueRouter({
  routes: routes, // short for routes: routes
  //linkActiveClass: 'active',  // router-link的选中状态的class，也有一个默认的值
  saveScrollPosition: true ,//记住页面的滚动位置 html5模式适用
  //mode: 'history',
  //ashbang: false,
  history: true
})
//登录控制
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (getCookie('btznkz')) {  // 通过vuex state获取当前的token是否存在
            next()
        }
        else {
            next({
                path: '/Login',
            })
        }
    }
    else {
        next();
    }
})
//导航显示当前路由名称
router.afterEach((to, from, next) => {
  //var ISMobile = deviceInfo()
  Store.state.activeRoute=to.name;
  //Store.state.isMobile=ISMobile;
  document.title = to.name;
  Store.commit('ROUTE_CHANGE',{activeRoute: to.name})
})
export default router
