<template>
<div id="app">
  <header>
        <nav-Bar :loginModal="loginModal"  @loginModal="loginModal = true" :joinModal="joinModal"  @joinModal="joinModal = true" ></nav-Bar>
  </header>
       <router-view></router-view>
       <div>
             <div v-if="alive" class="alert" :class="alertClass" >
             {{msg.txt}}
      </div>
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
import eventBus, {SHOW_MSG} from '../services/EventBusService.js'
import EventBusService from '../services/EventBusService.js';

export default {
  data (){
    return {
      loginModal: false,
      joinModal: false,
      guestLoginModal: false,
      alive : false,
      msg: null
    }
  },
  created (){
    EventBusService.$on(SHOW_MSG, (msg) => {
       this.msg = msg;
            var delay = msg.delay || 2000;
            this.alive = true;
            setTimeout(() => {
                this.alive = false;
            }, delay)
        })
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
  computed: {
        alertClass() {
            if (!this.msg) return;
            return `alert-${this.msg.type}`
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


</style>



