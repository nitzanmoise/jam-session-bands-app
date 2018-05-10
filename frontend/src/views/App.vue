<template>
<div id="app">
  <header>
        <nav-Bar :loginModal="loginModal"  @loginModal="loginModal = true" :joinModal="joinModal"  @joinModal="joinModal = true" :group-create="groupCreate" @groupCreate="groupCreate= true" ></nav-Bar>
  </header>
       <router-view @openLogin="rani"></router-view>
       <log-in v-if="loginModal" @close="loginModal = false" @joinModal="joinModal = true, loginModal = false" ></log-in>
       <join-register v-if="joinModal" @close="joinModal = false" @openLogin="joinModal = false, loginModal = true" @loginModal="openLogin"></join-register>
       <group-create v-if="isLoggedIn && groupCreate" @close="groupCreate = false"></group-create>
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
import logIn from "../components/Login.vue";
import joinRegister from "../components/join.vue";
import groupCreate from "../components/GroupCreate.vue";
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
      joinModal: false,
      groupCreate: false
    };
  },

  methods: {
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
        EventBusService.$on(REQUIRE_LOGIN, () => {
          this.loginModal = true;
        });
      }
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
</style>



