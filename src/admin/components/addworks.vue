<template lang="pug">
  .addreviews 
    .addreviews__title(v-if="editWork") Редактирование работы
    .addreviews__title(v-else) Новая работа
    .addreviews__form 
      form.reviews-form.works-form(
          @submit="editWork  ?  editCurrentWork() : addNewWork()"
        )
        .works-form__file
          .works-form__pic(v-if="editWork")
            .works-form__img( :style="{'backgroundImage' : workImgUrl, 'filled' : renderedImg.length}")
              img(:src="`https://webdev-api.loftschool.com/${work.photo}`" v-if="!renderedImg.length" alt="").author-avatar
            .upload-avatar__link(v-if="editWork") Редактировать фото
              input(
                type="file"      
                @change="handlePhotoUpload"
              ).works-form__change

          .upload-file-wrap(v-else)        
            .upload-file(
              :class="{'error': validation.hasError('work.photo'), 'filled' : renderedImg.length}"
                :style="{'backgroundImage' : workImgUrl}"
              )                      
              .upload-file__title(v-if="!renderedImg.length") Перетащите или загрузите для загрузки изображения            
              span.btn.btn-orange(v-if="!renderedImg.length") ЗАГРУЗИТЬ  
              input(
                type="file"      
                @change="handlePhotoUpload"
              ).works-form__change              
              .input-error {{ validation.firstError('work.photo') }}
        
          
        .reviews-form__main
          .box-field(:class="{error: validation.hasError('work.work')}")
            label.box-field__label Название
            .box-field__input
              input.form-control(type="text" v-model="work.title")
              .input-error {{ validation.firstError('work.title') }}
          .box-field(:class="{error: validation.hasError('work.link')}")
            label.box-field__label Ссылка
            .box-field__input              
              input.form-control(type="text" v-model="work.link")
              .input-error {{ validation.firstError('work.link') }}
          .box-field(:class="{error: validation.hasError('work.description')}")
            label.box-field__label Описание
            .box-field__input
              textarea.form-control(v-model="work.description")
              .input-error {{ validation.firstError('work.description') }}
          .box-field.box-field_mb20(:class="{error: validation.hasError('work.techs')}")
            label.box-field__label Добавление тэга
            .box-field__input              
              input.form-control(type="text" v-model="work.techs")
              .input-error {{ validation.firstError('work.techs') }
          ul.tag-list.tag-list-with-remove
            li.tag-list__item(v-for="(tag, index) in tagsArray")
              .tag-list__title(v-if="tag.length") {{ tag }}
                a(href="#" @click.prevent="removeTag(index)").tag-list__remote
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
    "work.title": value =>  {
      return Validator.value(value).required("Введите название роботы");
    },
    "work.link": value =>  {
      return Validator.value(value).required("Введите ссылку на работу");
    },
    "work.description": value =>  {
      return Validator.value(value).required("Введите описание работы");
    },
    "work.techs": value =>  {
      return Validator.value(value).required("Вставте основные тегы");
    },
    "work.photo": value =>  {
      return Validator.value(value).required("Вставте превью фото");
    }
  },
  props: {
    cancel: Function
  },
  data() {
    return {
      renderedImg: "",
      work: {
        id: 0,
        title: "",
        link: "",
        description: "",
        techs: "",
        photo: ""
      }
    }
  },
  watch: {
    currentWork(value){
      if(this.editWork === true) this.fillFormWithCurrentWorkData();
    }
  },
  created() {
    if(this.editWork === true) this.fillFormWithCurrentWorkData();
  },
  computed: {
    workImgUrl() {
      return `url(${this.renderedImg})`     
    },    
    ...mapState('works', {currentWork:  state => state.currentWork}),
    ...mapState('works', {editWork:  state => state.edit}),
    tagsArray() {
      return this.work.techs.split(',')
    }
  },
  methods: {
    ...mapActions('works', ['addWork', 'updateWork']),
    ...mapActions('tooltips', ['showTooltip']),
    ...mapMutations('works', ['setEdit']),
    closeForm() {
      this.work.title = '';
      this.work.link = '';
      this.work.description = '';
      this.work.text = '';
      this.work.techs = '';
      this.work.photo = '';
      this.disabledRorm = true;
      this.setEdit(false);
      this.cancel();
    },
    async editCurrentWork() {
      if ((await this.$validate()) === false) return;
      this.disabledRorm = true;
      this.setEdit(false);    
      try {
        const responce = await this.updateWork(this.work);
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
    async addNewWork() {
      if ((await this.$validate()) === false) return;
      this.disabledRorm = true;     
     try {
        const responce = await this.addWork(this.work);
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
      this.work.title = '';
      this.work.link = '';
      this.work.description = '';
      this.work.text = '';
      this.work.techs = '';
      this.work.photo = '';
      this.renderedImg = '';   
    },
    fillFormWithCurrentWorkData() {
      this.work = {...this.currentWork };
      this.rendedImgUrl = getAbsoluteImgPath(this.currentWork.photo);
    },
    async handlePhotoUpload(e) {
      const file = e.target.files[0];
      this.work.photo = file; 
      try {
        const renderedResult = await renderer(file);
        this.renderedImg = renderedResult;
      } catch (error) {
        this.showTooltip({
          type: "error",
          text: "Ошибка во время обработки файла"
        })
      }
    },
    removeTag(index) {
      this.tagsArray.splice(index, 1);
    }
  }
};
</script>

<style lang="postcss">
  @import "../../styles/mixins.pcss";

.works-form__img{
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  height: 300px;
  width: 100%;
  overflow: hidden;
}
.works-form__pic img{
  display: block;
  width: 100%;
  max-height: 6000px;
}
.upload-avatar__link{
  text-align: center;
  margin-top: 10px;
  position: relative;
}
.works-form__change{
  transition: all 0.3s;
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: block;
}
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
      border-color: transparent;
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
.works-form{
  padding: 0 10px;
  &.reviews-form{
    @include bp-tablets-lg {     
      display: block;
      max-width: 495px;
      margin: 0 auto;
      padding: 0;
    }
    @include tablets{
      padding: 0 20px;
    }
  }  
  &__file{
    width: 50%;
    padding-right: 15px;
    @include bp-tablets-lg {     
      width: 100%;
      padding: 0;
      margin-bottom: 52px;
    }
    @include tablets{
      margin-bottom: 21px;
    }
  }
  .reviews-form__main{
    width: 50%;
    padding-left: 15px;
    @include bp-tablets-lg {     
      width: 100%;
      padding: 0;
    }
  }
  .box-field{
    margin-bottom: 25px;
  }
  .box-field_mb20{
    margin-bottom: 20px;
  }
  textarea.form-control{
    height: 145px;
    @include tablets{
      height: 204px;
    }
  }
  .box-field-btn{
    padding-top: 40px;
    padding-block-end: 10px;
    @include bp-tablets-lg {     
      justify-content: center;
    }
    @include tablets{
      justify-content: flex-end;
    }
  }
}
.upload-file {
  height: 276px;
  background-color: #dee4ed;
  border: 1px dashed #a1a1a1;
  text-align: center;
  padding: 77px 10px 0;
  position: relative;
  @include tablets{
   height: 200px;
   padding-top: 25px;
  }
  &__title{
    opacity: 0.5;
    color: #414c63;
    font-size: 16px;
    font-weight: 600;
    line-height: 34px;
    max-width: 230px;
    margin: 0 auto 19px;
    @include tablets{
     font-size: 14px;
     line-height: 28px;
    }
  }
  input{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 2; 
  }
  .btn-orange{
    height: 50px;
    border-radius: 25px;
  }
  &.filled{
    .upload-file__title{
      display: none;
    }
  }
}
.tag-list-with-remove{
  .tag-list__title{
    background-color: #f4f4f4;
    display: flex;
    align-items: center;
    padding: 5px 10px 5px 18px;
  }
}
.tag-list__remote{
  width: 12px;
  height: 12px;
  display: block;
  margin-left: 10px;
  background: svg-load('remove.svg', fill=#414c63, width=100%, height=100%);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  &:hover{
    background: svg-load('remove.svg', fill=$main-color, width=100%, height=100%);
  }
  @include tablets{
    padding:  0 2px;
  }
}

</style>
  