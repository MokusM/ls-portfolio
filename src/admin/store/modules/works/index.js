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
  getters: {
    getWorks: state => state.works
  }
}
