import Cookies from 'js-cookie'
import { getLanguage } from '@/lang'
import defaultSettings from '@/setting'

const { isCollapse, size } = defaultSettings

const state = {
  isCollapse: isCollapse || false,
  isFullScreen: false,
  isIE: window.navigator.userAgent.indexOf('Trident') > -1, // 判断是不是IE11及以下
  language: getLanguage(),
  size: Cookies.get('size') || size
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
  // 切换语言
  toggleLang(state, language) {
    state.language = language
    Cookies.set('language', language, { expires: 365 })
  },
  // 尺寸切换
  toggleSize(state, size) {
    state.size = size
    Cookies.set('size', size, { expires: 365 })
  }
}

export default {
  state,
  mutations,
  namespaced: true
}
