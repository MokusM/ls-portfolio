<template lang="pug">
  .admin-layout-list__cont
    .skill
      .skill-title(v-if="categoryTitleDisabled === true")     
        span.input-skill {{ category.category }}  
        .skill-title__links
          a(href="#" @click.prevent="categoryTitleDisabled = false").pencil-icon
          a(href="#" @click="removeExistedCategory").trash-icon
      .skill-title(v-else)     
        input(placeholder="Название новой группы", v-model="category.category").input-skill  
        .skill-title__links
          a(href="#" @click.prevent="categoryTitleDisabled = true").tick-icon                        
          a(href="#" @click.prevent="categoryTitleDisabled = true" v-if="categoryTitleDisabled === false").remove-icon
      .skill__main 
        ul.skills
          skills-item(
            v-for="skill in skills"
            :key="skill.id"
            :skill="skill"
          )
      .skill__add
        .add-skill
          .skill-name(:class="{error: validation.hasError('skill.title')}")
            input(type="text", placeholder="Новый навык" v-model="skill.title").input-skill
            .input-error {{ validation.firstError('skill.title') }}
          .skill-percent(:class="{error: validation.hasError('skill.percent')}")
            input(type="text", v-model="skill.percent").input-skill
            .input-error {{ validation.firstError('skill.percent') }}
          button(type="submit" @click="addNewSkill").add-btn +
    
</template>
  
<script>
  import { mapActions } from "vuex";
  import { Validator } from 'simple-vue-validator';
  export default {
    mixins: [require("simple-vue-validator").mixin],
    validators: {
      "skill.title": value =>  {
        return Validator.value(value).required("Введите названия скилла");
      },
      "skill.percent": value =>  {
        return Validator.value(value).required("Поле неможет быть пустым").lessThan(101);
      }
    },
    props: {
      category: Object,
      skills: Array,
    },
    data() {
      return {
        skill: {
          category: this.category.id,
          title: "",
          percent: ""
        },
        categoryTitleDisabled: true
      }
    },
    components: {
      skillsItem: () => import("components/skills-item.vue")
    },
    methods: {
      ...mapActions('skills', ['addSkill']),
      ...mapActions('categories', ['removeCategory']),
      async addNewSkill() {
        if ((await this.$validate()) === false) return;
        try {
          await this.addSkill(this.skill);
          this.skill.title = '';
          this.skill.percent = '';
        } catch (error) {
          // error 
        }
      },
      async removeExistedCategory() {
        try {
          await this.removeCategory(this.category.id);
        } catch (error) {}
      },
    }
  }
</script>