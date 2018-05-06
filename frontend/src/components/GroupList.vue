<template>
  <section class="group-list">
    <h1>Jam Session Groups</h1>
      <div v-for="group in groups" :key="group._id" >
        <div  @click="openGroupDetails(group._id)">
        <GroupPreview :group="group"></GroupPreview>
        </div>
      </div>
  </section>
</template>

<script>
import GroupPreview from '../components/GroupPreview.vue' 
export default {
props: ['groups'],
methods: {
openGroupDetails(groupId){
  this.$router.push(`/GroupDetails/${groupId}`)
}
},
components:{
    GroupPreview
  }
}
</script>

<style scoped>
h1{
  text-align: center;
}
</style>
