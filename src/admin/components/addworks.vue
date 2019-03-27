<template lang="pug">
  .addreviews 
    .addreviews__title Редактирование работы
    .addreviews__form 
      form.reviews-form
        .reviews-form__avatar
          .avatar 
          div Добавить фото
        .reviews-form__main          
          .box-field
            label.box-field__label Название
            .box-field__input
              input.form-control(type="text", value="Ковальчук Дмитрий" required)
              span.bottom-line
          .box-field
            label.box-field__label Ссылка
            .box-field__input              
              input.form-control(type="text", value="Основатель LoftSchool" required)
              span.bottom-line
          .box-field
            label.box-field__label Описание
            .box-field__input
              textarea.form-control(placeholder="Требуется ваша помощь в создании сайта. Интересуют сроки и цена вопроса")
              span.bottom-line
          .box-field
            label.box-field__label Добавление тэга
            .box-field__input              
              input.form-control(type="text", value="Основатель LoftSchool" required)
              span.bottom-line
          .box-field-btn
            input.btn.btn-orange(type="submit", value="Сохранить")

  


</template>

<script>
export default {
  name: "addworks"
};

</script>

<style lang="postcss">
.addreviews {
  margin-bottom: 30px;
  background-color: white;
  box-shadow: 4.1px 2.9px 20px rgba(0, 0, 0, 0.07);
  padding: 20px;
  &__title{
    color: #414c63;
    font-size: 18px;
    font-weight: 700;
    line-height: 34px;
    border-bottom: 1px solid rgba(31,35,45,0.15);
    padding: 0 8px 20px;
    margin-bottom: 45px;
  }
}
.reviews-form{
  display: flex;
  &__avatar{
    width: 240px;
  }
  &__main{
    width: calc(100% - 240px);
    max-width: 611px;
  }
}
.avatar{
  width: 200px;
  height: 200px;
  background-color: #dee4ed;
  border-radius: 50%;
  margin: 5px 11px 22px;
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
  }
  &__row{
    display: flex;
    margin: 0 -15px 35px;
    .box-field{
      padding: 0 15px;
      margin-bottom: 0;
      width: 50%;
    }
  }
  &__input{
    position: relative;
    overflow: hidden;
    cursor: pointer;
    &:hover{
      .bottom-line{
        left: 0;
      }
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
}


.box-field-btn{
  padding-top: 29px; 
  padding-bottom: 29px;    
  text-align: right;
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
  &:hover{
    background-image: linear-gradient(to right, #ff7f00 0%, #ff9d00 100%);
  }
}
</style>
  