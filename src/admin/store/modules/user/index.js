export default {
  namespaced: false,
  state: {
    users: [{
      id: 1,
      name: 'Моисеев Николай',
      photo: require('../../../../admin/assets/img/user.jpg')
    }]
  },
  getters: {
    getUsers: state => state.users
  }
}