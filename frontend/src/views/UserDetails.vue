<template v-if="user">
   <div class="user-details-container">
    <section class="user-details"> 
        <div v-if="user" class="backround-img" :style="{ backgroundImage: `url(${user.coverImage})`}">  
            <div class="header-info">
                    <h1>{{user.fullName}}</h1>
                    <h3>{{user.location}}</h3>
                    <h4 v-for="genre in genres" :key="genre._id">
                            {{genre}}
                        </h4>
           </div>
           <div class="userPic" >
              <div class="img-container"  :style="{ backgroundImage: `url(${user.image})`}">
                   <!-- <img :src="user.image" class="user-image"> -->
              </div>
                   <button class="user-edit-btn" @click="goToUserEdit(user._id)" v-if="currLoggedInUser">Edit Your Profile!</button> <br>
                   <button class="remove-user" @click="deleteUser(user._id)" v-if="currLoggedInUser">Delete Account</button>
                   </div>
        </div>
  <div class="main-container">
    <div class="groups-container">
        <h1 class="groups-header">My Groups</h1>
      
          <div class="items" v-for="group in groups" :key="group._id" >
              <div class="group-img-container"  @click="goToGroupDetails(group._id)">
                    <img :src="group.image" class="group-image">
              </div>
               
                <h1 class="group-name" @click="goToGroupDetails(group._id)">{{group.name}}</h1>
                <button @click="goToGroupEdit(group._id)" v-if="checkIfAdmin(group)">Edit This Group</button>
          </div>
                    <button class='create-btn' v-if="currLoggedInUser" @click="openGroupCreate">Create Group</button>
                    <group-create @close="createGroup = false" :memberId="userId" v-if="createGroup && currLoggedInUser"></group-create>
      
      </div>

      

    <div class="about-reqs" v-if="user">
        <div class="about-talents flex">
            <div class="about">
              <h1 style="font-size: 1.5em; text-decoration: underline; color: orange; ">About Myself</h1>
                {{user.description}}
            </div>
            <div class="talents">
                    <h1 style="font-size: 1.5em; text-decoration: underline; color: orange; ">My Talents:</h1>
                    <div class="talant-img">
                    <div class="talent-emoji" v-for="(talant, idx) in user.talants" :key="idx">
                      <div >
                        <img :src="'./img/instruments/'+talant+'.png'" :title="talant" alt="" width="25px;" height="25px;">
                      </div>
                      <div class="talent-title-container "> 
                        <p>Player</p>
                      </div> 
                    </div>
                    </div>
                   
          <!-- <button @click="sendJoinReq" >Add me to your band</button> -->

            </div>
        </div> 
      <div class="reqs"  v-if="currLoggedInUser && joinReqs.length> 0 && groupReqs.length> 0">
        <div  class="req-container" v-if="currLoggedInUser && joinReqs.length> 0" >
            <h3>Requests From Jam Seesion Talents:</h3>
            <div class="join-reqs" v-for="req in joinReqs" :key="req.createdAt">
              <span @click="goToAsker(req.asker._id)">{{req.asker.fullName}}&nbsp;</span> asked to join {{req.group.name}}
              <button @click="deleteReq(user._id, req.createdAt)">Cancel</button><button @click="addAskerToGroupMembers(req.asker._id, req.group._id); deleteReq(user._id, req.createdAt)" >Agree</button>
            </div>
        </div>
        <div style="" v-if="currLoggedInUser && groupReqs.length> 0">
          <h3>Requests From Jam Session Groups:</h3>
          <div class="groupJoinReqs" v-for="groupReq in groupReqs" :key="groupReq.createdAt">
            <span @click="goToGroupDetails(groupReq.group._id)">{{groupReq.group.name}}</span> Wants you to join them!
          <div class="req-buttons">
            <button  @click="deleteReq(user._id, groupReq.createdAt)">Cancel</button>
            <button @click="addAskerToGropMembers(user._id, groupReq.group._id); deleteReq(user._id, groupReq.createdAt) ">Agree</button>
          </div>
          </div>
        </div>  
      </div> 
      <div class="wall">
          <h1 style="font-size: 1.5em; text-decoration: underline;color: orange;">Wall</h1>
          <form action.prevent="submit" class="flex">
          <textarea v-model="newPost" name="" id="" cols="30" rows="10"  @submit="addPost(group._id)"></textarea>
          <div class="submit" @click="addPost(user._id)" type="submit">Add post</div>
          </form>
          <h3></h3>
          <div class="posts-container" v-if="user.posts.length > 0">
        <div >
          <div  v-for="(post, idx) in user.posts" :key="idx">
          <span style="text-decoration: underline;">  {{post.senderName}} says:  </span><br> <br><div style="" class="content">{{post.content}}</div><br><br>
          </div>
        </div> 
      </div>
      </div>     
    </div>

  </div>    
    </section>
