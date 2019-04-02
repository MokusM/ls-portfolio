<template lang="pug">
  .modal 
    .modal-overlay(@click.stop="cancel()")
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
import axios from 'axios';
export default {
  mixins: [require("simple-vue-validator").mixin],
  name: "Login",
  props: {
    cancel: Function
  },
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
        axios
          .post("http://webdev-api.loftschool.com/login", {
            name: this.user.name,
            password: this.user.password
          })
          .then(responce => {
            /*const report = JSON.stringify(responce, null, 2);
            console.log(report);*/
            responce.header("Access-Control-Allow-Origin", "*");
            responce.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            const token = responce.data.token
            localStorage.setItem('user-token', token) // store the token in localstorage
            //commit(AUTH_SUCCESS, token)
            // you have your token, now log in your user :)
           // dispatch(USER_REQUEST)
            resolve(responce)
          });
      } catch (error) {
         console.log(error)
      }

    }
  }
};

</script>

<style lang="postcss">
  @import "../../styles/mixins.pcss";
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
  background-image: url(.../../../assets/img/overlay-bg.jpg);
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
