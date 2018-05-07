<template>
  <section class="group-list">
    <h1>Jam Session Groups</h1>
      <div  v-for="group in groups" :key="group._id" >
        <GroupPreview :group="group"></GroupPreview>
      </div>
  </section>
</template>

<script>
import GroupPreview from '../components/GroupPreview.vue' 
export default {
props: ['groups'],
components:{
    GroupPreview
  }
}
</script>

<style scoped>
h1{
  text-align: center;
  font-size: 1.7em;
  margin: 0px;
  background-color: grey;
  color: white;
  padding: 30px;
  border-top: 1px solid white;
}

</style>
