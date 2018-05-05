<template>
<div id="app">
  <header>
        <navbar></navbar>
  </header>

        

       <router-view></router-view>
    <footer>
       <Footer></Footer>
   </footer>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

export default {
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
    Footer
  }
};
</script>



