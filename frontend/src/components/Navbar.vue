

<template>
<section class='navbar'>
<el-menu
  :default-active='activeIndex2'
  class='el-menu'
  mode='horizontal'
  @select='handleSelect'
  background-color='rgba(128, 128, 128, 0.37)'
  text-color='white'
  active-text-color='orange'
  height='100%'>
  
 <h1 class="title" @click="goHome">Jam Session!</h1>  
       <el-menu-item index='1'><router-link tag='a' class='home' to='/'>Home&nbsp;<icon name="home" scale="1.5"></icon></router-link>
       </el-menu-item>
      <el-menu-item index='3' v-if='!$store.getters.loggedinUser' @click="$emit('loginModal', true)">
        <button tag='a' id='show-modal' >Log In&nbsp;<icon name="sign-in-alt" scale="1.3"></icon></button>
      </el-menu-item>
      <el-menu-item index='2' v-if='!$store.getters.loggedinUser' @click="$emit('joinModal', true)">
        <button tag='a' id='show-modal' >Join&nbsp;<icon name="user-plus" scale="1.3"></icon></button>
      </el-menu-item>

      <el-menu-item index='4' v-if='$store.getters.loggedinUser' @click='logout'>
        <button tag='a' id='show-modal' >Log Out&nbsp;<icon name="sign-out-alt" scale="1.3"></icon></button>
      </el-menu-item>
      
      <el-menu-item index='5' v-if='$store.getters.loggedinUser'  @click='routeToMyProfile($store.getters.loggedinUser._id)'>
        <button tag='a' id='show-modal' >My Profile&nbsp;<icon name="user" scale="1.3"></icon></button>
          <a href="" class="badge1" title="Join requesrs" :data-badge="counter"></a>
      </el-menu-item>
  
</el-menu>

</section>
</template>

<script>
import EventBusService, { SHOW_MSG } from "../services/EventBusService.js";
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons";


export default {
  props: ["loginModal", "joinModal"],
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
      // counter: this.loggedinUser.joinReqs.length
    };
  },
  computed: {
    counter() {
      return (
        this.loggedinUser.joinReqs.length +
        this.loggedinUser.groupJoinReq.length
      );
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    }
  },
  methods: {
    mobile(){

    },
    goHome() {
      this.$router.push("/");
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    routeToMyProfile(id) {
      this.$router.push(`/UserDetails/${id}`);
    },
    logout() {
      console.log("Logging out!");
      this.$router.push("/");
      EventBusService.$emit(SHOW_MSG, {
        txt: `You Logged Out!`,
        type: "error"
      });
      this.$store.dispatch("logout").then(() => {});
    }
  },
  components: {
    Icon
  }
};
</script>

<style scoped>
@font-face {
  font-family: debris;
  src: url("../../public/fonts/Debris/batman.ttf");
}
@font-face {
  font-family: Magettas Regular DEMO;
  src: url("../../public/fonts/magettas-demo/Magettas Regular DEMO.otf");
}
@font-face {
  font-family: Shrikhand-Regular;
  src: url("../../public/fonts/Shrikhand/Shrikhand-Regular.ttf");
}

.title {
  font-family: Shrikhand-Regular;
  font-weight: 200px;
  font-size: 30px;
  color: orange;
  /* margin: 0; */
  line-height: 24px;
  margin-right: auto;
  margin-left: 40px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-item-align: start;
  align-self: flex-start;
  justify-self: flex-start;
  cursor: pointer;
}

.el-menu-item * {
  vertical-align: -2px;
  outline: none;
}
.el-menu--horizontal {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-content: flex-end;
  border-bottom: none;
}

.navbar {
  overflow: hidden;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
  z-index: 2;
}
button {
  background: none !important;
  color: inherit;
  border: none;
  padding: 0 !important;
  font: inherit;
  /*border is optional*/
  /* border-bottom:1px solid #444;  */
  cursor: pointer;
  font-family: Shrikhand-Regular;
  text-decoration: none;
  font-size: 1.3em;
  line-height: 70px;
  height: 80px;
  outline: none;
}
li.el-menu-item {
  border-left: solid 1px black;
}

li.el-menu-item:first-child {
  border-left: solid 1px black;
}
li.el-menu-item:last-child {
  border-right: solid 1px black;
}

a {
  font-family: "Interstate", "Lucida Grande", "Lucida Sans Unicode";
  text-decoration: none;
}

.el-menu {
  height: 70px;
}
.el-menu--horizontal > .el-menu-item {
  height: 100%;
}
a {
  font-family: Shrikhand-Regular;
  text-decoration: none;
  font-size: 1.3em;
  line-height: 80px;
  height: 80px;
}

li.el-menu-item:hover {
  background-color: rgba(0, 0, 0, 1);
}

/* BADGE CSS */
.badge1 {
  position: relative;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1em;
}
.badge1[data-badge]:after {
  content: attr(data-badge);
  position: absolute;
  top: -20px;
  right: -15px;
  font-size: 0.7em;
  background: orange;
  color: white;
  width: 18px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  border-radius: 50%;
  box-shadow: 0 0 1px #333;
}

@media (max-width: 720px) {
  .el-menu-item {
    width: 100%;
       font-size: 0.6em;
  }
  .title {
    display: none;
  }
  button {
    width: 100%;
    font-weight: .5em;
  }
  h1 {
    display: none;
  }
}
</style>

