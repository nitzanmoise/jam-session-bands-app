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
       <el-menu-item index="1"><router-link tag="a" class="home" to="/">Home</router-link></el-menu-item>
      <el-menu-item index="2"><router-link tag="a" class="join" to="/join">Join</router-link></el-menu-item>
      <el-menu-item index="3"><button tag="a" id="show-modal" @click="$emit('loginModal',true)">Log In</button></el-menu-item>
       <el-menu-item index="4"> <router-link tag="a" class="loginGuest" to="/">Log In as a Guest</router-link></el-menu-item>
      <el-menu-item index="4"> <router-link tag="a" class="UserSearch" to="/UserSearch">Create Group</router-link></el-menu-item>
</el-menu>
</section>
</template>

<script>

export default {
  props: ["loginModal"],
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
a{
  font-family: debris;
  text-decoration:none;
}

</style>

