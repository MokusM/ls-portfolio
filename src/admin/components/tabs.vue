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
.tabs-list{
  display: flex;
  list-style: none;
  padding: 0px 39px ;
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
    color: #383bcf;
    border-bottom: 3px solid #383bcf;
  }
  &:hover{
    color: #383bcf;
  }
}

</style>
