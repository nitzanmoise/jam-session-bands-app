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
    height: 100px;
    width: 100%;
    padding: 0;
    line-height: 100px;
  border-top: 1px solid white;
}

.group {
  display: flex;
  flex-flow: column wrap;
  margin: 10px;
  text-align: center;
  background-color: white;
box-shadow: 6px 7px 24px -11px rgba(0,0,0,0.75);

}

.groups-container {
  width: 100%;
  margin: 20px auto;
  display: grid;
  grid-template-columns: repeat(4, 4fr);
  grid-template-rows: auto;
  grid-gap: 30px;
  
}

@media (max-width:1400px) {
    .groups-container {
  grid-template-columns: repeat(3, 3fr);
  grid-template-rows: auto;
  grid-gap: 10px;
}
.group {
width:379px;

}
}
@media (max-width:1226px) {
    .groups-container {
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
.group {
width:379px;

}
}
@media (max-width:819px) {
    .groups-container {
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
.group {
width:379px;

}
}

@media (max-width:700px) {

h1{
  height:100%;
  width:100%;
  padding: 0;
}
.group {
width:379px;

}
}

</style>
