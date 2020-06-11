import Cookies from 'js-cookie'

const state = {
  authorization: Cookies.get('authorization'),
  userInfo: {},
  roles: [],
  userMenu: null
}

const mutations = {
  // 设置authorization
  setAuthorization(state, authorization) {
    state.authorization = authorization
  },
  // 设置用户信息
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  // 设置用户权限
  setRoles(state, roles) {
    state.roles = roles
  },
  // 设置用户所能访问的侧边栏菜单
  setUserMenu(state, userMenu) {
    state.userMenu = userMenu
  }
}

export default {
  state,
  mutations,
  namespaced: true
}
