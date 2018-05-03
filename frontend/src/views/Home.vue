<template>
  <div class="topnav" id="myTopnav">
<div class="col-sm-8" style="text-align:center;">
  <a href="javascript:void(0);" style="font-size:15px;" class="icon" onclick="myFunction()">&#9776;</a>
      <router-link tag="a" to="/join">join</router-link> 
      <router-link tag="a" to="/login">log in</router-link> 
      <router-link tag="a" to="/appPage">log as a guest</router-link>
    </div>
    <router-view></router-view>
    <GroupList :groups="groups"></GroupList>
  </div>
</template>

<script>
import GroupList from '../components/GroupList.vue'
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
export default {
   created() {
         console.log("elad");

        this.$store.dispatch({type: 'loadGroups'})
    },
  computed: {
    groups() {
      return this.$store.getters.groupsForDisplay;
    }
  },
 components:{
    GroupList
  }
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.topnav {
  float: none;
  overflow: hidden;
  margin: 20px 40px;
  padding: 30px 30px 30px 30px;
  background-color: white;
  border: 1px solid grey;
  border-radius: 30px;
  box-shadow: 1px 1px 1px 0px black;
}

.topnav a {
  float: right;
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 15px;
}

.topnav a:hover {
  background-color: #ddd;
  color: white;
  border-radius: 30px;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {
    display: none;
  }
  .topnav a.icon {
    float: left;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {
    position: relative;
  }
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: center;
  }
}
</style>
