<template lang="pug">
  content.main-content
    div.wrapper 
      h2.main-content__title Блок «Работы»
      addworks(
        v-if="disabledRorm || editWork"
        :cancel="cancel"
      )
      ul.admin-layout-list.works-list
        .admin-layout-list__item.add-item(v-if="!disabledRorm")
          a(href="#" @click.prevent="showForm").admin-layout-list__cont.add-item__link
            span.add-item__icon +
            span.add-item__title Добавить работу
        works-item(
          v-for="work in works"
          :key="work.id"
          :work="work"
        )
</template>
  
<script>

import { mapActions, mapState } from "vuex";
export default {
  components: {
    addworks: () => import('components/addworks.vue'),
    worksItem: () => import("components/works-item.vue")
  },
  data() {
    return {
      disabledRorm: false
    }
  },
  computed: {
    ...mapState('works', {works: state => state.works}),
    ...mapState('works', {editWork:  state => state.edit})
  }, 
  methods: {
    ...mapActions('works', ["fetchWorks"]), 
    showForm () {
      this.disabledRorm = !this.disabledRorm;
    },
    cancel() {
      this.disabledRorm = false;
    }
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
.works-list .admin-layout-list__img{
  max-height: 210px;
  overflow: hidden;
}
</style>
  