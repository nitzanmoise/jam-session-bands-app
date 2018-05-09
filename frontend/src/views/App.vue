<template>
<div id="app">
  <header>
        <nav-Bar :loginModal="loginModal"  @loginModal="loginModal = true" :joinModal="joinModal"  @joinModal="joinModal = true" :group-create="groupCreate" @groupCreate="groupCreate= true" ></nav-Bar>
  </header>
       <router-view></router-view>
       <log-in v-if="loginModal" @close="loginModal = false" @joinModal="joinModal = true, loginModal = false" ></log-in>
       <join-register v-if="joinModal" @close="joinModal = false" @loginModal="loginModal = true, joinModal = false"></join-register>
       <group-create v-if="groupCreate" @close="groupCreate = false"></group-create>
        <user-msg></user-msg>
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
import groupCreate from '../components/GroupCreate.vue'
import eventBus, {SHOW_MSG} from '../services/EventBusService.js'
import EventBusService from '../services/EventBusService.js';
import userMsg from '../components/UserMsg.vue'

export default {
  created(){
 if (sessionStorage.user) {
            this.$store.commit({type: 'setUser', user: JSON.parse(sessionStorage.user)})
        }

  },
  data (){
    return {
      loginModal: false,
      joinModal: false,
      groupCreate: false,
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
    userMsg,
    groupCreate
  }
};
</script>

<style scoped>
@font-face {
  font-family: Magettas Regular DEMO;
  src: url("../../public/fonts/magettas-demo/Magettas Regular DEMO.otf");
}
#app{
  
  display: flex;
  flex-flow: column wrap;

}
*{
  font-family: Magettas Regular DEMO;
}
.groupList{
  border: 1px solid grey;
}

</style>



