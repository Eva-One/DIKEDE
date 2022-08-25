import router from '@/router'
import store from '@/store'

const whiteList = ['/login', '/404']

router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    if (!store.getters.userImg) {
      store.dispatch('user/getInfo', store.getters.userId)
    }
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (!whiteList.includes(to.path)) {
      next('/login')
    } else {
      next()
    }
  }
})
