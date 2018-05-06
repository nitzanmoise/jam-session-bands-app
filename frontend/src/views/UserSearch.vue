<template>
   <section>
      <UserList :users="users"></UserList>
    </section>
</template>

<script>
import UserList from "../components/UserList.vue";

export default {
  created() {

    this.$store.dispatch({ type: "loadUsers" });
  },
  computed: {
    users() {
      return this.$store.getters.usersForDisplay;
    }
  },
  components: {
    UserList
  }
};
</script>



