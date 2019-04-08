
export default {
  namespaced: true,
  state: {
    tooltips: []
  },
  mutations: {
    
  },
  actions: {
    async addSkill({ commit }, skill) {
      try {
        const response = await this.$axios.post("/skills", skill);
        commit("ADD_SKILL", response.data);
        return response;
      } catch (error) {
        // error handling
      }
    }
  }
};