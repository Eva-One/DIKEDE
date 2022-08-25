import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

// token失效还未处理

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use((config) => {
  if (store.getters.token) {
    config.headers.Authorization = `${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
}
)

// response interceptor
service.interceptors.response.use(
  function(response) {
    const { status, data, statusText } = response
    if (status === 200) {
      return data
    }
    Message.error(statusText)
    return Promise.reject(new Error(statusText))
  }, function(error) {
    Message.error(error.message)
    return Promise.reject(error)
  }
)

export default service
