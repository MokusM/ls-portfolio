<template lang="pug">
    li.skills__item(v-if="editmode === false")
      .skill-name
        span.input-skill {{skill.title}}
      .skill-percent
        span.input-skill {{skill.percent}}
      .skills__links
        a(href="#" @click="editmode = true").pencil-icon  
        a(href="#" @click="removeExistedSkill").trash-icon
    
    li.skills__item(v-else)
      .skill-name(:class="{error: validation.hasError('editedSkill.title')}")
        input(type="text", placeholder="Навык", v-model="editedSkill.title").input-skill
        .input-error {{ validation.firstError('editedSkill.title') }}
      .skill-percent(:class="{error: validation.hasError('editedSkill.percent')}")
        input(type="text", placeholder="0", v-model="editedSkill.percent").input-skill
        .input-error {{ validation.firstError('editedSkill.percent') }}
      .skills__links
        a(href="#" @click="save").tick-icon   
        a(href="#" @click="editmode = false").remove-icon
  
  </template>
  
  <script>
  import { mapActions } from "vuex";
  import { Validator } from 'simple-vue-validator';
  export default {
    mixins: [require("simple-vue-validator").mixin],
    validators: {
      "editedSkill.title": value =>  {
        return Validator.value(value).required("Введите названия скилла");
      },
      "editedSkill.percent": value =>  {
        return Validator.value(value).required("Поле неможет быть пустым").lessThan(101);
      }
    },
    props: {
      skill: Object
    },
    data() {
      return {
        editmode: false,
        editedSkill: {...this.skill}
      }
    },
    methods: {
      ...mapActions("skills", ["removeSkill", "editSkill"]),
      ...mapActions('tooltips', ["showTooltip"]),
      async removeExistedSkill() {
        try {
          await this.removeSkill(this.skill.id);
        } catch (error) {}
      },
      async save() {
        if ((await this.$validate()) === false) return;
        try {
          await this.editSkill(this.editedSkill);
          this.editmode = false;
          this.showTooltip({
            type: "success",
            text: "Навык отредактирован"
          })
        } catch (error) {
          this.showTooltip({
            type: "error",
            text: error.message
          })
        } 
      }
    }
  };
  </script>
  <style>
    .error{
      position: relative;
    }
    .error .input-skill{
      border-bottom-color: #cd1515;
    }
  </style>