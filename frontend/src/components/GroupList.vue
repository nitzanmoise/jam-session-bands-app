<template>
  <section class="group-list">
    <ul>
      <li v-for="group in groups" :key="group._id" >
        <div  @click="openGroupDetails(group._id)">
        <GroupPriview :group="group"></GroupPriview>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import GroupPriview from '../components/GroupPriview.vue' 
export default {
props: ['groups'],
methods: {
openGroupDetails(groupId){
  this.$router.push(`/GroupDetails/${groupId}`)
}
},
components:{
    GroupPriview
  }
}
</script>

<style scpoped>

</style>
