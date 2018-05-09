<template>
  <section class="user-list">
    <div class="users-container">
      <div v-for="user in users" :key="user._id" >
        <div  @click="openUserDetails(user._id)">
        <UserPriview :user="user"></UserPriview>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UserPriview from '../components/UserPriview.vue' 
export default {
props: ['users'],
methods: {
openUserDetails(userId){
  this.$router.push(`/UserDetails/${userId}`)
}
},
components:{
    UserPriview
  }
}
</script>

<style scpoped>

h1 {
  font-family:  Shrikhand-Regular;
  font-weight: 600;
  font-size: 60px;
  color: orange;
  text-align: center;
  margin-top: 100px;
}

.user {
  display: flex;
  flex-flow: column wrap;

  margin-bottom: 50px;

}

.users-container {
  width: 100%;
  margin: 0 auto;

  display: grid;
   
 grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-gap: 10px;
  
}

@media (max-width:950px) {
    .users-container {
 grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-gap: 10px;
}
}
@media (max-width:712px) {
    .users-container {
 grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-gap: 10px;
}
}

@media (max-width:480px) {
    .users-container {
 grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  grid-gap: 10px;
}
}

</style>

