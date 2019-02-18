import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Base from './views/main/Base.vue'
import Overview from './views/main/Overview.vue'

Vue.use(Router)

const Only = {
  render: h => h('transition', {
    props: {
      name: 'router',
      mode: 'out-in'
    }
  }, [h('router-view')])
}

export const menus = [
  {
    path: '/',
    name: 'overview',
    component: Overview,
    meta: {
      name: '概览',
      icon: 'dashboard'
    }
  },
  {
    path: 'users',
    component: Only,
    meta: {
      name: '用户管理',
      icon: 'user'
    },
    children: [
      {
        path: 'new',
        name: 'new-users',
        component: () => import('./views/users/New.vue'),
        meta: {
          name: '新增用户'
        }
      },
      {
        path: 'active',
        name: 'active-users',
        component: () => import('./views/users/Active.vue'),
        meta: {
          name: '活跃用户'
        }
      },
      {
        path: 'new-retain',
        name: 'new-retains',
        component: () => import('./views/users/NewRetain.vue'),
        meta: {
          name: '新增留存'
        }
      },
      {
        path: 'active-retain',
        name: 'active-retains',
        component: () => import('./views/users/ActiveRetain.vue'),
        meta: {
          name: '活跃留存'
        }
      },
      {
        path: 'duration',
        name: 'durations',
        component: () => import('./views/users/Duration.vue'),
        meta: {
          name: '使用时长'
        }
      }
    ]
  },
  {
    path: 'devices',
    component: Only,
    meta: {
      name: '设备管理',
      icon: 'windows'
    },
    children: [
      {
        path: 'launch',
        name: 'launch-count',
        component: () => import('./views/devices/Launch.vue'),
        meta: {
          name: '启动次数'
        }
      },
      {
        path: 'os',
        name: 'os-percent',
        component: () => import('./views/devices/Os.vue'),
        meta: {
          name: '操作系统'
        }
      }
    ]
  },
  {
    path: 'distribution',
    component: Only,
    meta: {
      name: '分布管理',
      icon: 'pie-chart'
    },
    children: [
      {
        path: 'geo',
        name: 'geo-distribution',
        component: () => import('./views/distribution/Geo.vue'),
        meta: {
          name: '地域分布'
        }
      },
      {
        path: 'gender',
        name: 'gender-distribution',
        component: () => import('./views/distribution/Gender.vue'),
        meta: {
          name: '性别分布'
        }
      },
      {
        path: 'age',
        name: 'age-distribution',
        component: () => import('./views/distribution/Age.vue'),
        meta: {
          name: '年龄分布'
        }
      }
    ]
  },
  {
    path: 'event',
    component: Only,
    meta: {
      name: '事件分析',
      icon: 'code'
    },
    children: [
      {
        path: 'custom',
        name: 'custom-event',
        component: () => import('./views/event/Custom.vue'),
        meta: {
          name: '自定义事件'
        }
      }
    ]
  }
]

const router = new Router({
  routes: [
    {
      path: 'auth',
      component: () => import('./views/auth/Base.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('./views/auth/Login.vue'),
          meta: {
            skipAuth: true
          }
        }
      ]
    },
    {
      path: '/',
      component: Base,
      children: menus
    },
    {
      path: '/error',
      children: [
        {
          path: '404',
          component: () => import('./views/error/404.vue'),
          meta: {
            skipAuth: true
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.skipAuth) {
    next()
  } else if (store.getters.isLoggedIn) {
    next()
  } else {
    next({ name: 'login' })
  }
})

export default router