</div>
</template>

<script>
import EventBusService, { SHOW_MSG } from "../services/EventBusService.js";
import logIn from "../components/Login.vue";
import groupCreate from "../components/GroupCreate.vue";
export default {
  data() {
    return {
      newPost: "",
      joinReqs: [],
      groupReqs: [],
      createGroup: false,
      loginModal: false
    };
  },
  computed: {
    genres() {
      return this.user.genre;
    },
    user() {
      return this.$store.getters.currUserForDisplay;
    },
    groups() {
      return this.$store.getters.userGroups;
    },
    addMember() {},
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    currLoggedInUser() {
      if (this.loggedinUser === null) return;
      if (this.loggedinUser._id === this.user._id) return true;
    },
    userId() {
      return this.$route.params.id;
    }
  },

  methods: {
    openGroupCreate() {
      this.createGroup = true;
    },
    addPost(userId) {
      console.log("this is user idddddddddd, ", userId);

      var newPost = {
        content: this.newPost,
        senderId: this.loggedinUser._id,
        senderName: this.loggedinUser.fullName,
        senderImage: this.loggedinUser.image,
        createdAt: Date.now()
      };

      this.$store
        .dispatch({ type: "addUserPost", userId, newPost })
        .then(() => (this.newPost = ""));
    },
    deleteUser(userId) {
      this.$store.dispatch({ type: "deleteUser", userId }).then(user => {
        this.$router.push(`/`);
        this.$store.dispatch("logout").then(() => {});
        EventBusService.$emit(SHOW_MSG, {
          txt: `Your Accout Was Deleted`,
          type: "success"
        });
      });
    },
    sendJoinReq() {
      EventBusService.$on(GROUP_ID, () => {});
    },
    deleteReq(userId, timeStamp, user) {
      // console.log("deletereq", userId, timeStamp);
      this.$store
        .dispatch({ type: "deleteReq", userId, timeStamp })
        .then(res => {
          EventBusService.$emit(SHOW_MSG, {
            txt: `Request Processed`,
            type: "success"
          });
        });
    },
    goToGroupDetails(id) {
      console.log("this is group id", id);
      this.$router.push(`/GroupDetails/${id}`);
    },
    goToGroupEdit(id) {
      this.$router.push(`/Group/Edit/${id}`);
    },
    goToUserEdit(id) {
      this.$router.push(`/UserEdit/${id}`);
    },
    goToAsker(id) {
      this.$router.push(`/UserDetails/${id}`);
    },
    addAskerToGroupMembers(askerId, groupId) {
      console.log("this is asker is", askerId, "this is group id", groupId);
      this.$store
        .dispatch({
          type: "addAskerToGroupMembers",
          askerId,
          groupId
        })
        .then(res => {});
    },
    checkIfAdmin(group) {
      if (!this.loggedinUser) return false;
      var member = group.members.find(({ id }) => id === this.loggedinUser._id);
      return member ? member.isAdmin : false;
    }
  },
  created() {
    var userId = this.$route.params.id;
    this.$store.dispatch({ type: "getUserById", userId }).then(user => {
      // this.user = user;
      console.log("this is user", this.user);
      console.log("this is loggedin", this.loggedinUser);

      this.$store.dispatch({ type: "getUserGroups", user }).then(groups => {
        // this.groups = groups.data;
      });
    });
    if (this.loggedinUser === null) return;
    var joinReqPrms = this.loggedinUser.joinReqs.map(
      ({ askerId, groupId, createdAt }) => {
        var askerPrm = this.$store.dispatch({
          type: "getUserForReq",
          userId: askerId
        });
        var groupToJoinPrm = this.$store.dispatch({
          type: "getGroupById",
          groupId
        });
        return Promise.all([askerPrm, groupToJoinPrm, createdAt]);
      }
    );

    Promise.all(joinReqPrms)
      .then(reqs =>
        reqs.map(([asker, group, createdAt]) => {
          return { asker, group, createdAt };
        })
      )
      .then(reqs => (this.joinReqs = reqs));

    var groupJoinReqPrms = this.loggedinUser.groupJoinReq.map(
      ({ groupId, userId, createdAt }) => {
        return this.$store
          .dispatch({
            type: "getGroupById",
            groupId
          })
          .then(group => {
            return { group, createdAt };
          });
      }
    );
    Promise.all(groupJoinReqPrms).then(
      groupsReqs => (this.groupReqs = groupsReqs)
    );
  },
  watch: {
    loggedinUser: {
      handler() {
        var joinReqPrms = this.loggedinUser.joinReqs.map(
          ({ askerId, groupId, createdAt }) => {
            var askerPrm = this.$store.dispatch({
              type: "getUserById",
              userId: askerId
            });
            var groupToJoinPrm = this.$store.dispatch({
              type: "getGroupById",
              groupId
            });
            return Promise.all([askerPrm, groupToJoinPrm, createdAt]);
          }
        );

        Promise.all(joinReqPrms)
          .then(reqs =>
            reqs.map(([asker, group, createdAt]) => {
              return { asker, group, createdAt };
            })
          )
          .then(reqs => {
            this.joinReqs = reqs;
            // alert("chiko menash");
          }); // this.loggedinUser.joinReqs.forEach(joinReq => {
        var groupJoinReqPrms = this.loggedinUser.groupJoinReq.map(
          ({ groupId, userId, createdAt }) => {
            return this.$store
              .dispatch({
                type: "getGroupById",
                groupId
              })
              .then(group => {
                return { group, createdAt };
              });
          }
        );
        Promise.all(groupJoinReqPrms).then(
          groupsReqs => (this.groupReqs = groupsReqs)
        );
      },
      deep: true
    }
  },
  components: {
    groupCreate
  }
};
</script>

