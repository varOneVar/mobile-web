export default {
  beforeRouteEnter(to, from, next) {
    const path = to.params.path || '/'
    next(instance => instance.$router.replace(path))
  },
  render: h => h()
}
