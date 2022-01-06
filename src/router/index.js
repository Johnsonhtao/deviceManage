import Vue from 'vue'
import VueRouter from 'vue-router'
import fa from "element-ui/src/locale/lang/fa";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '设备管理',
    redirect:"/deviceManage",

    component: () => import('../views/Index'),
    children:[
      {
        show: true,
        path: '/deviceManage',
        name: '查询设备',
        component: () => import( '../views/deviceManage')
      },
      {
        show: true,
        path: '/deviceAdd',
        name: '添加设备',
        component: () => import('../views/deviceAdd')
      },
      {
        show: false,
        path: '/deviceUpdate',
        name: '修改设备',
        component: () => import( '../views/deviceUpdate')
      },

    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
