<template lang="pug">
  .main-wrapper
    app-header(v-if="isLoggedIn")
    tabs(v-if="isLoggedIn")
    router-view
    tooltips
    .preloader(v-if="!loaded")
      .preloader-list 
        .preloader-list__item
        .preloader-list__item
        .preloader-list__item
        .preloader-list__item
        .preloader-list__item      
</template>

<script>
  import { mapMutations,mapState } from 'vuex'
  export default {
    data() {
      return{
        isLoggedIn: true
      }
    },
    computed: {...mapState(['loaded'])},
    components: {
      appHeader: () => import("components/header"),
      tabs: () => import("components/tabs"),
      tooltips: () => import("components/tooltips")
    },
    methods: {
      ...mapMutations(['setLoaded']),
      cancelModal () {
        this.auth = false;
      }
    },
    mounted () {
      this.setLoaded(true)
    },
  }

</script>

<style lang="postcss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
@import "normalize.css";
@import "../styles/mixins.pcss";
html {
 font-size: 16px;
}
body,
html {
  height: 100%;
}

body {
  font-family: 'Open Sans', Helvetica, sans-serif;
  font-size: 16px;
  line-height: 1.42;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #ffffff;
}




button {
  border: 0;
  cursor: pointer;
}

* {
  box-sizing: border-box;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
  margin: 0;
}

p {
  margin: 0;
  padding: 0;
}

button[type="button"] {
  cursor: pointer;
  background-color: transparent;
}

a {
  color: inherit;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s;
}

img {
  display: block;
  max-width: 100%;
  max-height: 100%;
}
.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding:  0 60px;
  overflow: hidden;
  @include bp-tablets-lg{
    padding: 0 30px;
  }
  @include tablets{
    padding: 0 20px;
  }
}

.preloader{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 1000;
}
.preloader-list{
  width: 250px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  &__item{
    width: 33px;
    height: 33px;
    position: relative;
    display: block;
    -webkit-transform-origin: -50% center;
    transform-origin: -50% center;
    border-radius: 15%;
    &:after{
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      background-color: #f29400;
      border-radius: 15%;
      box-shadow: 0px 0px 10px 0px rgba(242, 148, 0, 0.4);
    }
    &:nth-child(1){
      animation: slide 1.5s ease-in-out infinite alternate;
      &:after{        
        background-color: #ca6400;
        animation: color-change 1.5s ease-in-out infinite alternate;
      }
    }
    &:nth-child(2){
      animation: flip-1 1.5s ease-in-out infinite alternate;
      &:after{
        animation: squidge-1 1.5s ease-in-out infinite alternate;
        background-color: #d76b00;
      }
    }
    &:nth-child(3){
      animation: flip-2 1.5s ease-in-out infinite alternate;
      &:after{
        animation: squidge-2 1.5s ease-in-out infinite alternate;
        background-color: #e06f00;
      }
    }
    &:nth-child(4){
      animation: flip-3 1.5s ease-in-out infinite alternate;
      &:after{
        animation: squidge-3 1.5s ease-in-out infinite alternate;
        background-color: #f59600;
      }
    }
    &:nth-child(5){
      animation: flip-4 1.5s ease-in-out infinite alternate;      
      &:after{
        background-color: #ff9c00;
        animation: squidge-4 1.5s ease-in-out infinite alternate;
      }
    }
  }
}
@keyframes slide{
	0% { 
    background-color: #ca6400; 
    transform: translatex(0vw); 
  }
	100% { 
    background-color: #ff9c00; 
    transform: translatex(calc(250px - 33px * 1.25)); 
  }
}

@keyframes color-change{
	0% { background-color: #ca6400; }
	100% { background-color: #ff9c00; }
}

@keyframes flip-1 {
  0%, 15% {
    transform: rotate(0);
  }
  35%, 100% {
    transform: rotate(-180deg);
  }
}
@keyframes squidge-1 {
  5% {
    transform-origin: center bottom;
    transform: scalex(1) scaley(1);
  }
  15% {
    transform-origin: center bottom;
    transform: scalex(1.3) scaley(0.7);
  }
  25%, 20% {
    transform-origin: center bottom;
    transform: scalex(0.8) scaley(1.4);
  }
  55%, 100% {
    transform-origin: center top;
    transform: scalex(1) scaley(1);
  }
  40% {
    transform-origin: center top;
    transform: scalex(1.3) scaley(0.7);
  }
}
@keyframes flip-2 {
  0%, 30% {
    transform: rotate(0);
  }
  50%, 100% {
    transform: rotate(-180deg);
  }
}
@keyframes squidge-2 {
  20% {
    transform-origin: center bottom;
    transform: scalex(1) scaley(1);
  }
  30% {
    transform-origin: center bottom;
    transform: scalex(1.3) scaley(0.7);
  }
  40%, 35% {
    transform-origin: center bottom;
    transform: scalex(0.8) scaley(1.4);
  }
  70%, 100% {
    transform-origin: center top;
    transform: scalex(1) scaley(1);
  }
  55% {
    transform-origin: center top;
    transform: scalex(1.3) scaley(0.7);
  }
}
@keyframes flip-3 {
  0%, 45% {
    transform: rotate(0);
  }
  65%, 100% {
    transform: rotate(-180deg);
  }
}
@keyframes squidge-3 {
  35% {
            transform-origin: center bottom;
            transform: scalex(1) scaley(1);
  }
  45% {
            transform-origin: center bottom;
            transform: scalex(1.3) scaley(0.7);
  }
  55%, 50% {
            transform-origin: center bottom;
            transform: scalex(0.8) scaley(1.4);
  }
  85%, 100% {
            transform-origin: center top;
            transform: scalex(1) scaley(1);
  }
  70% {
            transform-origin: center top;
            transform: scalex(1.3) scaley(0.7);
  }  
}
@keyframes flip-4 {
  0%, 60% {
            transform: rotate(0);
  }
  80%, 100% {
            transform: rotate(-180deg);
  }
}
@keyframes squidge-4 {
  50% {
            transform-origin: center bottom;
            transform: scalex(1) scaley(1);
  }
  60% {
            transform-origin: center bottom;
            transform: scalex(1.3) scaley(0.7);
  }
  70%, 65% {
            transform-origin: center bottom;
            transform: scalex(0.8) scaley(1.4);
  }
  100%, 100% {
            transform-origin: center top;
            transform: scalex(1) scaley(1);
  }
  85% {
            transform-origin: center top;
            transform: scalex(1.3) scaley(0.7);
  }
}

</style>
      