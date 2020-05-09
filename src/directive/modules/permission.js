import store from '@/store'
import { isHasPermission } from '@/utils/env'

export default {
  inserted(el, binding) {
    const { value } = binding
    const roles = store.getters && store.getters.roles
    if (value && value.length) {
      const hasPermission = isHasPermission(value, roles)
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('need roles! Like v-permission="["admin","editor"]')
    }
  }
}
