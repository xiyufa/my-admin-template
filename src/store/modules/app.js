import Cookies from 'js-cookie'
import { getLanguage } from '@/lang'

const state = {
  isCollapse: false,
  isFullScreen: false,
  showTagViews: true,
  // 判断是不是IE11及以下
  isIE: window.navigator.userAgent.indexOf('Trident') > -1,
  language: getLanguage()
}

const mutations = {
  // 折叠切换
  toggleCollapse(state, isCollapse) {
    state.isCollapse = isCollapse
  },
  // 全屏切换
  toggleFullScreen(state, isFullScreen) {
    state.isFullScreen = isFullScreen
  },
  // 切换显示TagViews
  toggleTagViews(state, showTagViews) {
    state.showTagViews = showTagViews
  },
  // 切换语言
  toggleLang(state, language) {
    state.language = language
    Cookies.set('language', language, { expires: 365 })
  }
}

export default {
  state,
  mutations,
  namespaced: true
}
