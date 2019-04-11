export default {
  namespaced: true,
  state: {
    reviews: [],
    currentReview: {},
    edit: false
  },
  mutations: {
    SET_REVIEWS: (state, reviews) => {
      state.reviews = reviews;
    },
    ADD_REVIEWS: (state, newReview) => {
      state.reviews.push(newReview);
    },
    REMOVE_REVIEW: (state, deletedReviewId) => {
      state.reviews = state.reviews.filter(review => review.id !== deletedReviewId);
    },    
    UPDATE_REVIEW: (state, editedReview) => {
      state.reviews = state.reviews.map(review =>
        review.id === editedReview.id ? editedReview : review
      );
    },
    CHOOSE_REVIEW(state, item) {
      state.currentReview =  item,
      state.edit = true
    },
    setEdit (state, flag) {
      state.edit = flag
    },
  },
  actions: {
    async fetchReviews({ commit }, reviews) {
      try {
        const response = await this.$axios.get("/reviews/106", reviews);
        commit("SET_REVIEWS", response.data);
        return response;
      } catch (error) {
        // error handling
      }
    },
    
    async addReview({ commit }, review) {
      try {
        const formData = new FormData();
        formData.append('photo', review.photo);
        formData.append('author', review.author);      
        formData.append('occ', review.occ);      
        formData.append('text', review.text);      
        const response = await this.$axios.post('/reviews', formData);
        commit("ADD_REVIEWS", response.data);
        return response;
      } catch (error) {
        // error handling
      }
    },

    async removeReview({ commit }, reviewId) {
      try {
        const response = await this.$axios.delete(`/reviews/${reviewId}`);
        commit("REMOVE_REVIEW", reviewId);
        return response;
      } catch (error) {
        generateStdError(error);
      }
    },

    async chooseReview({ commit }, item) {
      try {        
        commit("CHOOSE_REVIEW", item);
      } catch (error) {
        
      }
    },

    async updateReview({ commit }, review) {
      try {
        const response = await this.$axios.post(`/reviews/${review.id}`, review);
        commit('UPDATE_REVIEW', response.data.review);
        return response;
      } catch (error) {
        // error handling
      }
    },
    
  }
};