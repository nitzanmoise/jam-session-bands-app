<template>
<div id="app">
  <header>
        <navbar></navbar>
  </header>
         <Header @filtered="filterGroups"></Header>

        <home></home>

       <router-view></router-view>
    <footer>
       <Footer></Footer>
   </footer>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Home from "./Home.vue";
import Header from "../components/Header.vue";
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
    Home,
    Footer,
    Header
  }
};
</script>



