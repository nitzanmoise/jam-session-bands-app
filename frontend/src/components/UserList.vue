<template>
  <section class="user-list">
    <ul>
      <div v-for="user in users" :key="user._id" >
        <div  @click="openUserDetails(user._id)">
        <UserPriview :user="user"></UserPriview>
        </div>
      </div>
    </ul>
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

</style>
