<template>
<el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1"><router-link tag="a" class="home" to="/">Home</router-link></el-menu-item>
  <el-menu-item index="2"><router-link tag="a" class="join" to="/join">Join</router-link></el-menu-item>
  <el-menu-item index="3"><router-link tag="a" class="login" to="/login">Log In</router-link></el-menu-item>
  <el-menu-item index="4"> <router-link tag="a" class="loginGuest" to="/">Log In as a Guest</router-link></el-menu-item>
  <el-menu-item index="4"> <router-link tag="a" class="UserSearch" to="/UserSearch">Create Group</router-link></el-menu-item>
</el-menu>


</template>

<script>
export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
a{
  font-family: Verdana, Geneva, Tahoma, sans-serif
  
}
</style>

