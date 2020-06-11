import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import i18n from './lang'

import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/base-font/iconfont.css'
import '@/styles/common.less'

import './permission'
import '@/utils/request'

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
