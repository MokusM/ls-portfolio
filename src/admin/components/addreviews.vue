<template lang="pug">
  .addreviews
    .addreviews__title(v-if="editReview") Редактировать отзыв
    .addreviews__title(v-else) Новый отзыв
    .addreviews__form 
      form.reviews-form(
          @submit="editReview  ?  editCurrentReview() : addNewReview()"
        )
        .reviews-form__avatar
          label.upload-avatar(:class="{error: validation.hasError('review.photo')}")
            input(
              type="file"      
              @change="handlePhotoUpload"
            )
            .upload-avatar__img(
              :class="{'filled' : renderedAvatar.length}"
              :style="{'backgroundImage' : userAvatarUrl}"
            )
              .upload-avatar__icon
            .upload-avatar__link(v-if="renderedAvatar.length") Редактировать фото
            .upload-avatar__link(v-else) Добавить фото
            .input-error {{ validation.firstError('review.photo') }}

        .reviews-form__main
          .box-field__row
            .box-field(:class="{error: validation.hasError('review.author')}")
              label.box-field__label Имя автора
              .box-field__input
                input.form-control(type="text", value="Ковальчук Дмитрий" v-model="review.author" )
                .input-error {{ validation.firstError('review.author') }}

            .box-field(:class="{error: validation.hasError('review.occ')}")
              label.box-field__label Титул автора
              .box-field__input              
                input.form-control(type="text", v-model="review.occ" )
                .input-error {{ validation.firstError('review.occ') }}

          .box-field(:class="{error: validation.hasError('review.text')}")
            label.box-field__label Отзыв
            .box-field__input
              textarea.form-control(v-model="review.text")
              .input-error {{ validation.firstError('review.text') }}

          .box-field-btn
            a(type="#" @click.prevent="closeForm").cancel-form Отмена
            input.btn.btn-orange(type="submit", value="Сохранить") 

  
            
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import { Validator } from 'simple-vue-validator';
import { renderer, getAbsoluteImgPath } from '@/helpers/pictures';
import $axios from "@/requests";
export default {
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "review.author": value =>  {
      return Validator.value(value).required("Заполните автора");
    },
    "review.occ": value =>  {
      return Validator.value(value).required("Укажите роль автора");
    },
    "review.text": value =>  {
      return Validator.value(value).required("Введите текст отзыва");
    },
    "review.photo": value =>  {
      return Validator.value(value).required("Вставте аватар");
    }
  },
  props: {
    cancel: Function
  },
  data() {
    return {
      renderedAvatar: "",
      review: {
        id: 0,
        author: "",
        occ: "",
        text: "",
        photo: ""
      }
    }
  },
  watch: {
    currentReview(value){
      if(this.editReview === true) this.fillFormWithCurrentReviewData();
    }
  },
  created() {
    if(this.editReview === true) this.fillFormWithCurrentReviewData();
  },
  computed: {
    userAvatarUrl() {
      return `url(${this.renderedAvatar})`
    },
    ...mapState('reviews', {currentReview:  state => state.currentReview}),
    ...mapState('reviews', {editReview:  state => state.edit}),    
  },
  methods: {
    ...mapActions('reviews', ['addReview', 'updateReview']),
    ...mapActions('tooltips', ['showTooltip']),
    ...mapMutations('reviews', ['setEdit']),
    closeForm() {
      this.review.author = '';
      this.review.occ = '';
      this.review.author = '';
      this.review.text = '';
      this.review.photo = '';
      this.disabledRorm = true;
      this.setEdit(false);
      this.cancel();
    },
    async editCurrentReview() {
      console.log('editCurrentReview');
      if ((await this.$validate()) === false) return;
      this.disabledRorm = true;
      this.setEdit(false);    
      try {
        const responce = await this.updateReview(this.review);
        this.clearFormFields();        
        this.showTooltip({
          type: "success",
          text: "Отзыв обновлен",
        })
      } catch (error) {
        this.showTooltip({
          type: "error",
          text: error.message
        })
      } finally {
        this.disabledRorm = false;
        this.validation.reset();
      }
    },
    async addNewReview() {
      console.log('addNewReview');
      if ((await this.$validate()) === false) return;
      this.disabledRorm = true;
     
     try {
        const responce = await this.addReview(this.review);
        this.clearFormFields();
      } catch (error) {
        this.showTooltip({
          type: "error",
          text: error.message
        })
      } finally {
        this.disabledRorm = false;
        this.validation.reset();
      }
    },
    clearFormFields() {
      this.review.author = '';
      this.review.occ = '';
      this.review.author = '';
      this.review.text = '';
      this.review.photo = '';
      this.renderedAvatar = "";      
    },
    fillFormWithCurrentReviewData() {
      this.review = {...this.currentReview };
      this.rendedPhotoUrl = getAbsoluteImgPath(this.currentReview.photo);
    },
    async handlePhotoUpload(e) {
      const file = e.target.files[0];
      this.review.photo = file; 
      try {
        const renderedResult = await renderer(file);
        this.renderedAvatar = renderedResult;
      } catch (error) {
        this.showTooltip({
          type: "error",
          text: "Ошибка во время обработки файла"
        })
      }
    }
  }
};
</script>

<style lang="postcss">
    @import "../../styles/mixins.pcss";

