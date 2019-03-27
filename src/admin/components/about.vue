<template lang="pug">
  content.main-content
    div.wrapper
      h2.main-content__title Блок «Обо мне»


</template>

<script>
export default {
  name: "About"
};

</script>

<style>
.main-content{
  background-color: #f7f9fe;
  padding-top: 35px;
  display: block;
  &__title{
    margin-bottom: 38px;
  }
  h2{
    color: #414c63;
    font-size: 21px;
    font-weight: 700;
    line-height: 34px;
    padding: 15px 0;
  }
}
</style>
