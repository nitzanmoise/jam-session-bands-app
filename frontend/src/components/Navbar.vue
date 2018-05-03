<template>

  <nav v-bind:class="active" v-on:click.prevent>
    <router-link tag="a" class="home" v-on:click.native="makeActive('home')" to="/">Home</router-link>
    <router-link tag="a" class="join" v-on:click.native="makeActive('join')" to="/join">Join</router-link>
    <router-link tag="a" class="login" v-on:click.native="makeActive('login')" to="/login">Log In</router-link>
    <router-link tag="a" class="loginGuest" v-on:click.native="makeActive('loginGuest')" to="/">Log In as a Guest</router-link>
  </nav>

  
</template>

<script>
export default {
  data() {
    return {
      active: "home"
    };
  },
  methods: {
    makeActive: function(item) {
      this.active = item;
    }
  }
};
</script>

<style scoped>

a,
a:visited {
  outline: none;
  color: #389dc1;
}

a:hover {
  text-decoration: none;
}

section,
footer,
header,
aside,
nav {
  display: block;
}

/*-------------------------
    The menu
--------------------------*/

nav {
  display: inline-block;
  margin: 0;
  background: linear-gradient(rgb(0, 0, 0), rgb(105, 105, 100));
  box-shadow: 0 1px 1px rgb(10, 0, 0);
  border-radius: 2px;
  width: 100%;
}

nav a {
  display: inline-block;
  padding: 18px 30px;
  color: #fff !important;
  font-weight: bold;
  font-size: 16px;
  text-decoration: none !important;
  line-height: 1;
  text-transform: uppercase;
  background-color: transparent;
  transition: background-color 0.25s;
}

nav a:first-child {
  border-radius: 2px 0 0 2px;
}

nav a:last-child {
  border-radius: 0 2px 2px 0;
}

nav.home .home,
nav.join .join,
nav.login .login,
nav.loginGuest .loginGuest {
  background: linear-gradient(rgb(105, 105, 100),rgb(0, 0, 0));
}
</style>

