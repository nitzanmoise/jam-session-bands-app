<template functional>

<section  class="group-preview">

  <el-col :span="6" :key="o" :offset="index > 0 ? 2 : 0">
    <el-card :body-style="{ padding: '10px' }" class="card">
        <span>{{props.group.name}}</span>
      <img :src="props.group.image" class="image">
      <div style="padding: 14px;">
        <div class="bottom clearfix">
          <div class="seeking-container">
            <div class="seeking">
              <h3>Seeking:</h3>
            </div>      
            <div v-for="need in props.group.need" :key="need._id">  
                <img class="icon" :src="'./img/instruments/'+need+'.png'" alt="" width="25px;" height="25px;">                        
            </div>
          </div>  
          <el-button type="text" class="button">Join The Band</el-button>
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
    height:300px;
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
    height: 150px;
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
  .icon{
    margin-top: 12px;
  }
</style>

<script>
export default {

}
</script>

