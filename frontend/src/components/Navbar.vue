<template>
<section class="navbar">
<el-menu
  :default-active="activeIndex2"
  class="el-menu"
  mode="horizontal"
  @select="handleSelect"
  background-color="grey"
  text-color="white"
  active-text-color="orange"
  height="100%">
  
  <!-- <div class="homeCreate"> -->
       <el-menu-item index="1"><router-link tag="a" class="home" to="/">Home</router-link></el-menu-item>
      <el-menu-item index="2"> <router-link tag="a" class="CreateEdit" to="/GroupEdit">Create Group</router-link></el-menu-item>
 <!-- </div>
 <div class="register"> -->
      <el-menu-item index="3" v-if="!$store.getters.loggedinUser" >
        <button tag="a" id="show-modal" @click="$emit('joinModal', true)">Join</button>
      </el-menu-item>
      <el-menu-item index="4" v-if="!$store.getters.loggedinUser">
        <button tag="a" id="show-modal" @click="$emit('loginModal', true)">Log In</button>
      </el-menu-item>
      <el-menu-item index="5" v-if="$store.getters.loggedinUser">
        <button tag="a" id="show-modal" @click="logout" >Log Out</button>
      </el-menu-item>
      
      
  <!-- </div> -->
</el-menu>
</section>
</template>

<script>
export default {
  props: ["loginModal", "joinModal"],
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      console.log("Logging out!");
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    }
  },
  components: {}
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
.navbar{
  overflow: hidden;
    position: fixed; /* Set the navbar to fixed position */
    top: 0; /* Position the navbar at the top of the page */
    width: 100%; /* Full width */
    z-index: 2;
}
button {
   background:none!important;
     color:inherit;
     border:none; 
     padding:0!important;
     font: inherit;
     /*border is optional*/
     /* border-bottom:1px solid #444;  */
     cursor: pointer;
      font-family:Magettas Regular DEMO;
     text-decoration:none;
     font-size: 1.5em;
     line-height: 80PX;
  height: 80px;
}
li.el-menu-item {
  background-color: rgba(185, 171, 171, 1);
}
a {
  font-family: "Interstate", "Lucida Grande", "Lucida Sans Unicode";
  text-decoration: none;
  background-color: rgba(185, 171, 171, 1);
}
.el-menu{
  height: 80px;
}
.el-menu--horizontal>.el-menu-item{
  height: 100%;
}
a{
  font-family:  Magettas Regular DEMO;
  text-decoration:none;
  font-size: 1.5em;
  line-height: 80px;
  height: 80px;
  
}

li.el-menu-item:hover {
  background-color: rgba(0, 0, 0, 1);
}
</style>

