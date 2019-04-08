<template lang="pug">
  .admin-layout-list__item
    .admin-layout-list__cont 
      .admin-layout-list__author.reviews-author
        .reviews-author__img
          img(:src="review.photo" alt="").author-avatar
        .reviews-author__text
          .reviews-author__name {{ review.author }}
          .reviews-author__prof {{ review.occ }}              
      .admin-layout-list__text 
        p {{ review.text }} 
      .admin-layout-list__bottom
        a(href="#").link-change 
          span.link-change__text Править 
          span.link-change__icon
        a(href="#" @click.prevent="removeExistedReview").link-remove 
          span.link-remove__text Удалить               
          span.link-remove__icon

</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    review: Object
  },
  data() {
    return {
      editmode: false
    }
  },
  methods: {
    ...mapActions("reviews", ["removeReview"]),
    async removeExistedReview() {
      try {
        console.log(this.review.id);
        await this.removeReview(this.review.id);        
      } catch (error) {}
    },
  }
};
</script>
