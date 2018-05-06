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
@font-face {
  font-family: Magettas Regular DEMO;
  src: url("../../public/fonts/magettas-demo/Magettas Regular DEMO.otf");
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

</style>

