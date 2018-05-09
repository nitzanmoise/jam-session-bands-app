<template>
  <section class="group-list">
    <h1>Jam Session Groups</h1>
    <div class="groups-container">
      <div  v-for="group in groups" :key="group._id" class="group">
        <GroupPreview :group="group"></GroupPreview>
      </div>
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

.group{
  display:flex;
  flex-flow: column wrap;
height: 400px;
  width: 300px;
  margin: 20px;
}

.groups-container {
  width: 90%;
  max-width: 1240px;
  margin: 0 auto;
   
  display: grid;
   
  grid-template-columns: 3fr;
  grid-template-rows: auto;
  grid-gap: 20px;
}
</style>
