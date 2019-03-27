export default {
  namespaced: false,
  state: {    
    reviews: [{
      id: 1,
      author_name: 'Владимир Сабанцев',
      author_occ: 'Основатель Loftschool',
      author_pic: require('../../../../admin/assets/img/reviews-2.jpg'),      
      text: '1 Этот парень проходил обучение веб-разработке не где-то, а в Loftschool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!'
    },{
      id: 2,
      author_name: 'Владимир Сабанцев',
      author_occ: 'Основатель Loftschool',
      author_pic: require('../../../../admin/assets/img/reviews-1.jpg'),
      text: '2 Этот парень проходил обучение веб-разработке не где-то, а в Loftschool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!'
    },{
      id: 3,
      author_name: 'Владимир Сабанцев',
      author_occ: 'Основатель Loftschool',
      author_pic: require('../../../../admin/assets/img/reviews-2.jpg'),
      text: '3 Этот парень проходил обучение веб-разработке не где-то, а в Loftschool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!'
    },{
      id: 4,
      author_name: 'Владимир Сабанцев',
      author_occ: 'Основатель Loftschool',
      author_pic: require('../../../../admin/assets/img/reviews-1.jpg'),
      text: '4 Этот парень проходил обучение веб-разработке не где-то, а в Loftschool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!'
    }]
  },
  getters: {
    getReviews: state => state.reviews,
    modulById (state) {
      return modulId => {
        return state.modules.find(modul => modul.id === modulId)
      }
    }
  },
  actions: {
    updateReviews (store, item) {
      store.commit('updateReviews', item)
    },
    removeReviews (store, review) {
      store.commit('removeReviews', review)
    },
    addReviews (store, payload) {
      store.commit('addReviews', payload)
    }
  },
  mutations: {
    updateReviews (state, item) {
      state.reviews.map((review, i) => {
        if (review.id === item.id) {
          state.reviews[i] = item
        }
      })
    },
    removeReviews (state, review) {
      var reviews = state.reviews
      reviews.splice(reviews.indexOf(review), 1)
    },
    addReviews (state, payload) {
      state.reviews.push({
        title: payload.newModul,
        description: payload.newModulDesc,
        price: payload.newModulPrice,
        free: payload.newModulFree,
        imgSrc: payload.newModulImg,
        id: state.modules.length+1
      })
    }
  }
}
