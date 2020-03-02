const getters = {
  // app
  isCollapse: state => state.app.isCollapse,
  isFullScreen: state => state.app.isFullScreen,
  showTagViews: state => state.app.showTagViews,
  isIE: state => state.app.isIE,
  language: state => state.app.language,
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