<style scoped>
.wall {
  border: 1px solid rgba(223, 220, 220, 0.521);
  padding: 5%;
  /* width: 180%; */
}
.posts-container {
  background-color: rgba(247, 202, 105, 0.226);
  border-radius: 25px;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.39);
}
.submit {
  line-height: 25px;
  text-align: center;
  border: 2px solid rgba(226, 226, 226, 0.548);
  height: 100%;
  /* padding: 10px; */
  color: orange;
  font-family: Magettas Regular DEMO;
  height: 50px;
  /* border-radius: 50px; */
  font-size: 1.2em;
  background-color: white;
  /* margin-bottom: 15px; */
  cursor: pointer;
}
textarea {
  height: 20px;
  width: 100%;
  float: left;
  padding: 15px;
  font-size: 1.5em;
}
.wall h1 {
  color: orange;
}
.talent-emoji {
  margin-left: 15px;
}

.talent-title {
  margin-right: 20px;
  margin-left: 20px;
}
.talent-tilte-container {
  align-items: flex-end;
}
.talents {
  width: 60%;
  padding: 1% 5%;

  border: 2px solid rgba(226, 226, 226, 0.548);
}
.talant-img {
  /* margin-left: 20px; */
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
}
.talent-img img {
  margin-right: 15px;
  padding-top: 10px;
}

.req-container {
  padding: 1% 5%;
  /* border: 2px solid rgba(226, 226, 226, 0.548); */
}
.about-reqs {
  width: 100%;
  height: 100%;
}

.reqs {
  display: flex;
  flex-direction: row;
  height: 500px;
  width: 75%;
  margin: 0;
}
.req-buttons {
  display: flex;
  flex-direction: row wrap;
}
.groupJoinReqs {
  border: 1px solid rgba(223, 220, 220, 0.521);
  width: 275px;
  margin-bottom: 5px;
}
.join-reqs {
  display: flex;
  flex-flow: row wrap;
  border: 1px solid rgba(223, 220, 220, 0.521);
  font-family: Magettas Regular DEMO;
  width: 250px;
  margin-right: 30px;
  margin-bottom: 5px;
}

.items {
  width: 70%;
  margin: 20px auto;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  border: 1px solid rgba(223, 220, 220, 0.521);
  margin-bottom: 10px;
}
.userPic {
  margin-right: 30%;
  margin-top: 8%;
  margin-bottom: 2%;
}
.user-details {
  width: 100%;
}
.user-details-container {
  font-family: Magettas Regular DEMO;
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  background-color: white;
}
.backround-img {
  display: flex;
  justify-content: space-around;
  border: solid 5px black;

  background-size: cover;
  background-position: center;
  height: 390px;
}
.user-image {
  width: 35%;
  border: solid snow 2px;
  background-size: cover;
  box-shadow: gray 1px inset;
}
.img-container {
  width: 100px;
  height: 120px;
  padding: 25%;
  /* padding-top: 5%; */
  padding-bottom: 2%;
  display: flex;
  flex-flow: column wrap;
  /* background-size: cover; */
  /* background-position: center; */
  background-repeat: no-repeat;
  /* width: 35%; */
  margin-right: 60%;

  border: solid snow 2px;
  background-size: cover;
  box-shadow: gray 1px inset;
}

