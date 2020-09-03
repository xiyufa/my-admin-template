import axios from 'axios'
import Cookie from 'js-cookie'
import { MessageBox } from 'element-ui'

import store from '@/store'
import router from '@/router'

const { VUE_APP_BASE_URL } = process.env
const isDev = process.env.NODE_ENV === 'development'

// 请求拦截器
const requestInterceptors = config => {
  config.headers['authorization'] = store.getters.authorization
  return config
}

// 响应拦截器
const responseInterceptors = response => {
  const { data } = response
  const { status, result, message } = data

  if (status === 2000) {
    return result
  }

  if (status === 4003) {
    // 未登录或登录信息过期
    MessageBox.confirm('<p>您的登录信息已过期，需要重新登录</p><p style="font-size: 12px; color: red">请注意保存您的数据再进行确认操作！</p>', '提示', {
      confirmButtonText: '去登陆',
      dangerouslyUseHTMLString: true,
      type: 'warning'
    })
      .then(() => {
        const { currentRoute } = router
        const { name, params, query } = currentRoute
        window.localStorage.setItem('skipRoute', JSON.stringify({ name, params, query }))
        Cookie.remove('authorization')
        window.location.reload()
      })
      .catch(() => { })
    return Promise.reject(result)
  }

  if (status === 4001) {
    // 没有权限
    router.push({
      name: '401',
      params: {
        errorType: 1,
        errorMsg: `request url : ${response.config.url}`
      }
    })
    return
  }

  // 其他错误
  return Promise.reject(new Error(message || '发生预期之外的错误，请稍后再试。'))
}

const service = axios.create({
  baseURL: VUE_APP_BASE_URL,
  timeout: isDev ? 0 : 500
})


service.interceptors.request.use(requestInterceptors, Promise.reject)
service.interceptors.response.use(responseInterceptors, Promise.reject)

export default service
