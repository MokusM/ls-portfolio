<template lang="pug">
  content.main-content
    div.wrapper 
      h2.main-content__title Блок «Отзывы»
      addreviews(
        v-if="disabledRorm || editReview"
        :cancel="cancel"
      )
      ul.admin-layout-list
        li.admin-layout-list__item.add-item(v-if="!disabledRorm")
          a(href="#" @click.prevent="showForm").admin-layout-list__cont.add-item__link
            span.add-item__icon +
            span.add-item__title Добавить отзыв
        reviews-item(
          v-for="review in reviews"
          :key="review.id"
          :review="review"
        )
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  components: {
    addreviews: () => import('components/addreviews.vue'),
    reviewsItem: () => import("components/reviews-item.vue")
  },
  data() {
    return {
      disabledRorm: false
    }
  },
  computed: {
    ...mapState('reviews', {reviews: state => state.reviews}),
    ...mapState('reviews', {editReview:  state => state.edit})
  }, 
  methods: {
    ...mapActions('reviews', ["fetchReviews"]), 
    showForm () {
      this.disabledRorm = !this.disabledRorm;
    },
    cancel() {
      this.disabledRorm = false;
    }
  },
  async created() {
    try {
      await this.fetchReviews(); 
    } catch (error) {
      alert('Произошла ошибка при загрузке отзивов') 
    }
  },
};
</script>

<style lang="postcss">
  @import "../../../styles/mixins.pcss";
  .admin-layout-list{
    display: flex;
    margin: 0 -15px;
    flex-wrap: wrap;
    @include tablets{
      margin: 0 -20px;
      width: calc(100% + 40px);
    }
    &__item{
      padding: 0 15px;
      margin-bottom:  30px;
      width: 33.3%;
      @include bp-tablets-lg{
        width: 50%;
      }
      @include tablets{
        width: 100%;
        padding: 0;
        margin: 0;
      }
      &:first-child{
        @include tablets{
          padding-bottom: 12px;
        }
      }
    }
    &__cont{
      min-height: 380px;
      background-color: white;
      box-shadow: 4.1px 2.9px 20px rgba(0, 0, 0, 0.07);
      display: flex;
      flex-direction: column;
      padding: 29px 18px;
      @include tablets{
        box-shadow: none;
        min-height: 0;
        padding: 30px 0px;
      }
      p{
        opacity: 0.7;
        color: #414c63;
        font-size: 16px;
        font-weight: 600;
        line-height: 30px;
        @include tablets{
          font-size: 14px;
          line-height: 24px;
        }
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
      @include tablets{
        padding: 4px 20px;
      }
    }
    &__text{
      padding: 20px 12px;
      @include tablets{
        padding: 25px 20px;
      }
    }
  }
  
  .reviews-author{
    display: flex;  
    padding: 0 0px 31px 14px;  
    @include tablets{
      padding: 0 20px 31px;
    }
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
      @include tablets{
        font-size: 16px;
      }
    }
    &__prof{
      opacity: 0.5;
      color: #414c63;
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      @include tablets{
        font-size: 14px;
      }
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
      @include tablets{
        height: 111px;
        min-height: 0;
        flex-direction: row;
        justify-content: flex-start;
        padding:  5px 22px;
      }
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
      @include tablets{
        font-size: 24px;
        width: 50px;
        height: 50px;
        line-height: 45px;
        margin: 0;
      }
    }
    &__title{
      color: white;
      font-size: 18px;
      font-weight: 700;
      line-height: 30px;
      max-width: 110px;
      margin: 0 auto;
      @include tablets{
        font-size: 16px;
        max-width: 100%;
        margin: 0;
        padding-left: 20px;
      }
    }
  }
  .link-change,
  .link-remove{
    opacity: 0.5;
    color: #414c63;
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    display: flex;
    align-items: center;
    &:hover{
      opacity: 1;
    }
    @include tablets{
      font-size: 14px;
    }
  }
  .link-change{
    &__icon{
      background: svg-load('pencil.svg', fill=$main-color, width=100%, height=100%);
      width: 17px;
      height: 17px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
      margin-left: 10px;
    }
  }
  .link-remove{
    &__icon{
      background: svg-load('remove.svg', fill=#c92e2e, width=100%, height=100%);
      width: 15px;
      height: 15px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
      margin-left: 10px;
    }
  }
</style>
