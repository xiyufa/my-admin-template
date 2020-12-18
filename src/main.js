import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './store'
import ElementUI from 'element-ui'
import i18n from './lang'

import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/base-font/iconfont.css'
import 'nprogress/nprogress.css'
import '@/styles/index.less'

import './permission'
import '@/utils/request'

import * as containerLayout  from './components/ContainerLayout'
import * as filters from './filters'

Vue.use(ElementUI, {
  size: store.getters.size,
  i18n: (key, value) => i18n.t(key, value)
})

// 注册全局组件
Object.keys(containerLayout).forEach(key => Vue.component(key, containerLayout[key]))

// 注册全局过滤器
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
