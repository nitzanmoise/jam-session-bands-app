<template>

<section  class="group-preview">

  <el-col :span="5" >
    <el-card :body-style="{ padding: '10px' }" class="card">
        <span>{{group.name}}</span>
      <img :src="group.image" class="image">
      <div style="padding: 14px;">
        <div class="bottom clearfix">
          <div class="seeking-container">
            <div class="seeking">
              <h3>Seeking:</h3>
            </div>      
            <div v-for="need in group.need" :key="need._id">  
                <img class="icon" :src="'./img/instruments/'+need+'.png'" alt="" width="25px;" height="25px;">                        
            </div>
          </div>  
          <button @click="openGroupDetails(group._id)">View Group Details</button>
          <button type="text" class="button">Join The Band</button>
        </div>
      </div>
    </el-card>
  </el-col>


</section>
 
</template>

<style>
@font-face {
  font-family: Magettas Regular DEMO;
  src: url("../../public/fonts/magettas-demo/Magettas Regular DEMO.otf");
}
.card {
    height:400px;
    width: 300px;
    margin: 20px;
      text-align: center;
      cursor: pointer;
    /* border: solid 2px black; */
    /* box-shadow: 2px 4px 54px 0px rgba(0,0,0,0.62); */
}
span{
    /* font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; */
    margin: 20px;
    font-size: 1.2em;
    font-weight: bold;
}
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
    color: orange;
    font-family: Magettas Regular DEMO;
  }

  .image {
    display: block;
    padding-left: 15%;
    width:200px;
    height: 180px;
    margin-top: 10px;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .seeking-container{
    display: flex;
    justify-content: space-around;
    width: 200px;
    padding-left: 5%;
    
  }
  .seeking{
    padding-bottom: 5px;
  }

  h3{
    font-weight: normal;
  }
  .icon{
    margin-top: 12px;
  }
</style>

<script>
export default {
  props: ['group'],
methods: {
openGroupDetails(groupId){
  this.$router.push(`/GroupDetails/${groupId}`)
}
},
}
</script>

