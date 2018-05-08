<template>

<section class="usersPage">
 <users-header @filtered="filterUsers" :users="users"></users-header>
 <UserList :users="users"></UserList>
</section>

</template>

<script>
import UsersHeader from "../components/UsersHeader.vue";
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
    UsersHeader
  }
};
</script>

<style>

</style>