.groups-card {
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-flow: column wrap;
  background-color: whitesmoke;
  border: 1px solid rgba(223, 220, 220, 0.521);
  height: 100%;
  cursor: pointer;

  margin-bottom: 20px;
}
.group-image {
  width: 150px;
  cursor: pointer;
  border-radius: 50%;
  border: solid rgb(199, 182, 182) 5px;
  background-size: cover;
  box-shadow: gray 1px inset;
  margin-top: 10px;
}
.groups-container {
  display: flex;
  flex-direction: column;
  width: 500px;
  overflow-y: scroll;
}
.groups-header {
  font-family: Shrikhand-Regular;
  color: orange;
  font-size: 2em;
  width: 100%;
  text-align: center;
  padding: 10px;
  margin: 0;
}
.group-name {
  font-family: Magettas Regular DEMO;
  cursor: pointer;
  text-align: center;
  float: left;
  font-size: 1.3em;
  color: gray;
  border-bottom: 1px solid rgba(223, 220, 220, 0.521);
  width: 100%;
  padding-bottom: 10px;
  margin-bottom: 7px;
  margin-top: 0;
}
.about {
  width: 60%;
  align-content: flex-end;
  padding: 1% 5%;

  border: 2px solid rgba(226, 226, 226, 0.548);
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
  margin-top: 8%;
}
.main-container {
  display: flex;
}
button {
  line-height: 50%;
  border: 2px solid rgba(226, 226, 226, 0.548);
  padding: 10px;
  color: orange;
  font-family: Magettas Regular DEMO;
  height: 30px;
  border-radius: 50px;
  font-size: 1em;
  background-color: white;
  cursor: pointer;
  margin-bottom: 5px;
}
.user-edit-btn {
  width: 173px;
  border-radius: 50px;
  margin-top: 10px;
  margin-left: 25px;
  font-size: 1.2em;
  line-height: 50%;
  background-color: white;
}
.remove-user {
  width: 173px;
  border-radius: 50px;
  margin-top: 10px;
  margin-left: 25px;
  font-size: 1.2em;
  line-height: 50%;
  background-color: white;
}

.el-button {
  color: orange;
  box-shadow: 0px 1px 64px -5px rgba(0, 0, 0, 0.36);
}
.create-btn {
  width: 80%;
  height: 40px;
  border-radius: 50px;
  font-size: 1.7em;
  line-height: 50%;
  background-color: white;
  justify-self: center;
  align-self: center;
}
@media (max-width: 720px) {
  .userPic {
    margin-right: 30%;
    margin-bottom: 2%;
    margin-top: 14%;
    margin-left: 29%;
  }
  .header-info {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    margin: 0;
    padding: 0;
  }
  .user-details-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 100%;
  }
  .remove-user {
    width: 173px;
    border-radius: 50px;
    margin-top: 10px;
    margin-left: 17px;
    font-size: 1.2em;
    line-height: 50%;
    background-color: white;
  }
  .user-edit-btn {
    width: 173px;
    border-radius: 50px;
    margin-top: 10px;
    margin-left: 17px;
    font-size: 1.2em;
    line-height: 50%;
    background-color: white;
  }
  .about-reqs {
    padding: 0;
    margin: 0;
  }
  .main-container {
    flex-flow: column wrap;
    width: 100%;
  }
  .backround-img {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: distribute;
    /* justify-content: space-around; */
    border: solid 5px black;
    background-size: cover;
    background-position: center;
    height: 630px;
    flex-flow: column-reverse nowrap;
  }
  .about {
    justify-content: center;
    justify-items: center;
    align-content: center;
    align-items: center;
    width: 100%;
    display: flex;
    flex-flow: column wrap;
    padding: 0;
    margin: 0;
  }
  .talents {
    justify-content: center;
    justify-items: center;
    align-content: center;
    align-items: center;
    width: 100%;
    display: flex;
    flex-flow: column wrap;
    padding: 0;
    margin: 0;
  }
  .groups-container {
    width: 100%;
    display: flex;
    flex-flow: column wrap;
    padding: 0;
    margin: 0;
  }
  .items {
    width: 100%;
    padding: 0;
    margin: 0;
  }

  .reqs {
    justify-content: center;
    justify-items: center;
    align-content: center;
    align-items: center;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    padding: 0;
    margin: 0;
  }
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
  font-family: Magettas Regular DEMO;
  src: url("../../public/fonts/magettas-demo/Magettas Regular DEMO.otf");
}
@font-face {
  font-family: music-instuments;
  src: url("../../public/fonts/kr-music-class/music-instuments.ttf");
}
h5 {
  font-family: music-instuments;
}
@font-face {
  font-family: Shrikhand-Regular;
  src: url("../../public/fonts/Shrikhand/Shrikhand-Regular.ttf");
}
</style>