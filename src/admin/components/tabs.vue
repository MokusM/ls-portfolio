<template lang="pug"> 
  div.wrapper
    ul.tabs-list
      li.tabs-list__item(v-for="tab in tabs")
        router-link(
          :data-text="tab.title" 
          :to="tab.href"
          exact-active-class="active"
        ).tabs-list__link
       
       


</template>

<script>
export default {
  name: "Tabs",
  data() {
    return {
      tabs: [
        { title: "Обо мне", href: "/" },
        { title: "Отзывы", href: "/reviews" },
        { title: "Работы", href: "/works" }
      ]
    };
  }
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
  &.active{
    color: #ea7400;
    border-bottom: 3px solid #ea7400;
  }
  &:before {
    content: attr(data-text);
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
