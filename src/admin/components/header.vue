<template lang="pug">
  header.header
    div.wrapper.wrapper-flex
      <User />
      span.header__title Панель администрирования
      a(href="#").logout Выйти


</template>

<script>
  import User from "./user";
  export default {
    name: "Header",
    components: {
      User
    }
  }
</script>

<style lang="postcss">
.header{
  background-color: #3e3e59;
  background-image: linear-gradient(to right, #3e3e59 0%, #454573 100%);
  &__title{
    opacity: 0.5;
    color: white;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    margin: 0 auto 0 27px;
    padding-top: 4px;
  }
}
.wrapper-flex{
  display: flex;
  justify-content: space-between;
  align-items: center;     
  height: 80px; 
}
.logout{
  opacity: 0.7;
  color: white;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-decoration: underline;
  &:hover{
    opacity: 1;
    text-decoration: none;
  }
}
</style>
