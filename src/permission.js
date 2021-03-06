// 全局路由守卫
import router from '@/router'
import store from '@/store'

// 白名单：用户未登录时也可进入的路由
const whiteList = ['/login']
// 路由前置守卫
// to：要到哪里去
// from：从哪里来
// next：放行函数
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    // 1. 用户已登录，不允许进入 login
    to.path === '/login' ? next('/') : next()
  } else {
    // 2. 用户未登录，只允许进入 login
    whiteList.includes(to.path) ? next() : next('/login')
  }
})
