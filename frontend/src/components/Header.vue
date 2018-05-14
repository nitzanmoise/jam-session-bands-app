<template>
<section class="header">
      <h1 class="title">Jam Session!</h1> 
      <h3 class="subtitle">What is your music talent?</h3>
    <div class="searchBar">
      <input name="searchBar" type="text" v-model="search" @input='emitFilter' placeholder="Search talents groups are seeking" />
      <ul v-if="search">
      <li v-if="search" v-for="group in groups" :key="group._id" @click="openGroupDetails(group._id)">{{group.name}} needs: {{ group.need.join(', ')}}</li>
      </ul>
    </div>
  
</section>

</template>

<script>
var _ = require("lodash");
export default {
  props: ["groups"],
  data() {
    return {
      search: ""
    };
  },
  methods: {
    emitFilter() {
      this.$emit("filtered", this.search);
    },
    openGroupDetails(groupId) {
      this.$router.push(`/GroupDetails/${groupId}`);
    }
    // searchBy:_.debounce(function (e) {
    //         this.emitFilter();
    // }, 500),
  }
};
</script>

<style lang="css" scoped>
@font-face {
  font-family: debris;
  src: url("../../public/fonts/Debris/batman.ttf");
}
@font-face {
  font-family: Magettas Regular DEMO;
  src: url("../../public/fonts/magettas-demo/Magettas Regular DEMO.otf");
}
@font-face {
  font-family: Shrikhand-Regular;
  src: url("../../public/fonts/Shrikhand/Shrikhand-Regular.ttf");
}

* {
  box-sizing: border-box;
}
ul li {
  background: white;
  list-style-type: none;
  padding: 12px;
  border: 1px solid gray;
  font-size: 18px;
  display: block;
  margin-top: -1px;
  width: 300px;
  text-decoration: none;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  cursor: pointer;
 
}
ul {
  margin: 0;
  padding: 0;
   z-index: 998;
}
.searchBar {
  display: flex;
  flex-flow: column wrap;
  justify-items: center;
  align-items: center;
}

input {
  padding: 10px;
  width: 300px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin-top: 50px;
  border-radius: 50px;
}

.header {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../assets/img/headerbg.jpg");
     background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 500px;

}

.title {
  font-family: Shrikhand-Regular;
  font-weight: 600;
  font-size: 60px;
  color: orange;
  text-align: center;
  margin: 0;
  padding-top: 100px;
}

.subtitle {
  font-family: Magettas Regular DEMO;
  font-size: 36px;
  color: white;
  text-align: center;
  padding-top: 25px;
}

</style>
