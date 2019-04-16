<template lang="pug">
  content.main-content
    div.wrapper
      .title-with-btn
        h2.main-content__title Блок «Обо мне»
        button.add-group(
          @click="showAddingForm = true"
          v-if="showAddingForm === false"
          :showAddingForm = 'showAddingForm'
        )
          .add-btn +
          span Добавить группу 
      ul.admin-layout-list.admin-layout-two-col
        li.admin-layout-list__item(v-if="showAddingForm")         
          skills-add
        li.admin-layout-list__item(
          v-for="category in categories"
          :key="category.id"
        ) 
          skills-group(
            :category="category"
            :skills="filterSkillsByCategoryId(category.id)"
          )
</template>


<script>
import { mapActions, mapState } from "vuex";
export default {
  components: {
    skillsAdd: () => import('components/skills-add.vue'),
    skillsGroup: () => import('components/skills-group.vue')
  },
  data() {
    return {
      showAddingForm: false 
    }
  },
  computed: {
    ...mapState('categories', {
      categories: state => state.categories
    }),
    ...mapState('skills', {
      skills: state => state.skills
    })
  },
  methods: {
    ...mapActions('categories', ['fetchCategories']),
    ...mapActions('skills', ['fetchSkills']),
    filterSkillsByCategoryId(categoryId) {
      return this.skills.filter(skill => skill.category === categoryId);
    }
  },
  async created() {
    try {
      await this.fetchCategories(); 
    } catch (error) {
      alert('Произошла ошибка при загрузке категорий') 
    }
    try {
      await this.fetchSkills(); 
    } catch (error) {
      alert('Произошла ошибка при загрузке скиллов') 
    }
  }
};
</script>

<style lang="postcss">
@import "../../../styles/mixins.pcss";
.main-content{
  background-color: #f7f9fe;
  padding-top: 35px;
  display: block;
  @include bp-tablets-lg{
    padding-top: 24px;
  }
  @include tablets{
    padding-top: 16px;
  }
  &__title{
    margin-bottom: 38px;
    @include bp-tablets-lg{
      margin-bottom: 29px;
    }
  }
  h2{
    color: #414c63;
    font-size: 21px;
    font-weight: 700;
    line-height: 34px;
    padding: 15px 0;
    @include tablets{
      font-size: 18px;
    }
  }
}
.admin-layout-two-col{
  @include bp-tablets-lg{
    margin: 0 -10px;
  }
  .admin-layout-list__item{
      width: 50%;
      @include bp-tablets-lg{
       padding: 0 10px;
      }
      @include tablets{
        padding: 0;
      }
      @include tablets{
        width: 100%;
      }
  }
  .admin-layout-list__cont{
    padding: 13px 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    @include tablets{
      padding: 5px 0;
    }
  }
  .skill{
    display: flex;
    height: 100%;
    flex-direction: column;
  }
  .skill__add{
    margin-top: auto;
  }
}
.skill-title{
  border-bottom: 1px solid rgba(31,35,45,0.15);
  display: flex;
  align-items: center;    
  justify-content: space-between;
  padding:0 5px 14px 10px;
  @include tablets{
    padding: 10px 18px;
  }
  &__links{
    padding-top: 5px;
    display: flex;
    align-items: center;
    .remove-icon{
      margin-left: 19px;
      @include tablets{
        margin-left: 9px;
      }  
    }
    a:last-child{
      margin-left: 18px;
    }
  }
  .input-skill{
    height: 48px;
    line-height: 48px;
    @include tablets{
      max-width: calc(100% - 50px);
    }
  }
}
.input-skill{
  color: #414c63;
  font-size: 18px;
  font-weight: 600;
  line-height: 32px;
  border: none;
  border-bottom: 1px solid transparent;
  display: block;
  width: 100%;
  height: 32px;
  max-width: 273px;  
  &:disabled{
    border-bottom-color: transparent;
    background-color: transparent;
  }
  @include tablets{
    font-size: 16px;
  }
}
input.input-skill{
  border-bottom-color: #1f232d;
}
.add-skill{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .input-skill{
    font-size: 16px;
    line-height: 32px;
    height: 48px;
    padding: 0 15px;
  }
  .add-btn{
    margin-left: 30px;
    @include tablets{
      margin-left: 15px;
    }
  }
  .skill-name{
    @include tablets{
      max-width: calc(100% - 160px);
    }
   
  }
  .skill-percent{
    width: 79px;
    margin-left: 5px;
    &:before{
      top: 8px;
    }
  }
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
.skill{
  &__main{
    padding: 17px 6px 17px 10px;
    @include tablets{
      padding: 18px 20px;
    }
  }
  &__add{
    padding: 0 9px;
  }
}
.skills{
  &__item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 11px;
    &:last-child{
      margin-bottom: 0;
    }
  }
  &__links{
    display: flex;
    &*{
      display: block;
    }
    a:last-child{
      margin-left: 18px;
    }
  }
  .input-skill{
    font-size: 16px;
    font-weight: 400;
    line-height: 32px;
  }
  .skill-name{
    @include bp-tablets-lg{
     max-width: calc(100% - 130px);
    }
  }
  .skill-percent{
    width: 61px;
    margin: 0 58px 0 auto;
    @include bp-tablets-lg{
      margin-right: 30px;
    }
    .input-skill{
      @include bp-tablets-lg{
        padding-right: 15px;
      }
    }
  }
}
.title-with-btn{
  display: flex;
  align-items: center;
  margin-bottom: 38px;
  @include bp-tablets-lg{
    margin-bottom: 28px;
  }
  @include tablets{
    flex-direction:column;
    align-items: flex-start;
  }
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
    @include tablets{
      font-size: 14px;
    }
  }
  .add-btn{
    width: 20px;
    height: 20px;
    font-size: 15px;
    line-height: 20px;
  }
}
.tick-icon{
  background: svg-load('tick.svg', fill=#00d70a, width=100%, height=100%);
  width: 16px;
  height: 14px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}
.remove-icon{
  background: svg-load('remove.svg', fill=#bf2929, width=100%, height=100%);
  width: 14px;
  height: 12px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}
.pencil-icon{
  background: svg-load('pencil.svg', fill=#a0a5b1, width=100%, height=100%);
  width: 16px;
  height: 15px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}
.trash-icon{
  background: svg-load('trash.svg', fill=#a0a5b1, width=100%, height=100%);
  width: 18px;
  height: 15px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}
</style>
