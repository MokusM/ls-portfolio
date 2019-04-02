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
      path: '/about-me',
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
      component: Reviews
    }
  ],
  linkExactActiveClass: 'is-active',
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (!store.state.token && to.path !== '/admin') {
    next('/admin')
  } else {
    next()
  }
})

export default router