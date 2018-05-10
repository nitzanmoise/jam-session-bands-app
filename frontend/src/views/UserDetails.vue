<template>
   <div class="user-details-container">
    <section class="user-details"> 
        <div class="backround-img" :style="{ backgroundImage: `url(${user.coverImage})`}">  
            <div class="header-info">
                    <h1>{{user.fullName}}</h1>
                    <h3>{{user.location}}</h3>
                    <h4 v-for="genre in genres" :key="genre._id"> {{genre}} </h4>
           </div>
           <div style="    margin-right: 30%;
    margin-top: 5%;
    margin-bottom: 2%">
              <div class="img-container"  :style="{ backgroundImage: `url(${user.image})`}">
                   <!-- <img :src="user.image" class="user-image"> -->
              </div>
                   <button class="user-edit-btn" @click="goToUserEdit(user._id)" v-if="loggedinUser">Edit Your Profile!</button>
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
                <button @click="goToGroupEdit(group._id)" :disabled="!checkIfAdmin(group)">Edit This Group</button>
          </div>
      
      </div>

    <div class="about-reqs">
            <div class="about">
              <h3>About Myself</h3>
                {{user.description}}
            </div>
    <div class="reqs">
      <div class="req-container" v-if="currLoggedInUser && joinReqs.length > 0">
           <h1>Your Talents Requests:</h1>
           <div class="join-reqs" v-for="req in joinReqs" :key="req.createdAt">
            <span @click="goToAsker(req.asker._id)">{{req.asker.fullName}}&nbsp;</span> asked to join {{req.group.name}}
            <button @click="deleteReq(user._id, req.createdAt)">Cancel</button><button @click="addAskerToGroupMembers(req.asker._id, req.group._id); deleteReq(user._id, req.createdAt)" >Agree</button>
           </div>
      </div>
      <div style="padding: 15px;" v-if="currLoggedInUser && groupReqs.length> 0">
        <h1>Your Group Requests</h1>
         <div class="groupJoinReqs" v-for="groupReq in groupReqs" :key="groupReq.createdAt">
          <span @click="goToGroupDetails(groupReq.group._id)">{{groupReq.group.name}}</span> Wants you to join them!
        <div class="req-buttons">
          <button  @click="deleteReq(user._id, groupReq.createdAt)">Cancel</button>
          <button @click="addAskerToGroupMembers(user._id, groupReq.group._id); deleteReq(user._id, groupReq.createdAt) ">Agree</button>
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

export default {
  data() {
    return {
      user: {},
      // groups: {},
      joinReqs: [],
      groupReqs: []
    };
  },
  computed: {
    genres() {
      return this.user.genre;
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
    }
  },

  methods: {
    deleteReq(userId, timeStamp, user) {
      // console.log("deletereq", userId, timeStamp);
      this.$store
        .dispatch({ type: "deleteReq", userId, timeStamp })
        .then(res => {
          EventBusService.$emit(SHOW_MSG, {
            txt: `Request Removed`,
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
        .then(res => {
          EventBusService.$emit(SHOW_MSG, {
            txt: `Request Approved`,
            type: "success"
          });
        });
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
      this.user = user;

      this.$store.dispatch({ type: "getUserGroups", user }).then(groups => {
        // this.groups = groups.data;
      });
    });
    if (this.loggedinUser === null) return;
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
  }
};
</script>

<style scoped>
.req-container {
  padding: 15px;
}
.about-reqs {
  width: 100%;
  margin-left: 80px;
  height: 100%;
}
h4 {
  margin: 0;
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
  height: 30%;
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
  padding: 15px;
  margin: 0;
  font-size: 28px;
  font-family: Magettas Regular DEMO;
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

.el-button {
  color: orange;
  box-shadow: 0px 1px 64px -5px rgba(0, 0, 0, 0.36);
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