.addreviews {
  margin-bottom: 30px;
  background-color: white;
  box-shadow: 4.1px 2.9px 20px rgba(0, 0, 0, 0.07);
  padding: 20px;
  @include bp-tablets-lg {     
    padding-right: 30px;
  }
  @include tablets{
    margin: 0 -20px;
    padding: 0 0 27px;
  }
  &__title{
    color: #414c63;
    font-size: 18px;
    font-weight: 700;
    line-height: 34px;
    border-bottom: 1px solid rgba(31,35,45,0.15);
    padding: 0 8px 20px;
    margin-bottom: 45px;
    @include tablets{
      padding: 8px 20px 20px;
      margin-bottom: 29px;
      font-size: 16px;
    }
  }
}
.reviews-form{
  display: flex;
  @include tablets{
    display: block;
    padding: 0 20px;
  }
  &__avatar{
    width: 240px;
    @include tablets{
      margin: 0 auto;
    }
  }
  &__main{
    width: calc(100% - 240px);
    max-width: 611px;
    @include tablets{
      width: 100%;
    }
  }
}
.upload-avatar{
  text-align: center;
  cursor: pointer;
  position: relative;
  display: block;
  @include tablets{
    margin-bottom: 35px;
  }
  &__img{
    width: 200px;
    height: 200px;
    background-color: #dee4ed;
    border-radius: 50%;
    margin: 5px auto 16px;
    position: relative;
    background-size: cover;
    background-repeat: none;
    background-position: center center;
    @include tablets{
      margin-left: auto;
      margin-right: auto;
    }
    &.filled{
      .upload-avatar__icon{
        display: none;
      }
    }
  }
  &__icon{
    background: svg-load('user.svg', fill=#fff, width=100%, height=100%);
    width: 85px;
    height: 113px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  &__link{
    color: #383bcf;
    font-size: 16px;
    font-weight: 600;
    line-height: 34px;
    padding-right: 0px;
    @include tablets{
      padding-right: 0;
    }
  } 
  input{
    position: absolute;
    right:  -6000px;
    visibility: hidden;
    opacity: 0;
  }
  &.error{
    .upload-avatar__img{        
      background-color: #c76e6e;
    }
  }
}
.box-field{
  &__label{
    opacity: 0.5;
    color: #414c63;
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    margin-bottom: -2px;
    display: block;
    @include tablets{
      font-size: 14px;
    }
  }
  &__row{
    display: flex;
    margin: 0 -15px 35px;
    @include bp-tablets-lg {     
      margin: 0 0 30px 0;
      display: block;
    }
    @include tablets{
      margin: 0 0 24px 0;
    }
    .box-field{
      padding: 0 15px;
      margin-bottom: 0;
      width: 50%;
      max-width: 290px;
      @include bp-tablets-lg {     
        padding: 0;
        margin: 0 0 35px 0;
        width: 100%;
      }
      @include tablets{
        margin: 0 0 24px 0;
      }
    }
  }
  &__input{
    position: relative;
    cursor: pointer;
    &:hover{

    }
  }
}
.form-control{
  background-color: transparent;
  border: none;
  color: #414c63;
  font-size: 16px;
  font-weight: 600;
  line-height: 47px;
  height: 53px;
  width: 100%;  
  border-bottom: 1px solid rgba(0,0,0,1);
  padding: 0 0 0 0px; 
  font-family: "Open Sans", sans-serif;
  @include tablets{
    font-size: 14px;
  }
  &:focus{
    outline: none;
    &+.bottom-line{
      left: 0;
    }
  }
  &:active{
    &+.bottom-line{
      left: 0;
    }
  }
  &:-moz-placeholder,
	&::-moz-placeholder{
		color: white;
		opacity: 1;
	}
	&::-webkit-input-placeholder{
		color: white;
	}
	&:-ms-input-placeholder{
    color: white;
		opacity: 1;
	}
}
.bottom-line{
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 1px;
  background-color: #ff9a00;
  transition: all 0.3s;
  left: -100%;
}
textarea.form-control{
  margin-top: 16px;
  resize: none;
  height: 116px;
  padding: 15px 20px 7px;
  display: block;
  line-height: 24px;
  border: 1px solid rgba(65,76,99,0.2);
  @include bp-tablets-lg {     
    height: 148px;
  }
}
.cancel-form{
  color: $main-color;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  @include tablets{
    font-size: 14px;
  }
}

.box-field-btn{
  padding-top: 29px; 
  padding-bottom: 29px;    
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .btn{
    margin-left: 57px;
    @include tablets{
      margin-left: 25px;
    }
  }
  @include bp-tablets-lg {     
    padding-bottom: 14px;
  }
}
.btn{
  display: inline-block;
  vertical-align: top;
}
.btn-orange{
  width: 100%;
  max-width: 181px;
  height: 60px;
  border-radius: 30px;
  background-color: white;
  background-image: linear-gradient(to right, #ea7400 0%, #f29400 100%);
  text-align: center;
  color: white;
  font-size: 16px;
  font-weight: 700;
  line-height: 48px;
  text-transform: uppercase;
  border: none;
  transition: all 0.5s;
  cursor: pointer;
  @include tablets{
    font-size: 14px;
  }
  &:hover{
    background-image: linear-gradient(to right, #ff7f00 0%, #ff9d00 100%);
  }
}
</style>
  