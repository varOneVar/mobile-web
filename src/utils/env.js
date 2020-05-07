// 前往统一登录页面
export const goLoginPortal = () => {
  window.location.href = '/#/login'
}

/**
 * 是否需要登录
 * @param {arr} routerRoles 页面访问所需权限角色
 */
export const isNeedLogin = (routerRoles) => {
  if (!routerRoles || (routerRoles && !routerRoles.length)) return false
  return !routerRoles.includes('none')
}

/**
 * 是否有权限进入
 * @param {arr} userRoles 用户的角色
 * @param {arr} routerRoles 页面访问所需权限角色
 */
export const isHasPermission = (routerRoles, userRoles) => {
  if (isNeedLogin(routerRoles)) return false
  const whiteList = ['admin', 'superAdmin']
  return whiteList.concat(routerRoles).some(role => userRoles.includes(role))
}
