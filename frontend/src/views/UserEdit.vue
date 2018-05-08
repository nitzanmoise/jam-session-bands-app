<template>
   <div class="user-details-container">
    <section class="user-details"> 
        <div class="backround-img">
               
                <div class="header-info">
                     <h1>{{user.fullName}}</h1>
                    <h3 >{{user.location}}</h3>
                    <div>
                        <h4 v-for="genre in genres" :key="genre._id">
                            {{genre}}   
                        </h4>
                    </div>
                </div>
                <div class="img-container">
                    <img :src="user.image" class="user-image">
                </div>
                
        </div>
        <div class="main-container">
        <div class="groups-container">
            <h1 class="groups-header">Groups</h1>
            <div v-for="group in groups" :key="group._id" >
                <div class="group-img-container"  @click="goToGroupEdit(group._id)">
                    <img :src="group.image" class="group-image">
                </div>
                <div class="group-name-container">
                <h1 class="group-name" @click="goToGroupEdit(group._id)">{{group.name}}</h1>
                    <h5>a</h5>
                </div>
            </div>
            </div>
            <div class="about">
                {{user.description}}
            <iframe allowtransparency="true" scrolling="no" frameborder="no" src="https://w.soundcloud.com/icon/?url=http%3A%2F%2Fsoundcloud.com%2Fnitzan-moise&color=orange_white&size=32" style="width: 32px; height: 32px;">
            </iframe>
            </div>
        </div>    
        <!-- <button class="addMember" @click="addMember"> Add a Member</button> -->
    </section>
</div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      groups: {},
    };
  },
   computed: {
          genres(){
            return  this.user.genre
      },
      addMember(){
        
      }
   },
  methods:{
      goToGroupEdit(id){
       console.log('this is group id', id);
        this.$router.push(`/Group/Edit/${id}`)
          
      }
  },
  created() {
    var userId = this.$route.params.id;
    console.log("this is userid", userId);
    this.$store.dispatch({ type: "getUserById", userId }).then(user => {
      console.log("this i user", user);
      this.user = user;
      this.$store.dispatch({ type: "getUserGroups", user }).then(groups => {
        console.log("this is user groups", groups.data);
        this.groups = groups.data;
      });
    });
  }
};
</script>

<style scoped>
.user-details-container {
  font-family: "Interstate", "Lucida Grande", "Lucida Sans Unicode",
    "Lucida Sans", Garuda, Verdana, Tahoma, sans-serif;
display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  background-color: white;
}
.backround-img {
  display: flex;
  justify-content: space-around;
  background-image: url("../../public/img/band.jpg");
  background-size: cover;
  background-position: bottom;
  height: 20%;
}
.user-image {
  width: 35%;
  border: solid snow 2px;
  background-size: cover;
  box-shadow: gray 1px inset;
}
.img-container {
  width: 55%;

  padding-top: 5%;
  padding-bottom: 2%;
}
.group-image {
  width: 25%;
  cursor: pointer;
  border-radius: 50%;
  border: solid rgb(199, 182, 182) 5px;
  background-size: cover;
  box-shadow: gray 1px inset;
  margin-left: 25px;
}
.groups-container {
  padding-left: 5%;
  padding-top: 5%;
  display: flex;
  flex-direction: column;
}
.groups-header {
  font-family: Painting_With_Chocolate;
  color: orange;
  font-size: 2em;
  width: 35%;
  text-align: center;
  padding: 10px;
}
.about {
  margin-top: 10%;
  font-size: 28px;
}
.group-name {
  font-family: Condition3D-Italic;
  cursor: pointer;
  width: 35%;
  text-align: center;
  padding: 10px;

}
.user-details-container {
  background-color: rgb(244, 245, 247);
}

.header-info h1 {
  background-color: rgba(0, 0, 0, 0.8);
  font-size: 24px;
  line-height: 47px;
  padding: 4px 7px;
  margin-top: 0px;
  color: #fff;
  float: left;
  margin-bottom: 5px;
}
.header-info h3 {
  margin-top: 0px;
  background-color: rgba(0, 0, 0, 0.8);
  font-size: 15px;
  line-height: 27px;
  padding: 0 7px;
  color: #fff;
  float: left;
  margin-bottom: 5px;
}
.header-info h4 {
  margin-top: 0px;
  background-color: rgba(0, 0, 0, 0.8);
  font-size: 11px;
  line-height: 17px;
  padding: 0 7px;
  color: #fff;
  float: left;
}

.header-info {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  margin-top: 5%;
}
.main-container {
  display: flex;
}
 .button {
    padding: 0;
    float: right;
    color: orange;
    font-family: Magettas Regular DEMO;
  }
@font-face {
  font-family: Condition3D-Italic;
  src: url("../../public/fonts/Condition3D-Italic.ttf");
}
@font-face {
  font-family: Painting_With_Chocolate;
  src: url("../../public/fonts/Painting_With_Chocolate_regular/Painting_With_Chocolate.ttf");
}
@font-face {
    font-family: music-instuments ;
    src: url("../../public/fonts/kr-music-class/music-instuments.ttf");
}
h5{
    font-family: music-instuments ;
}
</style>