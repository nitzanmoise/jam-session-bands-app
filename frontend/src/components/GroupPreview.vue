<template>


  <div class="card">
    <div class="card-container">
    <div class="band-image">
      <img :src="group.image" class="image" @click="openGroupDetails(group._id)">
    </div>
        <h2>{{group.name}}</h2>
        <div class="bottom-card">
        <div class="seeking-container">
          <div class="need">
          <div class="seeking-title">
              <h3>Seeking:</h3>
          </div> 
          <div class="emoji">
              <div v-for="need in group.need" :key="need._id">  
                <img class="icon" :src="'./img/instruments/'+need+'.png'" alt="" width="20px;" height="20px;">                        
                                       
              </div>
              <h3 v-if="isGroupFull">  &nbsp; Group is Full! </h3> 
              </div> 
          </div>
          <button v-if="!isSentRequest" @click="sendJoinReq(group._id)" type="text" class="button">Join The Band</button>
          <h4 v-else >Request Sent</h4>
         
  </div>
  </div>
  </div>
  </div>

  
</template>
  <script>
import EventBusService, { SHOW_MSG , REQUIRE_LOGIN} from "../services/EventBusService.js";
export default {
  props: ["group"],
  data() {
    return {
      requestSent: false
    };
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    isSentRequest() {
      if (!this.loggedinUser) {
      return false 
      } 
      if(!this.loggedinUser.sentReqsToJoinBands) return false
      var groupId = this.group._id;
      return this.loggedinUser.sentReqsToJoinBands.find(
        req => req.groupId === groupId
      );  
    },
    isGroupFull(){
      return (this.group.need.length === 0)
    }
  },
  methods: {
    openGroupDetails(groupId) {
      this.$router.push(`/GroupDetails/${groupId}`);
    },
    sendJoinReq(groupId) {
      if (!this.loggedinUser) {
        setTimeout(()=>{
          EventBusService.$emit(REQUIRE_LOGIN);
        },2000)
        EventBusService.$emit(SHOW_MSG, {
              txt: `To Use This Feature Please Log In!`,
              type: "error"
        })
      } else {
        this.requestSent = true;
        console.log("yes you log in", this.group.members, this.loggedinUser);
        var askerId = this.loggedinUser._id;
        var askerName = this.loggedinUser.fullName;
        var createdAt = Date.now();
        var joinReq = { askerId, askerName, groupId, createdAt };
        console.log("thi is join req", joinReq);
        var admins = this.group.members.filter(({ isAdmin }) => isAdmin);
        this.$store
          .dispatch({ type: "updateReqs", joinReq, admins })
          .then(res => {
            EventBusService.$emit(SHOW_MSG, {
              txt: `Request Sent Successful`,
              type: "success"
            });
          })
      }
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: Magettas Regular DEMO;
  src: url("../../public/fonts/magettas-demo/Magettas Regular DEMO.otf");
}
@font-face {
  font-family: Shrikhand-Regular;
  src: url("../../public/fonts/Shrikhand/Shrikhand-Regular.ttf");
}
.card {

  height:100%;

  /* border: solid 2px black; */
}
h2 {
  font-family: Shrikhand-Regular;
 color: #756a6a;
  font-size: 1.3em;
  font-weight: bold;
  margin: 0;
  width:100%;
}

.bottom-card{
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
}

.card-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.button {
  line-height: 50%;
  border:2px solid rgba(226, 226, 226, 0.548);
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

.image {
  display: block;
  width: 100%;
  height: 100%;
    cursor: pointer;
}

.seeking-title{
  padding-left: 15px;
}

.seeking-container{

  border-top: 1px solid rgba(226, 226, 226, 0.548);
}

.need{
display:flex;
flex-direction: row;
width:100%;
margin: 0 auto;

align-items: flex-end;
justify-content: center;
}

.emoji{
  display: flex;
  align-items: flex-end;
}

h3 {
  font-size: 1em;
  color: gray;
}
.icon {
  margin-bottom:12px;
  margin-left: 5px;
  margin-right: 5px;
}
h4 {
  padding: 0px;
  justify-content: center;
  color:  rgb(153, 153, 153);
  font-family: Magettas Regular DEMO;
  font-size: 1em;
  margin-bottom: 10px;
  margin-top: 0;
}
</style>


