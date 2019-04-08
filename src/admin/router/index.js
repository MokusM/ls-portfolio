import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import About from '../components/About'
import Works from '../components/Works'
import Reviews from '../components/Reviews'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'about-me',
      component: About
    },
    {
      path: '/works',
      name: 'works',
      component: Works
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: Reviews,
      meta: { 
        requiresAuth: true
      }
    }
  ],
  linkExactActiveClass: 'is-active',
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/admin') 
  } else {
    next() 
  }
})

export default router