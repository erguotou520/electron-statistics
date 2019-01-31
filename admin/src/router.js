import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Overview from './views/main/Overview.vue'

Vue.use(Router)

export const menus = [
  {
    path: '/',
    name: 'overview',
    component: Overview,
    meta: {
      name: '概览'
    }
  },
  {
    path: '/users',
    children: [
      {
        path: '/new',
        name: 'new-users',
        component: () => import('./views/users/New.vue'),
        meta: {
          name: '新增用户'
        }
      },
      {
        path: '/active',
        name: 'active-users',
        component: () => import('./views/users/Active.vue'),
        meta: {
          name: '活跃用户'
        }
      },
      {
        path: '/new-retain',
        name: 'new-retains',
        component: () => import('./views/users/NewRetain.vue'),
        meta: {
          name: '新增留存'
        }
      },
      {
        path: '/active-retain',
        name: 'active-retains',
        component: () => import('./views/users/ActiveRetain.vue'),
        meta: {
          name: '活跃留存'
        }
      },
      {
        path: '/duration',
        name: 'durations',
        component: () => import('./views/users/Duration.vue'),
        meta: {
          name: '使用时长'
        }
      }
    ]
  },
  {
    path: '/devices',
    children: [
      {
        path: '/launch',
        name: 'launch-count',
        component: () => import('./views/devices/Launch.vue'),
        meta: {
          name: '启动次数'
        }
      }
    ]
  },
  {
    path: '/distribution',
    children: [
      {
        path: '/ip',
        name: 'ip-distribution',
        component: () => import('./views/distribution/Ip.vue'),
        meta: {
          name: '地域分布'
        }
      },
      {
        path: '/gender',
        name: 'gender-distribution',
        component: () => import('./views/distribution/Gender.vue'),
        meta: {
          name: '性别分布'
        }
      },
      {
        path: '/age',
        name: 'age-distribution',
        component: () => import('./views/distribution/Age.vue'),
        meta: {
          name: '年龄分布'
        }
      }
    ]
  }
]

const router = new Router({
  routes: [
    ...menus,
    {
      path: '/auth',
      component: () => import('./views/auth/Base.vue'),
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('./views/auth/Login.vue'),
          meta: {
            skipAuth: true
          }
        }
      ]
    },
    {
      path: '/error',
      children: [
        {
          path: '/404',
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
