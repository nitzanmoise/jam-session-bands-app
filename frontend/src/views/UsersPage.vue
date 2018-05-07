<template>

<section class="usersPage">
 <Header @filtered="filterUsers" :users="users"></Header>
 <UserList :users="users"></UserList>
</section>

</template>

<script>
import Header from "../components/Header.vue";
import UserList from "../components/UserList.vue";
import Footer from "../components/Footer.vue";
export default {
  created() {

    this.$store.dispatch({ type: "loadUsers" });
  },
 computed: {
    users() {
      return this.$store.getters.usersForDisplay;
    }
  },
   methods: {
    filterUsers(filter) {
      this.$store.commit({
        type: "setUserFilter",
        filter: filter
      });
      this.$store.dispatch({ type: "loadUsers" });
    }
  },
  components: {
    UserList,
    Footer,
    Header
  }
};
</script>

<style>

</style>