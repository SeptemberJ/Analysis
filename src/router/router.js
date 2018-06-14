import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Store from '../store/store'
import App from '../App'
import Login from '../page/Login/Index'
import Sign from '../page/Sign/Index'
import Index from '../page/Index/Index'
import Modify from '../page/Modify/Index'
import Operator from '../page/Operator/Index'
import Developer from '../page/Developer/Index'

import {deviceInfo} from "../util/device"
import {setCookie,getCookie} from '../util/utils'

import {MessageChange} from "../util/utils"

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: App,
    children: [
      {path: '/Index', name: '主页', component: Index},
      {path: '/Modify', name: '修改密码', component: Modify},
      {path: '/Login', name: '登录', component: Login},
      {path: '/Sign', name: '注册', component: Sign},
      {path: '/Developer', name: '开发者平台', component: Developer,meta: {requireAuth: true}},
      {path: '/Operator', name: '运营者平台', component: Operator,meta: {requireAuth: true}},
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
            // localStorage.clear();
            // Store.state.userInfo.username = ''
            // Store.state.userInfo.member_id = ''
            // Store.state.ifLogined = false
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
  var ISMobile = deviceInfo()
  Store.state.activeRoute=to.name;
  Store.state.isMobile=ISMobile;
  document.title = to.name;
  Store.commit('ROUTE_CHANGE',{activeRoute: to.name})
  //获取消息通知
  // MessageChange()
})
export default router
