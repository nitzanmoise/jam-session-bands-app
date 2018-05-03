

<template>
<div>

  <header>
    <navbar></navbar>
  </header>

  <router-view/>

</div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
  components:{
    Navbar
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

body {
  font: 15px/1.3 "Open Sans", sans-serif;
  color: #5e5b64;
}
</style>


