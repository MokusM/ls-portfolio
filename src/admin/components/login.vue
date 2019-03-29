<template lang="pug">
  .modal 
    .modal-overlay
    .modal-content
      a(href="#").modal-content__close
        svgicon(icon="remove", width="20", height="20", color="#414c63")
      .modal-content__title Авторизация
      form.login-form
        .box-field
          label.box-field__label Логин
          .box-field__input
            input.form-control(type="text", value="Terminator_2000" required)
            span.bottom-line
        .box-field
          label.box-field__label Пароль
          .box-field__input              
            input.form-control(type="password", value="111111111111" required)
            span.bottom-line
        .box-field-btn
          input.btn.btn-orange(type="submit", value="Отправить")
  



</template>

<script>

export default {
  name: "Login",
};

</script>

<style lang="postcss">
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
  background-color: rgba(45,60,78,0.9);
}
.modal-content{
  width: 563px;
  background-color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  z-index: 100;
  padding: 55px 30px;
  &__title{
    color: #414c63;
    font-size: 36px;
    font-weight: 600;
    line-height: 40px;
    text-align: center;
    margin-bottom: 30px;
  }
  &__close{
    position: absolute;
    right: 30px;
    top: 32px;
  }
}
.login-form{
  max-width: 408px;
  margin: 0 auto;
  .box-field-btn{
    text-align: center;
    padding: 5px 0 0;
  }
  .box-field__label{
    padding-left: 45px;
    margin-bottom: 7px;
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

</style>
