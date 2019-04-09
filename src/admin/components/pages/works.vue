<template lang="pug">
  content.main-content
    div.wrapper 
      h2.main-content__title Блок «Работы»
      addworks
      ul.admin-layout-list.works-list
        .admin-layout-list__item.add-item 
          a(href="#").admin-layout-list__cont.add-item__link
            span.add-item__icon +
            span.add-item__title Добавить работу
        .admin-layout-list__item(v-for="work in works" :key="work.id")
          .admin-layout-list__cont
            .admin-layout-list__img
              img(:src="work.photo" alt="")
              ul.tag-list.admin-layout-list__tag
                li.tag-list__item
                  .tag-list__title 45
            .admin-layout-list__text-content
              .admin-layout-list__title {{ work.title }}                 

              .admin-layout-list__text 
                p {{ work.desc }} 
              
              a(:href="work.link").work-link {{ work.link }} 
  
              .admin-layout-list__bottom
                a(href="#").link-change 
                  span.link-change__text Править 
                  span.link-change__icon
                a(href="#").link-remove 
                  span.link-remove__text Удалить 
                  span.link-remove__icon
  
  
  
  
</template>
  
<script>
import { mapActions, mapState } from "vuex";
  export default {
    name: "Works",
    components: {
      addworks: () => import('components/addworks')
    },
    computed: {
      ...mapState('works', {
        works: state => state.works
      })
    },
    methods: {
      ...mapActions('works', ["fetchWorks"]),
    },
    async created() {
      try {
        await this.fetchWorks(); 
      } catch (error) {
        alert('Произошла ошибка при загрузке отзивов') 
      }
    },
      
  };
  
  </script>
  
<style lang="postcss">
    @import "../../../styles/mixins.pcss";
.works-list{
  .admin-layout-list__cont{
    padding:  0;
  }
  .admin-layout-list__text{
    padding: 0;
    margin-bottom: 13px;
  }
  .admin-layout-list__bottom{
    margin-top: 35px;
    padding: 0;
    @include tablets{
      margin-top: 25px;
      margin-bottom: 12px;
    }
  }
  .add-item__link{
    @include tablets{
      padding: 25px 22px;
    }
  }
}
.admin-layout-list__img{
  position: relative;
  img{
    display: block;
    max-width: 100%;
  }
}
.admin-layout-list__text-content{
  padding: 35px 30px  40px;
  @include tablets{
    padding: 24px 20px;
  }
}
.tag-list{
  margin: 0 -5px 0px;
  @include tablets{
    margin: 0 -2px;
  }
  &__item{
    display: inline-block;
    vertical-align: top;
    padding: 0 5px;
    @include tablets{
      padding:  0 2px;
    }
  }
  &__title{
    display: block;
    color: #283340;
    font-size: 13px;
    font-weight: 600;
    line-height: 15px;
    height: 30px;
    border-radius: 15px;
    padding: 8px 21px 0;
    background-color: white;
  }
}
.admin-layout-list__title{
  color: #414c63;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  margin-bottom: 17px;
  @include tablets{
    margin-bottom: 10px;
  }
}
.admin-layout-list__tag{
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.work-link{
  color: #ea7400;
  font-size: 16px;
  font-weight: 600;
  line-height: 30px;
  @include tablets{
    font-size: 14px;
  }
}
</style>
  