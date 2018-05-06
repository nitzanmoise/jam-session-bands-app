<template>
<div class="group-details-container">
    <section class="group-details"> 
        <div class="backround-img">
                <div class="header-info">
                     <h1>{{group.name}}</h1>
                    <h3 >{{group.location}}</h3>
                    <div>
                        <h4 v-for="genre in genres" :key="genre._id">
                            {{genre}}   
                        </h4>
                    </div>
                </div>
                <div class="img-container">
                    <img :src="group.image" class="group-image">
                </div>
                
        </div>
        <div class="main-container">
          <div class="members-container">
           <!-- <div>  -->
            <h1 class="members-header">Members</h1>
            <div v-for="member in members" :key="member._id" class="member-details" >
                <div class="member-img-container" @click="goToMemberDetails(member._id)">
                    <img :src="member.image" class="member-image">
                </div>
                <div class="member-name-container">
                    <h1 class="member-name" @click="goToMemberDetails(member._id)">{{member.fullName}}</h1>
                    <h3 v-for="talant in member.talants" :key="talant._id">
                        {{talant}}
                    </h3>   
                </div>
            </div>
          </div>
        <div class="about">
                <h2>{{group.about}}</h2>
                <iframe allowtransparency="true" scrolling="no" frameborder="no" src="https://w.soundcloud.com/icon/?url=http%3A%2F%2Fsoundcloud.com%2Fnitzan-moise&color=orange_white&size=32" style="width: 32px; height: 32px;">
                </iframe>
            <h2>Looking for:</h2>      
            <h1 v-for="need in needs" :key="need._id">
                {{need}}
            </h1>
        </div>  
        </div>    
    </section>
</div>
</template>

<script>
export default {
  data() {
    return {
      group: { name: "" },
      members: {},
    //   genres : this.group.genre
    };
  },
  methods:{
      goToMemberDetails(id){
       console.log('this is member id', id);
        this.$router.push(`/UserDetails/${id}`)
          
      }
  },
  computed: {
          genres(){
            return  this.group.genre
      },
       needs(){
            return  this.group.need
      },
        //   talents(){
        //       return this.members.talents
        //   }
  },
  created() {
    var groupId = this.$route.params.id;
    console.log("this is groupid", groupId);
    this.$store.dispatch({ type: "getGroupById", groupId }).then(group => {
      this.group = group;
      console.log('this ig genres', this.group.genre);
      
      console.log("this is group", group);
      this.$store.dispatch({ type: "getGroupMembers", group }).then(members => {
        console.log("this is group members", members.data);
        this.members = members.data;
      });
    });
  }
};
</script>

<style scoped>
.group-details-container {
  font-family: "Interstate", "Lucida Grande", "Lucida Sans Unicode",
    "Lucida Sans", Garuda, Verdana, Tahoma, sans-serif;

  /* width: 98%; */
  height: 100%;
  /* margin-left: 1%; */
  background-color: white;
  display:flex;
  flex-flow: column wrap;
}
.backround-img {
  display: flex;
  justify-content: space-around;
  background-image: url("../../public/img/band.jpg");
  background-size: cover;
  background-position: bottom;
  height: 20%;
}
.group-image {
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
.member-image {
  width: 25%;
  cursor: pointer;
  border-radius: 50%;
  border: solid rgb(199, 182, 182) 5px;
  background-size: cover;
  box-shadow: gray 1px inset;
  margin-left: 25px;
}
.members-container {
  padding-left: 5%;
  padding-top: 5%;
  display: flex;
  flex-direction: column;
  
}
 .members-header{
     font-family:  Painting_With_Chocolate;
    color: orange;
    font-size: 2em;
    width: 35%;
   text-align: center;
   padding: 10px;
    }
.member-name-container h3{
    float: left;
}    
.about {
    margin-top: 10%;
    font-size: 28px;
}
.member-name {
    font-family:Condition3D-Italic;
  cursor: pointer;
    width: 35%;
  text-align: center;
  float: left;
  
}
.group-details-container {
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
.main-container{
    display: flex;
}
@font-face {
    font-family: Condition3D-Italic;
    src: url('../../public/fonts/Condition3D-Italic.ttf');
}
@font-face {
    font-family: Painting_With_Chocolate;
    src: url('../../public/fonts/Painting_With_Chocolate_regular/Painting_With_Chocolate.ttf');
}
@font-face {
    font-family: music-instuments ;
    src: url("../../public/fonts/kr-music-class/music-instuments.ttf");
}
h5{
    color: steelblue;
    font-family: music-instuments ;
    font-size: 30px;
}    
</style>