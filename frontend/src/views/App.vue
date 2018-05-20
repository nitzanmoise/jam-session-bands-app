<template>
<div id="app">
  <header>
        <nav-Bar :loginModal="loginModal"  @loginModal="loginModal = true" :joinModal="joinModal"  @joinModal="joinModal = true" ></nav-Bar>
  </header>
       <router-view @openLogin="rani"></router-view>
       <log-in v-if="loginModal" @close="loginModal = false" @joinModal="joinModal = true, loginModal = false" ></log-in>
       <join-register v-if="joinModal" @close="joinModal = false" @openLogin="joinModal = false, loginModal = true" @loginModal="openLogin"></join-register>
        <user-msg></user-msg>
    <footer>
       <app-footer></app-footer>
   </footer>
  </div>
</template>

<script>
import NavBar from "../components/Navbar.vue";
import AppFooter from "../components/Footer.vue";
import logIn from "../components/Login.vue";
import joinRegister from "../components/join.vue";
import eventBus, {
  SHOW_MSG,
  REQUIRE_LOGIN
} from "../services/EventBusService.js";
import EventBusService from "../services/EventBusService.js";
import userMsg from "../components/UserMsg.vue";

export default {
  created() {
    if (sessionStorage.user) {
      this.$store.commit({
        type: "setUser",
        user: JSON.parse(sessionStorage.user)
      });
    }

    EventBusService.$on(REQUIRE_LOGIN, () => {
      setTimeout(() => {
        this.loginModal = true;
      }, 2000);
    });
  },
  data() {
    return {
      loginModal: false,
      joinModal: false
    };
  },

  methods: {
    openGroupCreate() {
      if (!this.loggedinUser) {
        this.loginModal = true;
        return;
      }
      this.groupCreate = true;
    },
    filterGroups(filter) {
      this.$store.commit({
        type: "setGroupFilter",
        filter: filter
      });
      this.$store.dispatch({ type: "loadGroups" });
    },
    rani() {
      console.log("open the modal of the laofin");
    },
    openLogin() {
      setTimeout(() => {
        this.loginModal = true;
        this.joinModal = false;
      }, 2000);
    }
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    isLoggedIn() {
      if (!this.loggedinUser) {
        this.loginModal = true;
      }
    }
  },

  components: {
    NavBar,
    AppFooter,
    logIn,
    joinRegister,
    userMsg
  }
};
</script>

<style scoped>
@font-face {
  font-family: Magettas Regular DEMO;
  src: url("../../public/fonts/magettas-demo/Magettas Regular DEMO.otf");
}
#app {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
}
* {
  font-family: Magettas Regular DEMO;
}
.groupList {
  border: 1px solid grey;
}
.nav-bar{
  z-index: 999;
}
</style>



