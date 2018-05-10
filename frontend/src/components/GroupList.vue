<template>

  <section class="group-list">
    <h1>Jam Session Groups</h1>
    <div class="groups-container">
      <div  v-for="group in groups" :key="group._id" class="group">
        <GroupPreview @openLogin="openLogin" :group="group"></GroupPreview>
      </div>
      </div>
  </section>
</template>

<script>
import GroupPreview from "../components/GroupPreview.vue";
export default {
  props: ["groups"],
  methods:{
    openLogin(){
      this.$emit('openLogin')
    }
  },
  components: {
    GroupPreview
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 1.7em;
  margin: 0px;
  background-color: whitesmoke;
  color: #756a6a;
  padding: 30px;
  border-top: 1px solid white;
}

.group {
  display: flex;
  flex-flow: column wrap;
  margin: 10px;
  text-align: center;
  background-color: white;
  border: 1px solid rgba(223, 220, 220, 0.521)

}

.groups-container {
  width: 100%;
  margin: 20px auto;

  display: grid;
   
 grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-gap: 30px;
  
}

@media (max-width:950px) {
    .groups-container {
 grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-gap: 10px;
}
}
@media (max-width:712px) {
    .groups-container {
 grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-gap: 10px;
}
}

@media (max-width:480px) {
    .groups-container {
 grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  grid-gap: 10px;
}
}

</style>
