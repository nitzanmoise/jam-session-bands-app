<template>

<section class="home">
 <Header @filtered="filterGroups" :groups="groups"></Header>
 <GroupList :groups="groups"></GroupList>
</section>
</template>

<script>
import Header from "../components/Header.vue";
import GroupList from "../components/GroupList.vue";
import Footer from "../components/Footer.vue";
export default {
  created() {

    this.$store.dispatch({ type: "loadGroups" });
  },
 computed: {
    groups() {
      return this.$store.getters.groupsForDisplay;
    }
  },
   methods: {
    filterGroups(filter) {
      this.$store.commit({
        type: "setGroupFilter",
        filter: filter
      });
      this.$store.dispatch({ type: "loadGroups" });
    }
  },
  components: {
    GroupList,
    Footer,
    Header
  }
};
</script>

<style>

</style>
