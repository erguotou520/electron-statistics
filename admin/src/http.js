import axios from 'axios'
import Vue from 'vue'
import { stringify } from 'qs'
import { message } from 'ant-design-vue'
import store from './store'
import router from './router'

const instance = axios.create({
  baseURL: '/api/v1',
  paramsSerializer: params => {
    return stringify(params, {
      arrayFormat: 'indices'
    })
  }
})

instance.interceptors.request.use(async config => {
  if (store.getters.token) {
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})

instance.interceptors.response.use(async function (res) {
  return { data: res.data, status: res.status }
}, function (error) {
  if (error.response.status === 401) {
    store.dispatch('logout')
    router.replace({ name: 'login' })
    message.error('请重新登录')
  } else if (error.message && error.message.toLowerCase() === 'network error') {
    message.error('网络连接异常')
  } else if (error.code && error.code.toLowerCase && error.code.toLowerCase() === 'econnaborted') {
    message.error('网络连接超时')
  } else {
    try {
      const data = error.response.data
      if (data.message) {
        message.error(data.message)
      }
      return Promise.resolve({ error: data })
    } catch (error) {}
  }
  return Promise.resolve({ error })
})

export default instance
Vue.prototype.$http = instance
