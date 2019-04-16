import Vue from 'vue';
import Router from 'vue-router';
import axios from "axios";
import store from "@/store";
import About from '../components/pages/About';
import Works from '../components/pages/Works';
import Reviews from '../components/pages/Reviews';
import Login from '../components/pages/Login';


Vue.use(Router);

const baseURL = "https://webdev-api.loftschool.com/";
const guard = axios.create({ baseURL });

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'about-me',
      component: About,
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
    },
    {
      path: "/login",
      component: Login,
      meta: {
        public: true
      }
    }
  ]
})



router.beforeEach(async (to, from, next) => {
  const isPublicRoute = to.matched.some(record => record.meta.public);
  const isUserLogged = store.getters["user/userIsLogged"];

  if (isPublicRoute === false && isUserLogged === false) {
    const token = localStorage.getItem('token');
    guard.defaults.headers['Authorization'] = `Bearer ${token}`;

    try {
      const response = await guard.get('/user');
      store.commit('user/SET_USER', response.data.user);
      next(); 
    } catch (error) {
      router.replace('/login');
      localStorage.removeItem('token');
    }

  } else {
    next();
  }
});

export default router;