export default {
  namespaced: true,
  state: {
    works: [],
    currentWork: {},
    edit: false
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
    UPDATE_WORK: (state, editedWork) => {
      state.works = state.works.map(work =>
        review.id === editedWork.id ? editedWork : work
      );
    },
    CHOOSE_WORK(state, item) {
      state.currentWork =  item,
      state.edit = true
    },
    setEdit (state, flag) {
      state.edit = flag
    },
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
    
    async addWork({ commit }, work) {
      try {
        const formData = new FormData();
        formData.append('photo', work.photo);
        formData.append('title', work.title);      
        formData.append('techs', work.techs);      
        formData.append('link', work.link);      
        formData.append('description', work.description);      
        const response = await this.$axios.post('/works', formData);
        commit("ADD_WORKS", response.data);
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

    async chooseWork({ commit }, item) {
      try {        
        commit("CHOOSE_WORK", item);
      } catch (error) {
        
      }
    },

    async updateWork({ commit }, work) {
      try {
        const response = await this.$axios.post(`/works/${work.id}`, work);
        commit('UPDATE_WORK', response.data.work);
        return response;
      } catch (error) {
        // error handling
      }
    },
    
  }
};