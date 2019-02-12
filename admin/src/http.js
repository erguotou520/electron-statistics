import axios from 'axios'
import Vue from 'vue'
import { message } from 'ant-design-vue'
import store from './store'

const instance = axios.create({
  baseURL: 'http://192.168.31.105:3333/api/v1'
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
  return { data: res.data }
}, function (error) {
  if (error.message && error.message.toLowerCase() === 'network error') {
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
