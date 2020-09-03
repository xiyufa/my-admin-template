import defaultSettings from '@/setting'

const { showTagViews, showCollapse, showlanguage, showSize, showSidebarLogo } = defaultSettings

const state = {
  showTagViews,
  showCollapse,
  showlanguage,
  showSize,
  showSidebarLogo
}

const mutations = {
  // 切换显示TagViews
  toggleShowTagViews(state, showTagViews) {
    state.showTagViews = showTagViews
  },
  // 切换显示Collapse
  toggleShowCollapse(state, showCollapse) {
    state.showCollapse = showCollapse
  },
  // 切换显示Language
  toggleShowLanguage(state, showLanguage) {
    state.showLanguage = showLanguage
  },
  // 切换显示Size
  toggleShowSize(state, showSize) {
    state.showSize = showSize
  },
  // 切换显示侧边栏logo
  toggleShowSidebarLogo(state, showSidebarLogo) {
    state.showSidebarLogo = showSidebarLogo
  }
}

export default {
  state,
  mutations,
  namespaced: true
}
