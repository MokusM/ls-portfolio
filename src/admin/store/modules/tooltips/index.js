
export default {
  namespaced: true,
  state: {
    tooltip: {
      show: false,
      text: '',
      type: ''
    }
  },  
  mutations: {
    SHOW_TOOLTIP: (state, { text, type }) => {
      state.tooltip.show = true
      state.tooltip.text = text
      state.tooltip.type = type
    },
    HIDE_TOOLTIP: (state) => {
      state.tooltip.show = false
      state.tooltip.text = ''
      state.tooltip.type = ''
    },
  },
  actions: {
    showTooltip ({ commit }, tooltip) {
      commit("SHOW_TOOLTIP", tooltip);
    },   
    hideTooltip (store, tooltip) {
      store.commit('HIDE_TOOLTIP', tooltip)
    },
  }
};
