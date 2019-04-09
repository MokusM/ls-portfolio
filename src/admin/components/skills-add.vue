<template lang="pug">
  .admin-layout-list__cont
    .skill
      .skill-title(:class="{error: validation.hasError('skillTitle')}")
        input(placeholder="Название новой группы" v-model="skillTitle" required).input-skill
        .input-error {{ validation.firstError('skillTitle') }}
        .skill-title__links
          a(href="#" @click.prevent="addSkillGroup").tick-icon                
          a(href="#" @click.prevent="hideAddingForm").remove-icon                         
      .skill__main
      .skill__add.blocked
        form.add-skill
          .skill-name
            input(type="text", placeholder="Новый навык").input-skill
          .skill-percent
            input(type="text", placeholder="Новый навык").input-skill
          button(type="submit").add-btn +
</template>

<script>
import { mapActions } from "vuex";
import { Validator } from 'simple-vue-validator';
export default {
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "skillTitle": value =>  {
      return Validator.value(value).required("Введите названия скилла");
    }
  },
  data() {
    return {
      skillTitle: ""
    };
  },
  methods: {
    ...mapActions("categories", ["addNewSkillGroup"]),
    ...mapActions('tooltips', ["showTooltip"]),
    async addSkillGroup() {
      if ((await this.$validate()) === false) return;
      try {
        await this.addNewSkillGroup(this.skillTitle);
        this.skillTitle = "";
        this.showTooltip({
          type: "success",
          text: "Новая категория добавлена"
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



<style lang="postcss">
.skill__add.blocked {
  opacity: 0.5;
  filter: grayscale(100%);
  pointer-events: none;
  user-select: none;
}
</style>