<template>
<div v-if="group && members" class="group-details-container">
        <div class="backround-img" :style="{ backgroundImage: `url(${group.coverImage})`}" style="    background-position: center;">
                <div class="header-info">
                    <h1>{{group.name}}</h1>
                    <h3>{{group.location}}</h3>
                    <div>
                        <h4 v-for="genre in genres" :key="genre._id">
                            {{genre}}
                        </h4>
                    </div>
                </div>
                <div class="img-container">
                <div >
                    <img :src="group.image" class="group-image">
                </div>
                    <button class="del-btn" v-if="currLoggedInUser"  @click="deleteGroup(group._id)">Delete Group</button>
                </div>
                
            </div>
  <section class="group-details"> 
                <div class="members-container">
                    <!-- <div>  -->
                    <h1 class="members-header">Members</h1>
                    <div class="card">
                    <button class="button" style="width: 250px;" v-if="currLoggedInUser"  @click="routeToUsers(group._id)"> Add a Member</button>
                        <div v-for="member in members" :key="member._id" class="member-details">
                            <div class="member-img-container" @click="goToMemberDetails(member._id)" :style="{ backgroundImage: `url(${member.image})`}">
                                <!-- <img :src="member.image" class="member-image"> -->
                           
                            </div>
                            <h1 class="member-name" @click="goToMemberDetails(member._id)">{{member.fullName}}</h1>
                            <div class="member-name-container">
                                <div class="talant-imgs">
                                    <div v-for="talant in member.talants" :key="talant._id">
                                        <img :src="'./img/instruments/'+talant+'.png'" :title="talant" alt="" width="25px;" height="25px;">
                                    </div>
                                    
                                </div>
                            </div>
                            <div>
                                <button class="button" stysle="width: 150px;" v-if="currLoggedInUser"  @click="removeMember(member._id)">Remove Member</button>
                            </div>
                        </div>
                    </div>
                </div>
            <div class="main-container">
                <div class="about flex">
                  <div class="about-container">
                    <h1 style="font-size: 2em">Who are we?</h1>
                    <h3>{{group.about}}</h3>
                  </div>  
                    <!-- <iframe allowtransparency="true" scrolling="no" frameborder="no" :src="'https://w.soundcloud.com/icon/?url=http%3A%2F%2Fsoundcloud.com%2F'+group.name+'&color=orange_white&size=32'" style="width: 32px; height: 32px;">
                    </iframe> -->
                <div class="need">
                    <h1 style="font-size: 2em" >Looking for:</h1>
                    <div class="need-img" v-for="need in needs" :key="need._id">
                      <div>
                        <img :src="'./img/instruments/'+need+'.png'" :title="need" alt="" width="25px;" height="25px;">
                      </div>
                      <div class="need-title-container "> 
                        <h4>Player</h4>
                      </div> 
                    </div>
                    <button @click="sendJoinReq(group._id)" type="text" class="button">Join The Band</button>

                </div>
                </div>
      <div class="wall">
          <h1>Group wall</h1>
          <form action.prevent="submit" class="flex">
          <textarea v-model="newPost" name="" id="" cols="30" rows="10"></textarea>
          <button @click="addPost(group._id)" type="submit">Add post</button>
          </form>
          <h3>Group posts</h3>
        <div v-if="group && group.posts.length">
          <div  v-for="(post, idx) in group.posts" :key="idx">
          <span>  {{post.senderName}} says:  </span><br> <br><span style="" class="content">{{post.content}}</span><br><br>
          </div>
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
      newPost: ""
    };
  },
  methods: {
    removeMember(memberId) {
      this.$store
        .dispatch({
          type: "removeMember",
          groupId: this.group._id,
          memberId
        })
        .then(() => {
          var userMsg = {
            txt: "Member Removed From This Group!",
            type: "success"
          };
          EventBusService.$emit(SHOW_MSG, userMsg);
        });
    },
    deleteGroup(groupId) {
      console.log("THIS IS GROUP ID", groupId);
      this.$store.dispatch({ type: "deleteGroup", groupId });
    },
    goToMemberDetails(id) {
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

      this.$store
        .dispatch({ type: "addPost", groupId, newPost })
        .then(() => (this.newPost = ""));
    },
    sendJoinReq(groupId) {
      if (!this.loggedinUser) {
        var userMsg = {
          txt: "You are not logged in! please log in to send join requests!",
          type: "error"
        };
        EventBusService.$emit(SHOW_MSG, userMsg);
      } else {
        var askerId = this.loggedinUser._id;
        var askerName = this.loggedinUser.fullName;
        var createdAt = Date.now();
        var joinReq = { askerId, askerName, groupId, createdAt };
        var admins = this.group.members.filter(({ isAdmin }) => isAdmin);
        this.$store
          .dispatch({ type: "updateReqs", joinReq, admins })
          .then(() => {
            var userMsg = {
              txt: "Join Request Sent!",
              type: "success"
            };
            EventBusService.$emit(SHOW_MSG, userMsg);
          });
      }
    },
    routeToUsers(id) {
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
    members() {
      return this.$store.getters.groupMembersToDisplay;
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
    console.log("thius is curr #group", this.group);

    var groupId = this.$route.params.id;
    this.$store.dispatch({ type: "getGroupById", groupId }).then(group => {
      // this.group = group;
      this.$store.dispatch({ type: "getGroupMembers", group }).then(members => {
        // this.members = members.data;
        // console.log("memebers", this.members);
      });
    });
  }
  // watch: {
  //   loggedinUser: {
  //     handler() {},
  //     deep: true
  //   }
  // }
};
</script>

<style scoped>
.about-container {
  width: 60%;
  align-content: flex-end;
}
.need-title {
  margin-right: 20px;
  margin-left: 20px;
}
.need-tilte-container {
  align-items: flex-end;
}
.wall {
  border: 1px solid rgba(223, 220, 220, 0.521);
  padding: 5%;
  /* width: 180%; */
}
.wall h1 {
  color: orange;
}
textarea {
  height: 50px;
  width: 100%;
  float: left;
}
.group-details-container {
  font-family: Magettas Regular DEMO;
  display: flex;
  flex-flow: column;
  height: 100%;
  width: 100%;

  /* margin-left: 1%; */
  /* background-color: white; */
}
.del-btn {
  width: 36%;
  line-height: 50%;
  border: 2px solid rgba(226, 226, 226, 0.548);
  padding: 10px;
  color: orange;
  font-family: Magettas Regular DEMO;
  height: 30px;
  border-radius: 50px;
  font-size: 1.2em;
  background-color: white;
  margin-bottom: 15px;
  cursor: pointer;
}
.group-details {
  display: flex;
  /* flex-direction: column; */
  /* justify-content: space-around; */
}
.backround-img {
  display: flex;
  justify-content: space-around;
  background-image: url("../../public/img/band.jpg");
  background-size: cover;
  background-position: bottom;
  border: solid 5px black;
  /* width: 100%; */
  height: 25%;
}
.group-image {
  width: 35%;
  border: solid snow 2px;
  background-size: cover;
  box-shadow: gray 1px inset;
}
.img-container {
  width: 55%;
  /* margin-right: 20%; */

  padding-top: 5%;
  padding-bottom: 2%;
}
.member-image {
  width: 40%;
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
  overflow-y: scroll;
  width: 500px;
}
.member-details {
  display: flex;
  flex-flow: column nowrap;
  text-align: center;
  background-color: whitesmoke;
  border: 1px solid rgba(223, 220, 220, 0.521);
  height: 100%;
  text-align: center;
  cursor: pointer;
  padding-top: 20px;

  margin-bottom: 20px;
}
.members-header {
  font-family: Shrikhand-Regular;
  color: orange;
  font-size: 2em;
  width: 35%;
  text-align: center;
  padding: 10px;
  margin-left: 35px;
}
/* .member-name-container h3 {
  float: left;
} */
.member-img-container {
  background-size: cover;
  background-position: center center;
  width: 100px;
  height: 100px;
  margin-left: 70px;
  margin-right: 70px;
  padding: 0;
  cursor: pointer;
  border-radius: 50%;
  border: solid rgb(199, 182, 182) 5px;
  background-size: cover;
  box-shadow: gray 1px inset;
}

.card {
  height: 250px;
  width: 250px;
}

.talant-imgs {
  display: flex;
  align-items: flex-end;
}
.about {
  margin-top: 4%;
  /* font-size: 28px; */
  /* width: 35%; */
  width: 100%;
  padding-left: 5%;
}

.member-name {
  font-family: Magettas Regular DEMO;
  cursor: pointer;
  text-align: center;
  float: left;
  font-size: 1.3em;
  color: gray;
  border-bottom: 1px solid rgba(223, 220, 220, 0.521);
  width: 80%;

  padding-bottom: 10px;
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
.content {
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 5px;
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
  flex-direction: column;
  width: 100%;
}
.member-name-container {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  margin-top: 10px;
}

.need {
  /* margin-left: 100%; */
  width: 55%;
}
.need-img {
  /* margin-left: 20px; */
  display: flex;
  text-align: center;
  align-content: center;
}
.need-img img {
  margin-right: 15px;
  padding-top: 10px;
}
.button {
  line-height: 50%;
  border: 2px solid rgba(226, 226, 226, 0.548);
  padding: 10px;
  color: orange;
  font-family: Magettas Regular DEMO;
  height: 30px;
  border-radius: 50px;
  font-size: 1.2em;
  background-color: white;
  margin-bottom: 15px;
  cursor: pointer;
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
@media (max-width: 720px) {
  .group-details-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 100%;
  }
  .backround-img {
    width: 100%;
  }
  .del-btn {
    width: 70%;
  }

  .group-details {
    flex-flow: row wrap;
    justify-content: center;
    justify-items: center;
    align-content: center;
    align-items: center;
  }
  .about {
    flex-flow: row wrap;
    justify-content: center;
    justify-items: center;
    align-content: center;
    align-items: center;
  }
  .about-container {
    width: 100%;
    text-align: center;
  }
  .need {
    width: 100%;
    text-align: center;
  }
  .need-img {
    text-align: center;
    align-content: center;

    justify-content: center;
  }
  .group-image {
    width: 70%;
    background-size: contain;
  }
  .members-header {
    margin: 0;
    padding-top: 20px;
    width: 100%;
  }
  .members-container {
    margin-left: 0px;
    overflow: auto;
    justify-content: center;
    justify-items: center;
    align-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
  }
}
</style>