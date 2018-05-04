<template>
<div id="app">
    <header>
      <navbar></navbar>
    </header>

    <router-view></router-view>
   <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Home from './Home.vue'
import Footer from '../components/Footer.vue'
export default {
  
  
  components: { 
    Navbar,
    Home,
    Footer
  }
};
</script>



