const getters = {
  // app
  isCollapse: state => state.app.isCollapse,
  isFullScreen: state => state.app.isFullScreen,
  isIE: state => state.app.isIE,
  language: state => state.app.language,
  size: state => state.app.size,
  // setting
  showCollapse: state => state.setting.showCollapse,
  showTagViews: state => state.setting.showTagViews,
  showlanguage: state => state.setting.showlanguage,
  showSize: state => state.setting.showSize,
  showSidebarLogo: state => state.setting.showSidebarLogo,
  // user
  authorization: state => state.user.authorization,
  roles: state => state.user.roles,
  userMenu: state => state.user.userMenu,
  userInfo: state => state.user.userInfo,
  // tagsView
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews

}

export default getters
