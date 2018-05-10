<template>
<div v-if="group" class="group-details-container">
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
            <div class="card">
            <div v-for="member in members" :key="member._id" class="member-details" >
                <div class="member-img-container" @click="goToMemberDetails(member._id)" :style="{ backgroundImage: `url(${member.image})`}">
                    <!-- <img :src="member.image" class="member-image"> -->
                </div>
                <div class="member-name-container">
                    <h1 class="member-name" @click="goToMemberDetails(member._id)">{{member.fullName}}</h1>
                    <div  v-for="talant in member.talants" :key="talant._id">
                        <img :src="'./img/instruments/'+talant+'.png'" :title="talant" alt="" width="25px;" height="25px;">                        
                    </div>   
                  </div>
                </div>
            </div>

                 <button v-if="currLoggedInUser" class="addMember" @click="routeToUsers(group._id)"> Add a Member</button>
            
          </div>
        <div class="about">
                <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/428166729&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
          <h1>Who are we?</h1>
                <h3>{{group.about}}</h3>
                <!-- <iframe allowtransparency="true" scrolling="no" frameborder="no" :src="'https://w.soundcloud.com/icon/?url=http%3A%2F%2Fsoundcloud.com%2F'+group.name+'&color=orange_white&size=32'" style="width: 32px; height: 32px;">
                </iframe> -->
              
        </div>  
        <div class="need">
            <h3>Looking for:</h3> 
              <div class="need-img" v-for="need in needs" :key="need._id">
                  <img  :src="'./img/instruments/'+need+'.png'" alt=""  width="25px;" height="25px;">
                  <h3>Talent</h3> 
              </div>
          <el-button @click="sendJoinReq(group._id)" type="text" class="button">Join The Band</el-button>
      </div>    
        </div>  
      <div class="wall">
        <form action.prevent="submit">
        <textarea v-model="newPost" name="" id="" cols="30" rows="10"></textarea>
        <button @click="addPost(group._id)" type="submit">Post</button>
        </form>
       <div v-if="group && group.posts.length">
        <div  v-for="(post, idx) in group.posts" :key="idx">
          {{post.senderName}} says: {{post.content}}
        </div>
       </div> 
      </div>
    </section>
</div>
</template>

<script>
import EventBusService, { SHOW_MSG } from "../services/EventBusService.js";

