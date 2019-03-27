<template lang="pug">
  content.main-content
    div.wrapper
      h2.main-content__title Блок «Обо мне»
      ul.admin-layout-list
        .admin-layout-list__item
          .admin-layout-list__cont
            .skill
              .skill__title
                input(value="Frontend", placeholder="Название новой группы", disabled).input-skill
                a(href="#")                
                  svgicon(icon="pencil", width="22", height="18", color="#414c63")                          
              .skill__main

              .skill__add
                form.add-skill
                  .add-skill__name
                    input(type="text", placeholder="Новый навык").input-skill
                  .add-skill__percent
                    input(type="text", placeholder="Новый навык", value="100").input-skill
                  button(type="submit").add-skill__btn +



</template>

<script>
import '../assets/svg-icons/pencil';
export default {
  name: "About",
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
.skill{
  &__title{
    border-bottom: 1px solid rgba(31,35,45,0.15);
    display: flex;
    justify-content: space-between;
  }
}
.input-skill{
  color: #414c63;
  font-size: 16px;
  font-weight: 400;
  line-height: 32px;
  border: none;
  border-bottom: 1px solid #1f232d;
  display: block;
  width: 100%;
  &:disabled{
    border-bottom-color: transparent;
    background-color: transparent;
  }
}
.add-skill{
  margin: 0 -5px;
  display: flex;
  &__name{
    padding-right: 5px;
  }
  &__percent{
    padding-left: 5px;
    position: relative;
    .input-skill{
      padding-right: 25px;
    }
    &:before{
      content: "%";
      position: absolute;
      right: 0;
      opacity: 0.7;
      color: #414c63;
      font-size: 16px;
      font-weight: 400;
      line-height: 32px;
    }
  }
  &__btn{
    width: 40px;
    height: 40px;
    background-color: white;
    background-image: linear-gradient(to right, #006aed 0%, #3f35cb 100%);
    color: white;
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    border-radius: 50%;
    padding: 0;
  }
}
</style>
