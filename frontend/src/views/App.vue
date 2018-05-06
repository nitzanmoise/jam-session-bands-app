<template>
<div id="app">
  <header>
        <nav-Bar :loginModal="loginModal"  @loginModal="loginModal = true" :joinModal="joinModal"  @joinModal="joinModal = true" ></nav-Bar>
  </header>
       <router-view></router-view>
       <div>
       <log-in v-if="loginModal" @close="loginModal = false" @joinModal="joinModal = true, loginModal = false" ></log-in>
       <join-register v-if="joinModal" @close="joinModal = false" @loginModal="loginModal = true, joinModal = false"></join-register>
       </div>
       <div>
    <footer>
       <app-footer></app-footer>
   </footer>
   </div>
  </div>
</template>

<script>
import NavBar from "../components/Navbar.vue";
import AppFooter from "../components/Footer.vue";
import logIn from '../components/Login.vue';
import joinRegister from '../components/join.vue';

export default {
  data (){
    return {
      loginModal: false,
      joinModal: false,
      guestLoginModal: false,
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
    NavBar,
    AppFooter,
    logIn,
    joinRegister,
  }
};
</script>

<style scoped>
#app{
  display: flex;
  flex-flow: column wrap;

}


</style>