export default {
  data() {
    return {
      // group: {},
      members: {},
      newPost: ""
    };
  },
  methods: {
    goToMemberDetails(id) {
      console.log("this is member id", id);
      this.$router.push(`/UserDetails/${id}`);
    },
    addPost(groupId) {
      var newPost = {
        content: this.newPost,
        senderId: this.loggedinUser._id,
        senderName: this.loggedinUser.fullName,
        senderImage: this.loggedinUser.image,
        createdAt: Date.now()
      };
      console.log("group id", groupId, "new post", newPost);

      this.$store
        .dispatch({ type: "addPost", groupId, newPost })
        .then(() => (this.newPost = ""));
    },
    sendJoinReq(groupId) {
      if (!this.loggedinUser) {
        console.log("you not logged in");
      } else {
        console.log("yes you log in", this.group.members, this.loggedinUser);
        var askerId = this.loggedinUser._id;
        var askerName = this.loggedinUser.fullName;
        var createdAt = Date.now();
        var joinReq = { askerId, askerName, groupId, createdAt };
        console.log("thi is join req", joinReq);

        var admins = this.group.members.filter(({ isAdmin }) => isAdmin);
        this.$store.dispatch({ type: "updateReqs", joinReq, admins });
      }
    },
    routeToUsers(id) {
      console.log("group id", id);

      this.$router.push(`/usersPage/${id}`);
      var userMsg = {
        txt: "Check Out Our Users! Add Them To Your Band!",
        type: "info"
      };
      EventBusService.$emit(SHOW_MSG, userMsg);
      this.$emit("close");
    }
  },
  computed: {
    group() {
      return this.$store.getters.currGroupForDisplay;
    },
    genres() {
      return this.group.genre;
    },
    needs() {
      return this.group.need;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    currLoggedInUser() {
      if (!this.loggedinUser || !this.group.members) return;
      console.log("group members", this.group.members);

      var currMemberAdmin = this.group.members.find(member => {
        return member.isAdmin && member.id === this.loggedinUser._id;
      });
      if (currMemberAdmin) return true;
    }
  },
  created() {
    console.log("i am the crested of detials");
    var groupId = this.$route.params.id;
    this.$store.dispatch({ type: "getGroupById", groupId }).then(group => {
      // this.group = group;
      this.$store.dispatch({ type: "getGroupMembers", group }).then(members => {
        this.members = members.data;
        console.log("memebers", this.members);
      });
    });
  }
};
</script>

<style scoped>
.group-details-container {
  font-family: Magettas Regular DEMO;
  display: flex;
  /* width: 98%; */
  flex-flow: column;
  height: 100%;
  width: 100%;

  /* margin-left: 1%; */
  background-color: white;
}
.group-details {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.backround-img {
  display: flex;
  justify-content: space-around;
  background-image: url("../../public/img/band.jpg");
  background-size: cover;
  background-position: bottom;
  width: 100%;
  height: 25%;
}
.group-image {
  width: 35%;
  border: solid snow 2px;
  background-size: cover;
  box-shadow: gray 1px inset;
}
.img-container {
  /* width: 55%; */

  padding-top: 5%;
  padding-bottom: 2%;
}
.member-image {
  width: 30%;
  cursor: pointer;
  border-radius: 50%;
  border: solid rgb(199, 182, 182) 5px;
  background-size: cover;
  box-shadow: gray 1px inset;
  /* margin-left: 24px; */
}
.members-container {
  margin-left: 30px;
  display: flex;
  flex-direction: column;
}
.member-details {
  text-align: center;
  cursor: pointer;
  border-radius: 20px;
  box-shadow: 2px 4px 54px 0px rgba(0, 0, 0, 0.62);
  background-color: #eeeeee;
  width: 170px;
  height: 250px;
  margin-bottom: 20px;
  padding: 10px;
}
.members-header {
  font-family: Shrikhand-Regular;
  color: orange;
  font-size: 2em;
  width: 35%;
  text-align: center;
  padding: 10px;
}
/* .member-name-container h3 {
  float: left;
} */
.member-img-container {
  background-size: cover;
  background-position: center center;
  width: 100px;
  height: 100px;
  margin-left: 30px;
  margin-top: 0px;
  padding: 0;
  cursor: pointer;
  border-radius: 50%;
  border: solid rgb(199, 182, 182) 5px;
  background-size: cover;
  box-shadow: gray 1px inset;
}
.member-name-container img {
  padding: 20px;
}
.about {
  margin-top: 4%;
  /* font-size: 28px; */
  width: 35%;
  padding-left: 5%;
}

.member-name {
  font-family: Magettas Regular DEMO;
  cursor: pointer;
  margin-left: 10px;
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
.main-container {
  display: flex;
}
.need {
  /* display: flex; */
  flex-direction: row;
  justify-content: space-around;
  margin-top: 3%;
  /* width: 8%; */
  margin-left: 5%;
}
.need-img {
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
}
.need-img img {
  margin-right: 15px;
  padding-top: 10px;
}
.button {
  font-size: 1.5em;
  /* margin-top: 10%; */
  color: orange;
  margin-top: 40%;
  /* border: orange solid 1px; */
}
/* .need div{
  }
.need-img{
  margin-left: -20px;
  
} */
@font-face {
  font-family: Condition3D-Italic;
  src: url("../../public/fonts/Condition3D-Italic.ttf");
}
@font-face {
  font-family: Painting_With_Chocolate;
  src: url("../../public/fonts/Painting_With_Chocolate_regular/Painting_With_Chocolate.ttf");
}
@font-face {
  font-family: music-instuments;
  src: url("../../public/fonts/kr-music-class/music-instuments.ttf");
}
@font-face {
  font-family: Magettas Regular DEMO;
  src: url("../../public/fonts/magettas-demo/Magettas Regular DEMO.otf");
}
@font-face {
  font-family: Shrikhand-Regular;
  src: url("../../public/fonts/Shrikhand/Shrikhand-Regular.ttf");
}
</style>