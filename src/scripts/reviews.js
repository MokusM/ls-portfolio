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
  /*created() {
    const data = require("../data/reviews.json");
    this.reviews = this.makeArrWithImages(data);
  }*/
  created() {
    fetch('https://webdev-api.loftschool.com/reviews/106')
        .then((response) => {
            if(response.ok) {
                return response.json();
            }        
            this.$refs.flickity.rerender();
        })
        .then((json) => {
          this.reviews = json;
          console.log(json);
        })
        .catch((error) => {
            console.log(error);
        });
  }
})
