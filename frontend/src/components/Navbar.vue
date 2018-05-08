<template>
<section class='navbar'>
<el-menu
  :default-active='activeIndex2'
  class='el-menu'
  mode='horizontal'
  @select='handleSelect'
  background-color='grey'
  text-color='white'
  active-text-color='orange'
  height='100%'>
  
  <!-- <div class='homeCreate'> -->
       <el-menu-item index='1'><router-link tag='a' class='home' to='/'>Home</router-link></el-menu-item>
      <el-menu-item index='2'> 
       <button tag='a' id='show-modal' @click="$emit('groupCreate', true)">Create Group</button>
        </el-menu-item>
 <!-- </div>
 <div class='register'> -->
      <el-menu-item index='3' v-if='!$store.getters.loggedinUser' >
        <button tag='a' id='show-modal' @click="$emit('joinModal', true)">Join</button>
      </el-menu-item>
      <el-menu-item index='4' v-if='!$store.getters.loggedinUser'>
        <button tag='a' id='show-modal' @click="$emit('loginModal', true)">Log In</button>
      </el-menu-item>
      <el-menu-item index='5' v-if='$store.getters.loggedinUser'>
        <button tag='a' id='show-modal' @click='logout' >Log Out</button>
      </el-menu-item>
      
      <el-menu-item index='6' v-if='$store.getters.loggedinUser'>
        
        <button tag='a' id='show-modal' @click='routeToMyProfile($store.getters.loggedinUser._id)' >My Profile</button>
          <a href="" class="badge1" data-badge="27"></a>
      </el-menu-item>
      
      
  <!-- </div> -->
</el-menu>
</section>
</template>

<script>
import EventBusService, { SHOW_MSG } from '../services/EventBusService.js'


export default {
  props: ['loginModal', 'joinModal', 'groupCreate'],
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    routeToMyProfile(id){
      this.$router.push(`/UserEdit/${id}`);
    },
    logout() {
      console.log('Logging out!');
        this.$router.push('/');
      EventBusService.$emit(SHOW_MSG, {txt: `You Logged Out!`, type: 'error'});
      this.$store.dispatch('logout').then(() => {
      });
    }
  },
  components: {}
};
</script>

<style scoped>
@font-face {
  font-family: debris;
  src: url('../../public/fonts/Debris/batman.ttf');
}
@font-face {
  font-family: Magettas Regular DEMO;
  src: url('../../public/fonts/magettas-demo/Magettas Regular DEMO.otf');
}
  @font-face {
  font-family: Shrikhand-Regular;
  src: url('../../public/fonts/Shrikhand/Shrikhand-Regular.ttf');
}

.navbar{
  overflow: hidden;
    position: fixed; /* Set the navbar to fixed position */
    top: 0; /* Position the navbar at the top of the page */
    width:100%; /* Full width */
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
     font-family: Shrikhand-Regular;
     text-decoration:none;
      font-size: 1.3em;
     line-height: 70px;
  height: 80px;
}
li.el-menu-item {
  background-color: rgba(185, 171, 171, 1);
  border: solid 1px black;
}

li.el-menu-item:first-child{
  border-left: none;
}
a {
  font-family: 'Interstate', 'Lucida Grande', 'Lucida Sans Unicode';
  text-decoration: none;
}

.el-menu{
  height: 70px;
}
.el-menu--horizontal>.el-menu-item{
  height: 100%;
}
a{
 font-family: Shrikhand-Regular;
  text-decoration:none;
  font-size: 1.3em;
  line-height: 80px;
  height: 80px;
  
}

li.el-menu-item:hover {
  background-color: rgba(0, 0, 0, 1);
}


/* BADGE CSS */
.badge1 {
   position:relative;
   font-family: Verdana, Geneva, Tahoma, sans-serif;
   font-size: 1em
}
.badge1[data-badge]:after {
   content:attr(data-badge);
   position:absolute;
   top:-20px;
   right:-15px;
   font-size:.7em;
   background:orange;
   color:white;
   width:18px;height:18px;
   text-align:center;
   line-height:18px;
   border-radius:50%;
   box-shadow:0 0 1px #333;
}
</style>

