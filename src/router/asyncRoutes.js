import Layout from '@/layout'
/* meta : {
	roles: ['none','login']     none是不需要权限的页面
	title: 'title'               标题
	icon: 'icon-name'            导航栏需设置
	activeMenu: 'name'           显示导航栏的页面设置，父级的name
}*/
export const navBarRoutes = [
  {
    path: '/home',
    component: Layout,
    redirect: '/home/info',
    name: 'home',
    meta: { title: '首页', icon: 'home', roles: ['none'] },
    children: [
      {
        path: 'info',
        component: () => import('@/views/Workbench/Home'),
        name: 'home-info',
        meta: { title: '首页', activeMenu: 'home', roles: ['none'] }
      }
    ]
  },
  {
    path: '/orders',
    component: Layout,
    redirect: '/orders/info',
    name: 'orders',
    meta: { title: '订单', icon: 'mobile-phone', roles: ['login'] },
    children: [
      {
        path: 'info',
        component: () => import('@/views/Workbench/Orders'),
        name: 'orders-info',
        meta: { title: '订单', activeMenu: 'orders', roles: ['login'] }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/info',
    name: 'user',
    meta: { title: '我的', icon: 'user', roles: ['login'] },
    children: [
      {
        path: 'info',
        component: () => import('@/views/Workbench/User'),
        name: 'user-info',
        meta: { title: '我的', activeMenu: 'user', roles: ['login'] }
      }
    ]
  }
]
const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    hidden: true,
    redirect: '/home/info',
    meta: {
      roles: ['none']
    }
  },
  ...navBarRoutes,
  { path: '*', redirect: '/404', hidden: true }
]
export default asyncRoutes
