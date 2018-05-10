<template>
   <div class="user-details-container">
    <section class="user-details"> 
        <div class="backround-img">  
            <div class="header-info">
                    <h1>{{user.fullName}}</h1>
                    <h3>{{user.location}}</h3>
                    <h4 v-for="genre in genres" :key="genre._id"> {{genre}} </h4>
           </div>
              <div class="img-container">
                   <img :src="user.image" class="user-image">
                   <button class="user-edit-btn" @click="goToUserEdit(user._id)" v-if="loggedinUser">Edit Your Profile!</button>
              </div>
        </div>
  <div class="main-container">
    <div class="groups-container">
        <h1 class="groups-header">My Groups</h1>
      <div class="groups-card">
          <div class="items" v-for="group in groups" :key="group._id" >
              <div class="group-img-container"  @click="goToGroupEdit(group._id)">
                    <img :src="group.image" class="group-image">
              </div>
               
                <h1 class="group-name" @click="goToGroupDetails(group._id)">{{group.name}}</h1>
                <button @click="goToGroupEdit(group._id)" :disabled="!checkIfAdmin(group)">Edit This Group</button>
          </div>
      </div>
      </div>
            <div class="about">
                {{user.description}}
            <iframe allowtransparency="true" scrolling="no" frameborder="no" src="https://w.soundcloud.com/icon/?url=http%3A%2F%2Fsoundcloud.com%2Fnitzan-moise&color=orange_white&size=32" style="width: 32px; height: 32px;">
            </iframe>
            </div>
      <div v-if="currLoggedInUser && joinReqs.length > 0">
           <h1>Join requets:</h1>
           <div v-for="req in joinReqs" :key="req.createdAt">
            <span @click="goToAsker(req.asker._id)">{{req.asker.fullName}}</span> Asked To Join {{req.group.name}}
            <button @click="deleteReq(user._id, req.createdAt)">Cancel</button><button @click="addAskerToGroupMembers(req.asker._id, req.group._id); deleteReq(user._id, req.createdAt)" >Agree</button>
           </div>
      </div>
      <div v-if="currLoggedInUser && groupReqs.length > 0">
         <div class="groupJoinReqs" v-for="groupReq in groupReqs" :key="groupReq.createdAt">
          <span @click="goToGroupDetails(groupReq.group._id)">{{groupReq.group.name}}</span> Wants You To Join them!
          <button  @click="deleteReq(user._id, groupReq.createdAt)">Cancel</button><button @click="addAskerToGroupMembers(user._id, groupReq.group._id); deleteReq(user._id, groupReq.createdAt) ">Agree</button>
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
      groups: {},
      joinReqs: [],
      groupReqs: []
    };
  },
  computed: {
    genres() {
      return this.user.genre;
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
      this.$store.dispatch({
        type: "addAskerToGroupMembers",
        askerId,
        groupId
      }).then (res => {
        EventBusService.$emit(SHOW_MSG, {
            txt: `Request Approved`,
            type: "success"
          });
      })
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
        this.groups = groups.data;
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
  display: flex;
  flex-flow: column wrap;
}

.groups-card {
  text-align: center;
  cursor: pointer;
  border-radius: 20px;
  /* border: solid 2px black; */
  box-shadow: 2px 4px 54px 0px rgba(0, 0, 0, 0.62);
  background-color: #eeeeee;
  width: 170px;
  height: 270px;
  padding: 10px;
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
}
.groups-header {
  font-family: Shrikhand-Regular;
  color: orange;
  font-size: 2em;
  width: 35%;
  text-align: center;
  padding: 10px;
  height: 100px;
}
.group-name {
  margin: 0;
  padding: 0;
  width: 100%;
}
.about {
  margin-top: 10%;
  font-size: 28px;
}
.group-name {
  font-family: Condition3D-Italic;
  cursor: pointer;
  width: 100%;
  text-align: center;
  margin: 0 10px 10px 0;
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
  padding: 5px;
  color: orange;
  font-family: Magettas Regular DEMO;
  height: 30px;
  border-radius: 5px;
  font-size: 1.2em;
  line-height: 100%;
  background-color: white;
}
.user-edit-btn {
  width: 173px;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 1.2em;
  line-height: 100%;
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