import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules' 

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      localStorage.setItem('portfolio-token', token)
    },
    clearToken (state) {
      state.token = ''
      localStorage.removeItem('portfolio-token')
    }
  },
  actions: {
    signIn (ctx, data) {
      return Api.signIn(data)
        .then(data => ctx.commit('setToken', data.result.token))
        .catch(e => Promise.reject(e))
    }
  },
  modules
})
