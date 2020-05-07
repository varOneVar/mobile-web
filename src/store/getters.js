export default {
  isOnline: state => state.app.isOnline,
  wholePageLoading: state => state.app.wholePageLoading,
  contentLoading: state => state.app.contentLoading,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  authRoutes: state => state.user.authRoutes,
  username: state => state.user.username,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles
}
