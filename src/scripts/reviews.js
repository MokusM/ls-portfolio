import Vue from 'vue';
import Flickity from 'vue-flickity';
import axios from 'axios';

new Vue({
  el: "#reviews-slider",
  template: "#reviews-list",

  components: {
    Flickity
  },  
  data() {
    return {
      reviews: [],
      flickityOptions: {
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: true,
        cellAlign: 'left'
      }
    }
  },
  
  methods: {
    makeArrWithImages(data) {
      return data.map(item => {
        const requirePic = require(`../images/content/${item.author_pic}`) ;
        item.author_pic = requirePic;
        return item;
      })
    },
    next() {
      this.$refs.flickity.next();
    },
    
    previous() {
      this.$refs.flickity.previous();
    }
    
  },
  async created() {
    try {
      const response = await axios.get('https://webdev-api.loftschool.com/reviews/106');
      this.reviews = response.data;
    } catch (error) {
      // error handling
    }
  }
})
