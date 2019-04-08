export default {
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
    logout(state){
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    logout({commit}){
      return new Promise((resolve, reject) => {
          commit('logout')
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          resolve()
      })
    },
  },
  getters: {
    userIsLogged: state => {
      const userObj = state.user;
      const userObjectIsEmpty =
        Object.keys(userObj).length === 0 && userObj.constructor === Object;

      return userObjectIsEmpty === false;
    }
  }
};