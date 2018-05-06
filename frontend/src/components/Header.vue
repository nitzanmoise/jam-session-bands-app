<template>
<section class="header">
<div class="container-fluid main">
  <div id="myCarousel" class="carousel carousel-fade slide">
    <div class="carousel-inner" role="listbox">
      <div class="item active background a"></div>
    </div>
  </div>
  <div class="covertext">
    <div class="col-lg-10" style="float:none; margin:0 auto;">
      <h1 class="title">Jam Session!</h1> 
      <h3 class="subtitle">What is your talant?</h3>
    </div>
    <div class="searchBar">
        <input type="text" v-model="search" @input='emitFilter' placeholder="Search Jam Session Groups" />
      <ul v-if="search">
        <li v-if="search" v-for="group in groups" :key="group._id" @click="openGroupDetails(group._id)">{{ group.name }}</li>
      </ul>
    </div>
  </div>
  
</div>
</section>

</template>

<script>
 

var _ = require('lodash');
export default {
  props:['groups'],
   data() {
        return {
            search: ''
        }
   },
methods:{
        emitFilter(){
            this.$emit('filtered',this.search);
        },
        openGroupDetails(groupId){
        this.$router.push(`/GroupDetails/${groupId}`)
        }
        // searchBy:_.debounce(function (e) {
        //         this.emitFilter();
        // }, 500),
    }
        
    }

</script>

<style lang="css" scoped>

@font-face {
  font-family:debris ;
  src: url('../../public/fonts/Debris/batman.ttf');
}
@font-face {
  font-family: Magettas Regular DEMO;
  src: url("../../public/fonts/magettas-demo/Magettas Regular DEMO.otf");
}
@font-face {
  font-family: Shrikhand-Regular;
  src: url("../../public/fonts/Shrikhand/Shrikhand-Regular.ttf");
}

*{
  box-sizing: border-box;
}
ul li{
  background: white;
  list-style-type: none;
 padding: 12px;
  border: 1px solid gray;
font-size:18px;
display:block;
  margin-top: -1px;
  width:300px;
  text-decoration: none;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  cursor: pointer;
 
}
ul{
  margin:0;
  padding:0;
}
.searchBar{
  display:flex;
  flex-flow: column wrap;
  justify-items: center;
  align-items: center;
}


input{
padding:10px;
width: 300px;
font-family: Verdana, Geneva, Tahoma, sans-serif;
margin-top: 30px;
}
.container-fluid.main{
  position: relative; /* To make the navbar positions relative to this container */
  padding: 0;
}

.carousel .background {
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height:500px;
}

@media (max-width:991px) {
  .carousel .background {
    background-size: cover; /* To make the background image looks good */
  }
}

.carousel .background.a {
  background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../assets/img/band-header.jpg");
}

.covertext {
  position: absolute; /* To make the div to be place anywhere. It is out of the document flow */
  top: 0px; /* The distance between the div with the top of document */
  left: 0px; /* Make the div full width */
  right: 0px; /* Make the div full width */
}

.title {
  font-family:  Shrikhand-Regular;
  font-weight: 600;
  font-size: 60px;
  color: orange;
  text-align: center;
}

.subtitle {
  font-family:  Magettas Regular DEMO;
  font-size: 26px;
  color: white;
  text-align: center;
}

.explore {
  text-align: center;
  margin-top: 10px;
}


</style>
