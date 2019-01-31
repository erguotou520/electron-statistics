import axios from 'axios'
import Vue from 'vue'

const instance = axios.create({
  baseURL: 'http://localhost:3333/api/v1'
})

export default instance
Vue.prototype.$http = instance
