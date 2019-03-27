<template lang="pug">
  .main-wrapper
    <Header />
    <Tabs />
    <router-view />
    <!--<Login v-if="auth"/> -->   
</template>

<script>
import Header from "./components/Header";
import Tabs from "./components/tabs";
import Login from "./components/Login";
  export default {
    data() {
      return{
        auth: false
      }
    },
    components: {
      Header,
      Tabs,
      Login
    }
  }

</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
@import "normalize.css";
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
  max-width: 1570px;
  margin: 0 auto;
  padding:  0 60px;
}


</style>
      