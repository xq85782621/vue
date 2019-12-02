import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)



export var routes = [

  {
    path: '/',
    name: 'home',
    component: () => import('../components/layout/Home.vue'),
    redirect: '/center',
    children: [
      {
        path: 'center',
        name: 'center',
        component: () => import('../components/layout/Center.vue'),
      },
      {
        path: 'deviceLog',
        name: 'deviceLog',
        component: () => import('../components/device/DeviceLog.vue'),
      },
      {
        path: 'deviceInfo',
        name: 'deviceInfo',
        component: () => import('../components/device/DeviceInfo.vue'),
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('../components/system/User.vue'),
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('../components/system/Role.vue'),
      },
      {
        path: 'department',
        name: 'department',
        component: () => import('../components/system/Department.vue'),
      },
    ]
  },
  /**
   * 登录
   */
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/common/Login.vue'),
  },

  /**
   * 404
   */
  {
    path: '/404',
    name: '404',
    component: () => import('../components/common/404.vue'),
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
