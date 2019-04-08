<template lang="pug">
  .addreviews 
    .addreviews__title Редактирование работы
    .addreviews__form 
      form.reviews-form.works-form
        .works-form__file
          .upload-file 
            .upload-file__title Перетащите или загрузите для загрузки изображения
            span.btn.btn-orange ЗАГРУЗИТЬ 
            input(type="file")
        .reviews-form__main
          .box-field
            label.box-field__label Название
            .box-field__input
              input.form-control(type="text", value="Дизайн сайта для авто салона Porsche" required)
          .box-field
            label.box-field__label Ссылка
            .box-field__input              
              input.form-control(type="text", value="https://www.porsche-pulkovo.ru" required)
          .box-field
            label.box-field__label Описание
            .box-field__input
              textarea.form-control(placeholder="Порше Центр Пулково - является официальным дилером марки Порше ")
          .box-field.box-field_mb20
            label.box-field__label Добавление тэга
            .box-field__input              
              input.form-control(type="text", value="Jquery, Vue.js, HTML5" required)
          ul.tag-list.tag-list-with-remove
            li.tag-list__item
              .tag-list__title 
                span HTML
                a(href="#").tag-list__remote
            li.tag-list__item
              .tag-list__title 
                span CSS
                a(href="#").tag-list__remote
            li.tag-list__item
              .tag-list__title 
                span Javascript
                a(href="#").tag-list__remote

          .box-field-btn
            a(type="#").cancel-form Отмена
            input.btn.btn-orange(type="submit", value="Сохранить")

  


</template>

<script>
export default {
  name: "addworks"
};

</script>

<style lang="postcss">
  @import "../../styles/mixins.pcss";
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
  