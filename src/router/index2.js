import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/page/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/user',
      name: '主数据管理',
      redirect: '/user/plantMgr',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        {
          path: 'plantMgr',
          name: '工厂主数据',
          component: resolve => require(['../pages/plant/plantMgr.vue'], resolve)
        },
        {
          path: 'workshopMgr',
          name: '厂房主数据',
          component: resolve => require(['../pages/workshop/workshopMgr.vue'], resolve)
        },
        {
          path: 'equipmentMgr',
          name: '设备主数据',
          component: resolve => require(['../pages/equipment/equipmentMgr.vue'], resolve)
        },
        {
          path: 'gather',
          name: '可靠性数据采集',
          component: resolve => require(['../pages/gather/gatherList.vue'], resolve)
        },
        {
          path: 'gatherSpecialist',
          name: '可靠性数据采集',
          component: resolve => require(['../components/page/gatherListSpecialist.vue'], resolve)
        }
      ]
    }
  ]
})

export const asyncRouterMap = [
  {
    path: '/user/',
    name: '主数据管理',
    redirect: '/user/plantMgr',
    component: resolve => require(['../components/common/Home.vue'], resolve),
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'user'] // you can set roles in root nav
    },
    children: [
      {
        path: 'plantMgr',
        name: '工厂主数据',
        meta: {
          title: '工厂主数据',
          roles: ['admin', 'user'] // or you can only set roles in sub nav
        },
        component: resolve => require(['../pages/plant/plantMgr.vue'], resolve)
      },
      {
        path: 'workshopMgr',
        name: '厂房主数据',
        meta: {
          title: '工厂主数据',
          roles: ['admin', 'user'] // or you can only set roles in sub nav
        },
        component: resolve => require(['../pages/workshop/workshopMgr.vue'], resolve)
      },
      {
        path: 'equipmentMgr',
        name: '设备主数据',
        meta: {
          title: '工厂主数据',
          roles: ['admin', 'user'] // or you can only set roles in sub nav
        },
        component: resolve => require(['../pages/equipment/equipmentMgr.vue'], resolve)
      },
      {
        path: 'gather',
        name: '可靠性数据采集',
        component: resolve => require(['../pages/gather/gatherList.vue'], resolve)
      },
      {
        path: 'gatherSpecialist',
        name: '可靠性数据采集',
        component: resolve => require(['../components/page/gatherListSpecialist.vue'], resolve)
      }
    ]
  },

  {
    path: '/gather',
    name: '可靠性数据采集管理',
    redirect: '/user/gather',
    component: resolve => require(['../components/common/Home.vue'], resolve),
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'user'] // you can set roles in root nav
    },
    children: [{
      path: 'gather',
      name: '可靠性数据采集',
      component: resolve => require(['../pages/gather/gatherList.vue'], resolve),
      meta: {
        title: 'permission',
        icon: 'lock',
        roles: ['admin', 'user'] // you can set roles in root nav
      },
    },
      {
        path: 'gatherSpecialist',
        name: '可靠性数据采集',
        component: resolve => require(['../components/page/gatherListSpecialist.vue'], resolve),
        meta: {
          title: 'permission',
          icon: 'lock',
          roles: ['admin', 'specialist'] // you can set roles in root nav
        },
      }]
  },

]
