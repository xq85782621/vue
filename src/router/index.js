import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)



export var routes = [

  {
    path: '/',
    name: 'home',
    component: resolve => require(['../components/layout/Home.vue'], resolve),
    redirect: '/center',
    children: [
      {
        path: 'center',
        name: 'center',
        component: resolve => require(['../components/layout/Center.vue'], resolve),
      },
      {
        path: 'deviceLog',
        name: 'deviceLog',
        component: resolve => require(['../components/device/DeviceLog.vue'], resolve),
      },
      {
        path: 'deviceInfo',
        name: 'deviceInfo',
        component: resolve => require(['../components/device/DeviceInfo.vue'], resolve),
      },
      {
        path: 'tree',
        name: 'tree',
        component: resolve => require(['../components/demo/DemoTree.vue'], resolve),
      },
    ]
  },
  /**
   * 登录
   */
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['../components/common/Login.vue'], resolve),
  },

  /**
   * 404
   */
  {
    path: '/404',
    name: '404',
    component: resolve => require(['../components/common/404.vue'], resolve),
  },
  {
    path: "*", // 此处需特别注意置于最底部
    redirect: "/404"
  }


]


export const router = new Router({
  routes,
  mode: "history",
});


export default router;
