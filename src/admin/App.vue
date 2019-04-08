<template lang="pug">
  .main-wrapper
    <Header v-if="isLoggedIn"/>
    <Tabs v-if="isLoggedIn"/>
    <router-view v-if="isLoggedIn"/>
    <Login :cancel="cancelModal" v-if="!isLoggedIn"/>   
</template>

<script>
import Header from "./components/Header"
import Tabs from "./components/tabs"
import Login from "./components/Login"
import PageNotFound from "./components/PageNotFound"

  export default {
    data() {
      return{
        auth: true
      }
    },
    components: {
      Header,
      Tabs,
      Login
    },
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods: {
      cancelModal () {
        this.auth = false;
      }
    },
    created: function () {
      this.$http.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch(logout);
            alert('неверный пароль')
          }
          throw err;
        });
      });
    }
  }

</script>

<style>
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
  max-width: 1570px;
  margin: 0 auto;
  padding:  0 60px;
  @include bp-tablets-lg{
    padding: 0 30px;
  }
  @include tablets{
    padding: 0 20px;
  }
}


</style>
      