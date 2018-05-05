<template functional>

<section  class="group-preview">

  <el-col :span="8" :key="o" :offset="index > 0 ? 2 : 0">
    <el-card :body-style="{ padding: '10px' }" class="card">
      <img :src="props.group.image" class="image">
      <div style="padding: 14px;">
        <span>{{props.group.name}}</span>
        <div class="bottom clearfix">
          <el-button type="text" class="button">Join The Band</el-button>
        </div>
      </div>
    </el-card>
  </el-col>


</section>
 
</template>

<style>
.card{
    height:300px;
    width: 300px;
    margin: 20px;
}
span{
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif
}

.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    display: block;
    padding-left: 15%;
    width:200px;
    height: 200px;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>

<script>
export default {

}
</script>

