<template>
  <section class="user-list">
    <div class="users-container">
      <div v-for="user in users" :key="user._id" >
        <UserPriview :user="user"></UserPriview>
      </div>
    </div>
  </section>
</template>

<script>
import UserPriview from "../components/UserPriview.vue";
export default {
  props: ["users"],
  methods: {
    openUserDetails(userId) {
      this.$router.push(`/UserDetails/${userId}`);
    }
  },
  components: {
    UserPriview
  }
};
</script>

<style scpoped>
h1 {
  text-align: center;
  font-size: 1.7em;
  margin: 0px;

  color: #756a6a;
  padding: 30px;
}

.user {
  display: flex;
  flex-flow: column wrap;
  margin: 10px;
  text-align: center;
  background-color: white;
  border: 1px solid rgba(223, 220, 220, 0.521);
}

.users-container {
  width: 100%;
  margin: 20px auto;

  display: grid;

  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-gap: 30px;
}

@media (max-width: 950px) {
  .users-container {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-gap: 10px;
  }
}
@media (max-width: 712px) {
  .users-container {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    grid-gap: 10px;
  }
}

@media (max-width: 480px) {
  .users-container {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: auto;
    grid-gap: 10px;
  }
}
</style>

