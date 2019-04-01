<template lang="pug"> 
  div.wrapper
    ul.tabs-list
      li.tabs-list__item
        router-link(to="/about-me").tabs-list__link Обо мне
      li.tabs-list__item
        router-link(to="/works").tabs-list__link Работы
      li.tabs-list__item
        router-link(to="/reviews").tabs-list__link Отзывы
       
       


</template>

<script>
export default {
  name: "Tabs"
};

</script>

<style lang="postcss">
@import "../../styles/mixins.pcss";
.tabs-list{
  display: flex;
  list-style: none;
}
.tabs-list__link{
  color: #414c63;
  font-size: 16px;
  font-weight: 400;
  line-height: 36px;
  text-decoration: none;
  display: block;
  padding: 19px 30px 18px;
  border-bottom: 3px solid transparent;
  &.is-active{
    color: #ea7400;
    border-bottom: 3px solid #ea7400;
  }
  &:hover{
    color: #ea7400;
  }
  @include tablets{
    font-size: 14px;
    padding: 19px 19px 18px;
  }
}

</style>
