import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
)

// response interceptor
service.interceptors.response.use(
  function(response) {
    const { success, msg } = response.data
    if (success) {
      return response.data
    }
    Message.error(msg)
    return Promise.reject(new Error(msg))
  }, function(error) {
    Message.error(error.message)
    return Promise.reject(error)
  })

export default service
