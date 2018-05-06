<template>
<div id="app">
  <header>
        <navbar :loginModal="loginModal"  @loginModal="loginModal = true"></navbar>
  </header>
       <router-view></router-view>
       <div>

       <login v-if="loginModal" @close="loginModal = false" ></login>
       </div>
       <div>
    <footer>
       <Footer></Footer>
   </footer>
   </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import login from '../components/Login.vue'
export default {
  data (){
    return {
      loginModal: false
    }
  },
  methods: {
    filterGroups(filter) {
      this.$store.commit({
        type: "setGroupFilter",
        filter: filter
      });
      this.$store.dispatch({ type: "loadGroups" });
    }
  },

  components: {
    Navbar,
    Footer,
    login
  }
};
</script>

<style scoped>
#app{
  display: flex;
  flex-flow: column wrap;

}


</style>



