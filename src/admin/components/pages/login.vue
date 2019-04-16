<template lang="pug">
  .modal 
    .modal-overlay
    .modal-content
      a(href="#").modal-content__close(@click.prevent="cancel()")       
      .modal-content__title Авторизация
      form.login-form(@submit.prevent="login")
        .box-field(:class="{error: validation.firstError('user.name')}")
          label.box-field__label Логин
          .box-field__input
            .box-field__icon.user-icon
            input.form-control(
              type="text"
              v-model="user.name"
            )
            .input-error {{ validation.firstError('user.name') }}
        .box-field(:class="{error: validation.firstError('user.password')}")
          label.box-field__label Пароль
          .box-field__input
            .box-field__icon.key-icon              
            input.form-control(
              type="password"
              v-model="user.password"
            )
            .input-error {{ validation.firstError('user.password') }}
        .box-field-btn
          input.btn.btn-orange(
            type="submit"
            value="Отправить"
            :disabled="disableSubmit"            
          )
  



</template>

<script>
import { Validator } from 'simple-vue-validator';
import $axios from "@/requests";
export default {
  mixins: [require("simple-vue-validator").mixin],
  name: "Login",
  validators: {
    "user.name": value =>  {
      return Validator.value(value).required("Введите имя пользователя");
    },
    "user.password": value =>  {
      return Validator.value(value).required("Введите пароль");
    }
  },
  data() {
    return {
      disableSubmit: false,
      user: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      if ((await this.$validate()) === false) return;
      this.disableSubmit = true;
      try {
        const {
          data: { token }
        } = await $axios.post("/login", this.user);
        localStorage.setItem("token", token);
        $axios.defaults.headers["Authorization"] = `Bearer ${token}`;
        this.$router.replace("/");
      } catch (error) {
        console.log(error)
      }
    },
    cancel () {
      window.location.href = '/'
    }
  }
  
};

</script>

<style lang="postcss">
  @import "../../../styles/mixins.pcss";

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
.modal{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.modal-overlay{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url(.../../../../assets/img/overlay-bg.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  &:before{
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(45,60,78,0.9);
    z-index: 1;
  }
}
.modal-content{
  width: 563px;
  max-width: 100%;
  background-color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  z-index: 100;
  padding: 55px 30px;
  z-index: 2;
  @include tablets{
    height: 100%;
    padding-top: 162px;
  }
  &__title{
    color: #414c63;
    font-size: 36px;
    font-weight: 600;
    line-height: 40px;
    text-align: center;
    margin-bottom: 30px;
    @include tablets{
      font-size: 30px;
    }
  }
  &__close{
    position: absolute;
    right: 30px;
    top: 32px;
    background: svg-load('remove.svg', fill=$text-color, width=100%, height=100%);
    width: 22px;
    height: 22px;
    &:hover{
      background: svg-load('remove.svg', fill=$main-color, width=100%, height=100%);
    }
  }
}
.user-icon{
  background: svg-load('user.svg', fill=rgba(65,76,99,0.3), width=100%, height=100%);
  width: 29px;
  height: 30px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}
.key-icon{
  background: svg-load('key.svg', fill=rgba(65,76,99,0.3), width=100%, height=100%);
  width: 29px;
  height: 28px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}
.login-form{
  max-width: 408px;
  margin: 0 auto;
  .box-field-btn{
    justify-content: center;
    padding: 5px 0 0;
    .btn{
      margin:0;
    }
  }
  .box-field__label{
    padding-left: 45px;
    margin-bottom: 7px;
    @include tablets{
      font-size: 16px;;
    }
  }
  .box-field{
    margin-bottom: 35px;
  }
  .form-control{
    padding-left: 45px;
    color: #414c63;
    font-size: 18px;
    font-weight: 700;
    line-height: 48px;
    height: 60px;
  }
}
.box-field__icon {
  position: absolute;
  left: 0;
  top: 12px;
  transition: all .3s;
}
.input-error{
  height: 50px;
  background-color: #cd1515;
  color: white;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  display: block;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  padding: 15px 25px 0;
  white-space: nowrap;
  display: none;
  &:before{
    content: '';
    width: 0; 
    height: 0; 
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;    
    border-bottom: 10px solid #cd1515;
    position: absolute;
    top: -8px;
    left: 50%;
    margin-left: -5px;
  }
}
.error{
  .input-error{
    display: block;
  }
  .form-control{    
    border-bottom-color: #cd1515;    
  }
  .user-icon{
     background: svg-load('user.svg', fill=#cd1515, width=100%, height=100%);
  }
  .key-icon{
    background: svg-load('key.svg', fill=#cd1515, width=100%, height=100%);
  }
}
.btn:disabled{
  background: #ccc;
  background-image: none;
  &:hover{
    background: #ccc;
    background-image: none;
  }
}


</style>
