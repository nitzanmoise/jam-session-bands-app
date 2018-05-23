<template>
  <section class="user-list">
    <div class="users-container">
      <div class="user" v-for="user in users" :key="user._id" >
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
box-shadow: 6px 7px 24px -11px rgba(0,0,0,0.75);


}

.users-container {
 
  width: 100%;
  margin: 20px auto;
  display: grid;
  grid-template-columns: repeat(4, 4fr);
  grid-template-rows: auto;
  grid-gap: 10px;
  

}

@media (max-width:1400px) {
    .users-container {
  grid-template-columns: repeat(3, 3fr);
  grid-template-rows: auto;
  grid-gap: 10px;
}
.user {
width:350px;

}
}
@media (max-width:1146px) {
    .users-container {
 grid-template-columns: repeat(2, 2fr);
  grid-template-rows: auto;
  grid-gap: 10px;
}
h1{
    height: 100px;
    width: 100%;
    padding: 0;
    line-height: 100px;
}
.user {
width:350px;

}
}
@media (max-width:819px) {
    .users-container {
 grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  grid-gap: 10px;
  justify-items: center;
}
h1{
  height:100%;
  width:100%;
  padding: 0;
}
.user {
width:350px;

}
}

@media (max-width:700px) {

h1{
  height:100%;
  width:100%;
  padding: 0;
}
.user {
width:350px;

}
}

</style>

