<template lang="pug">
  li.admin-layout-list__item
    .admin-layout-list__cont 
      .admin-layout-list__author.reviews-author
        .reviews-author__img
          img(:src="`https://webdev-api.loftschool.com/${review.photo}`" alt="").author-avatar
          
        .reviews-author__text
          .reviews-author__name {{ review.author }}
          .reviews-author__prof {{ review.occ }}              
      .admin-layout-list__text 
        p {{ review.text }} 
      .admin-layout-list__bottom
        a(href="#").link-change
          span.link-change__text(@click.prevent="chooseBlock") Править 
          span.link-change__icon
        a(href="#" @click.prevent="removeExistedReview").link-remove 
          span.link-remove__text Удалить               
          span.link-remove__icon

</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {  
  props: {
    review: Object
  },
  computed: { 
    ...mapState('reviews', ['currentReview']) },
  methods: {
    ...mapActions("reviews", ["removeReview" ,"chooseReview"]),
    ...mapActions('tooltips', ["showTooltip"]),
    ...mapMutations('reviews', ['setEdit']),
    async removeExistedReview() {
      try {        
        await this.removeReview(this.review.id); 
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
        await this.chooseReview(this.review);
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
