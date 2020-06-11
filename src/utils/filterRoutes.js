/**
 * 根据roles判断该路由是否具有权限
 * @param {*} roles 权限
 * @param {*} route 路由
 */
const hasPermission = (roles, route) => {
  if (!route.meta || !route.meta.roles) {
    return true
  }
  return roles.some(role => route.meta.roles.includes(role))
}

/**
 * 筛选出可以访问的路由
 * @param {*} roles 权限
 * @param {*} routes 需要判断权限的路由
 */
export const filterUserRoutes = (roles, routes) => {
  const userRoutes = []

  routes.forEach(route => {
    if (!hasPermission(roles, route)) {
      return
    }
    let temp = { ...route }

    if (temp.children) {
      temp.children = filterUserRoutes(roles, temp.children)
    }
    userRoutes.push(temp)
  })
  return userRoutes
}

/**
 * 根据可访问路由过滤出侧边栏
 * @param {*} routes 可访问路由
 */
export const filterUserMenu = routes => {
  const userMenu = []

  routes.forEach(route => {
    let temp = { ...route }

    if (temp.hidden) {
      return
    }
    if (temp.children ) {
      temp.children = filterUserMenu(temp.children)
      if (temp.children.length === 1 && !temp.alwaysShow) {
        temp = temp.children[0]
      }
    }

    userMenu.push(temp)
  })

  return userMenu
}
