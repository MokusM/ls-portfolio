import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		admin: {
			name: 'Николай Моисеев'
		},
		loaded: false
	},
	mutations:{
		setLoaded (state, flag) {
      state.loaded = flag
    },
	},
	modules
})
