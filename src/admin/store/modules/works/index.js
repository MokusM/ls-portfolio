export default {
  namespaced: true,
  state: {
    works: []
  },
  mutations: {
    SET_WORKS: (state, works) => {
      state.works = works;
    },
    ADD_WORKS: (state, newWork) => {
      state.works.push(newWork);
    },
    REMOVE_WORK: (state, deletedWorkId) => {
      state.works = state.works.filter(work => work.id !== deletedWorkId);
    },    
    EDIT_WORK: (state, editedWork) => {
      state.works = state.works.map(work =>
        work.id === editedWork.id ? editedWork : work
      );
    }
  },
  actions: {
    async fetchWorks({ commit }, works) {
      try {
        const response = await this.$axios.get("/works/106", works);
        commit("SET_WORKS", response.data);
        return response;
      } catch (error) {
        // error handling
      }
    },
    
   

    async removeWork({ commit }, workId) {
      try {
        const response = await this.$axios.delete(`/works/${workId}`);
        commit("REMOVE_WORK", workId);
        return response;
      } catch (error) {
        generateStdError(error);
      }
    },
    
  }
};