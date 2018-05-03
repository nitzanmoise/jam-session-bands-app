<template>

<section class="home">

 <GroupList :groups="groups"></GroupList>


</section>
</template>

<script>
import GroupList from '../components/GroupList.vue'
import Footer from '../components/Footer.vue'
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
components:{
    GroupList,
    Footer
}
}
</script>

<style>

</style>
