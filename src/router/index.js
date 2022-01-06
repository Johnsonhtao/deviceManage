import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '设备管理',
    redirect:"/deviceManage",
    show:true,
    component: () => import('../views/Index'),
    children:[
      {
        path: '/deviceManage',
        name: '查询设备',
        component: () => import( '../views/deviceManage')
      },
      {
        path: '/deviceAdd',
        name: '添加设备',
        component: () => import('../views/deviceAdd')
      },

    ]
  },
  {
    path: '/deviceUpdate',
    name: '修改设备',
    show:false,
    component: () => import( '../views/deviceUpdate')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
