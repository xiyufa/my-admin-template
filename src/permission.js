import Nprogress from 'nprogress'
import _ from 'lodash'

import store from '@/store'
import router, { whileList, asyncRoutes, constantRoutes } from '@/router'
import { filterUserRoutes, filterUserMenu } from '@/utils/filterRoutes'
import { getPageTitle } from '@/utils/getPageTitle'

import { getUserInfo } from '@/api/user'

Nprogress.configure({ showSpinner: false })
router.beforeEach(async (to, from, next) => {
  // start progress bar
  Nprogress.start()

  if (whileList.includes(to.name)) {
    return next()
  }
  if (!store.getters.authorization) {
    window.localStorage.setItem('skipRoute', JSON.stringify({ ...to }))
    return next({ name: 'login' })
  }
  if (!store.getters.userMenu) {
    const userInfo = await getUserInfo()
    let { roles } = userInfo
    // 默认处理为一用户可以拥有多角色
    roles = _.isArray(roles) ? roles : [roles]
    store.commit('user/setRoles', roles)
    store.commit('user/setUserInfo', userInfo)
    const userRoutes = filterUserRoutes(roles, asyncRoutes)
    router.addRoutes(userRoutes)
    const userMenu = filterUserMenu([...constantRoutes, ...userRoutes])
    store.commit('user/setUserMenu', userMenu)
    next({ ...to, replace: true })
  } else {
    next()
  }
})

router.afterEach(to => {
  // finish progress bar
  Nprogress.done()

  // set page title
  window.document.title = getPageTitle(to.meta.title)
})
