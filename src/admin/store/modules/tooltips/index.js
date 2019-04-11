
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
      setTimeout(function(){
        state.tooltip.show = false
      }, 3000);
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
    hideTooltip ({ commit }, tooltip) {
      commit('HIDE_TOOLTIP', tooltip)
    },
  }
};
