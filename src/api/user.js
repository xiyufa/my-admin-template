/**
 * 用户登录
 */
export const userLogin = () => {
  const result = {
    authorization: 'authorization test data'
  }
  return new Promise(resolve => setTimeout(() => resolve(result), 400))
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  const result = {
    name: '淡然！',
    roles: ['admin']
  }

  return new Promise(resolve => setTimeout(() => {
    return resolve(result)
  }, 400))
}

/**
 * 退出登录
 */
export const userLogout = () => {
  return new Promise(resolve => setTimeout(() => resolve(), 400))
}

