import axios from 'axios'
export default {
  namespaced: false,
  state: {    
    works: [{
      id: 1,
      title: 'Сайт школы образования',
      skills: "Html, Css, JavaScript",
      photo:  require('../../../../admin/assets/img/previews-1.jpg'),
      link: "http://loftschool.ru",
      desc: "Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 2 месяца только самых тяжелых испытаний и бессонных ночей!"
    },{
      id: 2,
      title: 'Сайт школы образования',
      skills: "Html, Css, JavaScript",
      photo:  require('../../../../admin/assets/img/previews-2.jpg'),
      link: "http://loftschool.ru",
      desc: "Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 2 месяца только самых тяжелых испытаний и бессонных ночей!"
    },{
      id: 3,
      title: 'Сайт школы образования',
      skills: "Html, Css, JavaScript",
      photo:  require('../../../../admin/assets/img/previews-3.jpg'),
      link: "http://loftschool.ru",
      desc: "Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 2 месяца только самых тяжелых испытаний и бессонных ночей!"
    },{
      id: 4,
      title: 'Сайт школы образования',
      skills: "Html, Css, JavaScript",
      photo:  require('../../../../admin/assets/img/previews-4.jpg'),
      link: "http://loftschool.ru",
      desc: "Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 2 месяца только самых тяжелых испытаний и бессонных ночей!"
    }]
  },
  mutations : {
    
  },
  actions: {
    updateWorks: async (context, name) => {
      let {data} = await axios.post('https://webdev-api.loftschool.com/categories', {name: name})
        .then(resp => {
        axios.defaults.headers.common['Authorization'] = token
      })
  
      if (data.status == 200) {
        context.commit('updateWorks', name);
      }
    },
  },
  getters: {
    getWorks: state => state.works
  }
}
