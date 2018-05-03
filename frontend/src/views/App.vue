<template>
<div id="app">
    <header>
      <navbar></navbar>
    </header>
    <router-view></router-view>
    <GroupList :groups="groups"></GroupList>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import GroupList from "../components/GroupList.vue";
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

    this.$store.dispatch({ type: "loadGroups" });
  },
  computed: {
    groups() {
      return this.$store.getters.groupsForDisplay;
    }
  },
  components: {
    GroupList, Navbar
  }
};
</script>



