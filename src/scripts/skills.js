import Vue from 'vue';
import axios from 'axios';

const skill = {
  template: "#skill",
  props: {
    skill: Object
  },
  methods: {
    drawColoredCircle(){
      const circle = this.$refs['color-circle'];
      const dashArray = parseInt(
        getComputedStyle(circle).getPropertyValue('stroke-dasharray')
      );
      const percent = (dashArray / 100) * (100 - this.skill.percent);
      circle.style.strokeDashoffset = percent;
    }
  },
  mounted() {
    this.drawColoredCircle();
  }
}

const skillsRow = {
  template: "#skills-row",
  components: {
    skill
  },
  props: {
    skills: Array,
    category: Object
  }
}

new Vue({
  el: "#skills-component",
  template: "#skills-list",
  components: {
    skillsRow
  },  
  data() {
    return {
      skills: {},
      categories: {}
    }
  },




  async created() {
    try {
      const categories = await axios.get('https://webdev-api.loftschool.com/categories/106');
      const response = await axios.get('https://webdev-api.loftschool.com/skills/106');      
      this.skills = response.data;
      this.categories = categories.data;
    } catch (error) {
      // error handling
    }
  }
})