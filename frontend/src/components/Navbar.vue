<template>
<section class="navbar">
<el-menu
  :default-active="activeIndex2"
  class="el-menu"
  mode="horizontal"
  @select="handleSelect"
  background-color="black"
  text-color="orange"
  active-text-color="orangered">
  <!-- <div class="homeCreate"> -->
       <el-menu-item index="1"><router-link tag="a" class="home" to="/">Home</router-link></el-menu-item>
      <el-menu-item index="2"> <router-link tag="a" class="UserSearch" to="/UserSearch">Create Group</router-link></el-menu-item>
 <!-- </div>
 <div class="register"> -->
      <el-menu-item index="3"><button tag="a" id="show-modal" @click="$emit('joinModal', true)">Join</button></el-menu-item>
      <el-menu-item index="4"><button tag="a" id="show-modal" @click="$emit('loginModal', true)">Log In</button></el-menu-item>
      
  <!-- </div> -->
</el-menu>
</section>
</template>

<script>

export default {
  props: ["loginModal", "joinModal"],
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    components:{
      
    }
  }
</script>

<style scoped>
@font-face {
  font-family:debris ;
  src: url('../../public/fonts/Debris/batman.ttf');
}


button {
     background:none!important;
     color:inherit;
     border:none; 
     padding:0!important;
     font: inherit;
     /*border is optional*/
     border-bottom:1px solid #444; 
     cursor: pointer;
      font-family: debris;
  text-decoration:none;
}
a{
  font-family: debris;
  text-decoration:none;
}

</style>

