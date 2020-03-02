import axios from 'axios'
import Cookie from 'js-cookie'
import { MessageBox } from 'element-ui'

import store from '@/store'
import router from '@/router'
import i18n from '@/lang'

const { VUE_APP_BASE_URL } = process.env
const isDev = process.env.NODE_ENV === 'development'

// 请求拦截器
const requestInterceptors = config => {
  config.headers['authorization'] = store.getter.authorization
  return config
}

// 响应拦截器
const responseInterceptors = response => {
  const result = response.data
  const { status } = result

  if (status === 2000) {
    return result.data
  }

  if (status === 4003) {
    // 未登录或登录信息过期
    MessageBox.confirm(`<p>${i18n.t('message.tokenErr')}</p>
    <p style="font-size: 12px; color: red">${i18n.t('message.tokenErrAlertTip')}</p>`, i18n.t('message.prompt'), {
      confirmButtonText: i18n.t('message.toLogin'),
      dangerouslyUseHTMLString: true,
      type: 'warning'
    })
      .then(() => {
        const { currentRoute } = router
        const { name, params, query } = currentRoute
        window.localStorage.setItem('skipRoute', JSON.stringify({ name, params, query }))
        Cookie.remove('Authorization')
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
  return Promise.reject(result)
}

const service = axios.create({
  baseURL: VUE_APP_BASE_URL,
  timeout: isDev ? 0 : 500
})


service.interceptors.request.use(requestInterceptors, Promise.reject)
service.interceptors.response.use(responseInterceptors, Promise.reject)

export default service
