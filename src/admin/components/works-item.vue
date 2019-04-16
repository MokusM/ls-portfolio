<template lang="pug">
  li.admin-layout-list__item
    .admin-layout-list__cont
      .admin-layout-list__img
        img(:src="`https://webdev-api.loftschool.com/${work.photo}`" alt="")
        ul.tag-list.admin-layout-list__tag
          li.tag-list__item(v-for="tag in tagsArray")
            .tag-list__title {{ tag }}
      .admin-layout-list__text-content
        .admin-layout-list__title {{ work.title }} 
        .admin-layout-list__text 
          p {{ work.description }}         
        a(:href="work.link").work-link {{ work.link }} 

        .admin-layout-list__bottom
          a(href="#" @click.prevent="chooseBlock").link-change 
            span.link-change__text Править 
            span.link-change__icon
          a(href="#" @click.prevent="removeExistedWork").link-remove 
            span.link-remove__text Удалить 
            span.link-remove__icon

</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {  
  props: {
    work: Object
  },
  computed: { 
    ...mapState('works', ['currentWork']),
    tagsArray() {
      return this.work.techs.split(',')
    }
  },
  methods: {
    ...mapActions("works", ["removeWork" ,"chooseWork"]),
    ...mapActions('tooltips', ["showTooltip"]),
    ...mapMutations('works', ['setEdit']),
    async removeExistedWork() {
      try {        
        await this.removeWork(this.work.id); 
        this.showTooltip({
          type: "success",
          text: "Отзыв удалён",
        })       
      } catch (error) {
        this.showTooltip({
          type: "error",
          text: error.message
        })
      }
    },
    async chooseBlock() {
      try {        
        await this.chooseWork(this.work);
        this.setEdit(true);
        this.showTooltip({
          type: "success",
          text: "Отзыв выбран",
        })
      } catch (error) {
        this.showTooltip({
          type: "error",
          text: error.message
        })
      }
    }
  }
};
</script>
