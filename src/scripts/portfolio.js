import Vue from 'vue';
import axios from 'axios';

const btns = {
  template: "#slider-btns"
}

const thumbs = {
  template: "#slider-thumbs",
  props: {
    works: Array,
    currentWork: Object
  }
}
const display = {
  template: "#slider-display",
  components: {
    btns,
    thumbs
  },
  props: {
    works: Array,
    currentWork: Object,
    currentIndex: Number
  } 
}


const tags = {
  template: "#slider-tags",
  props: {
    tagsArray: Array,
    currentWork: Object
  }
}
const info = {
  template: "#slider-info",
  components: {
    tags
  },
  props: {
    currentWork: Object
  },
  computed: {
    tagsArray() {
      return this.currentWork.techs.split(',')
    }
  }
}
new Vue({
  el: "#slider-component",
  template: "#slider-container",
  components: {
    display,
    info
  },
  data() { 
    return {
      works: [],
      currentIndex: 0
    }
  },
  computed: {
    currentWork() {
      return this.works[this.currentIndex];
    }
  },
  watch: {
    currentIndex(value) {
      this.makeInfiniteLoopForCurIndex(value);
    }
  },
  methods: {
    makeInfiniteLoopForCurIndex(value) {
      const worksAmount = this.works.length - 1;
      if (value > worksAmount) this.currentIndex = 0;
      if (value < 0) this.currentIndex = worksAmount;
    },
    makeArrWithImages(data) {
      return data.map(item => {
        const requirePic = require(`../images/content/${item.photo}`) ;
        item.photo = requirePic;
        return item;
      })
    },
    hadleSlide(direction) {
      switch (direction) {
        case 'next' :
          this.currentIndex++;
          break;
        case 'prev' :
          this.currentIndex--;
          break;              
      }
    },
    activateImage(imageIndex) {
      this.currentIndex = parseInt(imageIndex);
    }
  },
  async created() {
    try {
      const works = await axios.get('https://webdev-api.loftschool.com/works/106');
      this.works = works.data;
    } catch (error) {
      // error handling
    }
  }  
})