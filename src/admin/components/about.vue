<template lang="pug">
  content.main-content
    div.wrapper
      .title-with-btn
        h2.main-content__title Блок «Обо мне»
        button.add-group
          .add-btn +
          span Добавить группу
      ul.admin-layout-list.admin-layout-two-col
        .admin-layout-list__item
          .admin-layout-list__cont
            .skill
              .skill-title
                input(placeholder="Название новой группы").input-skill
                .skill-title__links
                  a(href="#").lick-icon                
                    svgicon(icon="tick", width="16", height="14", color="#00d70a")
                  a(href="#").lick-icon                
                    svgicon(icon="remove", width="12", height="14", color="#bf2929")                          
              .skill__main
              .skill__add
                form.add-skill
                  .skill-name
                    input(type="text", placeholder="Новый навык").input-skill
                  .skill-percent
                    input(type="text", placeholder="Новый навык", value="100").input-skill
                  button(type="submit").add-btn +
        .admin-layout-list__item
          .admin-layout-list__cont
            .skill
              .skill-title
                input(placeholder="Название новой группы", value="Workflow").input-skill
                .skill-title__links
                  a(href="#").lick-icon                
                    svgicon(icon="tick", width="16", height="14", color="#00d70a")
                  a(href="#").lick-icon                
                    svgicon(icon="remove", width="12", height="14", color="#bf2929")                          
              .skill__main
                ul.skills
                  .skills__item 
                    .skill-name
                      input(type="text", placeholder="Новый навык", value="Git", disabled).input-skill
                    .skill-percent
                      input(type="text", placeholder="Новый навык", value="100", disabled).input-skill
                    a(href="#")                
                      svgicon(icon="pencil", width="13", height="13", color="#a0a5b1")
                    a(href="#")                
                      svgicon(icon="trash", width="13", height="15", color="#a0a5b1")
                  .skills__item 
                    .skill-name
                      input(type="text", placeholder="Новый навык", value="Terminal", disabled).input-skill
                    .skill-percent
                      input(type="text", placeholder="Новый навык", value="90", disabled).input-skill
                    a(href="#")                
                      svgicon(icon="pencil", width="13", height="13", color="#a0a5b1")
                    a(href="#")                
                      svgicon(icon="trash", width="13", height="15", color="#a0a5b1")
                  .skills__item 
                    .skill-name
                      input(type="text", placeholder="Новый навык", value="Gulp", disabled).input-skill
                    .skill-percent
                      input(type="text", placeholder="Новый навык", value="80", disabled).input-skill
                    a(href="#")                
                      svgicon(icon="pencil", width="13", height="13", color="#a0a5b1")
                    a(href="#")                
                      svgicon(icon="trash", width="13", height="15", color="#a0a5b1")
                  .skills__item 
                    .skill-name
                      input(type="text", placeholder="Новый навык", value="Webpack", disabled).input-skill
                    .skill-percent
                      input(type="text", placeholder="Новый навык", value="80", disabled).input-skill
                    a(href="#")                
                      svgicon(icon="pencil", width="13", height="13", color="#a0a5b1")
                    a(href="#")                
                      svgicon(icon="trash", width="13", height="15", color="#a0a5b1")
                    




                        
              .skill__add
                form.add-skill
                  .skill-name
                    input(type="text", placeholder="Новый навык").input-skill
                  .skill-percent
                    input(type="text", placeholder="Новый навык", value="100").input-skill
                  button(type="submit").add-btn +



</template>

<script>
import '../assets/svg-icons/tick';
import '../assets/svg-icons/remove';
import '../assets/svg-icons/pencil';
import '../assets/svg-icons/trash';
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
.admin-layout-two-col{
  .admin-layout-list__item{
      width: 50%;
  }
  .admin-layout-list__cont{
    padding: 13px 20px;
  }
}
.skill-title{
  border-bottom: 1px solid rgba(31,35,45,0.15);
  display: flex;
  align-items: center;    
  justify-content: space-between;
  padding:0 10px 14px;
  &__links{
    padding-top: 8px;
    display: flex;
    align-items: center;
    margin: 0 -9px;
    a{
      padding: 0 9px;
      display: block;
    }
  }
}
.input-skill{
  color: #414c63;
  font-size: 18px;
  font-weight: 600;
  line-height: 32px;
  border: none;
  border-bottom: 1px solid #1f232d;
  display: block;
  width: 100%;
  height: 48px;
  max-width: 273px;  
  &:disabled{
    border-bottom-color: transparent;
    background-color: transparent;
  }
}
.add-skill{
  margin: 0 -5px;
  display: flex;
}
.add-btn{
  width: 40px;
  height: 40px;
  background-color: white;
  background-image: linear-gradient(90deg,#ea7400 0,#f29400);
  color: white;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  border-radius: 50%;
  padding: 0;
}
.skill-percent{
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
.skills{
  &__item{
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  .input-skill{
    font-size: 16px;
    font-weight: 400;
    line-height: 32px;
  }
}
.title-with-btn{
  display: flex;
  align-items: center;
  margin-bottom: 38px;
  h2{
     margin-bottom: 0px;
     margin-right: 56px;
  }
}
.add-group{
  background: transparent;
  padding: 0;
  border: none;
  display: flex;
  align-items: center;
  span{
    color: #ea7400;
    font-size: 16px;
    font-weight: 600;
    line-height: 34px;
    display: inline-block;
    margin-left: 15px;
  }
  .add-btn{
    width: 20px;
    height: 20px;
    font-size: 15px;
    line-height: 20px;
  }
}
</style>
