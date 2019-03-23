import Vue from 'vue';
import Flickity from 'vue-flickity';

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
        
        // any options from Flickity can be used
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
    slide(direction) {
      switch (direction) {
        case "next":
          this.$refs.flickity.next();
          break;
        case "prev":
          this.$refs.flickity.previous();
          break;       
      }
    }
  },
  created() {
    const data = require("../data/reviews.json");
    this.reviews = this.makeArrWithImages(data);
  }
})
