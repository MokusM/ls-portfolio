<template lang="pug">
  content.main-content
    div.wrapper 
      h2.main-content__title Блок «Отзывы»
      addreviews  
      ul.admin-layout-list
        .admin-layout-list__item.add-item 
          a(href="#").admin-layout-list__cont.add-item__link
            span.add-item__icon +
            span.add-item__title Добавить отзыв
        .admin-layout-list__item(v-for="(review, index) in reviews" :key="review.id")
          .admin-layout-list__cont
            .admin-layout-list__author.reviews-author
              .reviews-author__img
                img(:src="review.author_pic" alt="").author-avatar
              .reviews-author__text
                .reviews-author__name {{ review.author_name }}
                .reviews-author__prof {{ review.author_occ }}              
            .admin-layout-list__text 
              p {{ review.text }} 

            .admin-layout-list__bottom
              a(href="#").link-change Править
              a(href="#").link-remove(@click="remove(review.id)") Удалить




</template>

<script>
import addreviews from "./addreviews";
export default {
  name: "Reviews",
  components: {
    addreviews
  },
  computed: {
    reviews() {
      return this.$store.getters.getReviews
    }
  },
  methods: {
      remove(item){
        this.$store.dispatch('removeReviews', item);
      }
    }
};

</script>

<style>
  .admin-layout-list{
    display: flex;
    margin: 0 -15px;
    flex-wrap: wrap;
    &__item{
      padding: 0 15px;
      margin-bottom:  30px;
      width: 33.3%;
    }
    &__cont{
      min-height: 380px;
      background-color: white;
      box-shadow: 4.1px 2.9px 20px rgba(0, 0, 0, 0.07);
      display: flex;
      flex-direction: column;
      padding: 29px 18px;
      p{
        opacity: 0.7;
        color: #414c63;
        font-size: 16px;
        font-weight: 600;
        line-height: 30px;
      }
    }
    &__author{
      border-bottom: 1px solid rgba(31, 35, 45, 0.15);
    }
    &__bottom{
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 0 12px;
    }
    &__text{
      padding: 20px 12px;
    }
  }
  .link-change,
  .link-remove{
    opacity: 0.5;
    color: #414c63;
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    &:hover{
      opacity: 1;
    }
  }
  .reviews-author{
    display: flex;  
    padding: 0 0px 31px 14px;  
    &__img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      img{
        border-radius: 50%;
        max-width: 6000px;
      }
    }
    &__text{
      width: calc(100% - 75px);
      padding-left: 18px;
    }
    &__name{
      color: #414c63;
      font-size: 18px;
      font-weight: 700;
      line-height: 24px;
      margin-bottom: 2px;
    }
    &__prof{
      opacity: 0.5;
      color: #414c63;
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
    }
  }
  .add-item{    
    &__link{
      background-color: white;
      background-image: linear-gradient(90deg,#ea7400 0,#f29400);
      box-shadow:  0 0;
      text-align: center;      
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 100%;
    }
    &__icon{
      color: white;
      font-size: 72px;
      font-weight: 300;
      line-height: 150px;
      width: 150px;
      height: 150px;
      border: 2px solid white;
      border-radius: 50%;
      margin: 0 auto 23px;
    }
    &__title{
      color: white;
      font-size: 18px;
      font-weight: 700;
      line-height: 30px;
      max-width: 110px;
      margin: 0 auto;
    }
  }
</style>
