<template>

<div class="card">
    <div @click.stop="openUserDetails(user._id)">
        <div class="user-image">
            <img :src="user.image" class="image" style="height:397.72px; width:395.72px;">
        </div>
        <div class="userInfo">
            <div class="card-bottom">
                <h2>{{user.fullName}}</h2>

                <div class="talents-container">
                    <h3>Talents</h3>
                  <div class="icons">
                    <div v-for="talant in user.talants" :key="talant._id">
                        <img class="icon" :src="'./img/instruments/'+talant+'.png'" alt="" width="25px;" height="25px;">
                    </div>
                    </div>
                <button type="text" @click.stop="sendJoinReq" class="button">Ask To Join Your Band!</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>


  <script>
import EventBusService, {
  SHOW_MSG,
  REQUIRE_LOGIN,
  GROUP_ID
} from "../services/EventBusService.js";
export default {
  props: ["user"],
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    }
  },
  methods: {
    openUserDetails(userId) {
      var groupId = this.$route.params.id;
      EventBusService.$emit(groupId);
      this.$router.push(`/UserDetails/${userId}`);
    },
    sendJoinReq() {
      var groupId = this.$route.params.id;
      var userId = this.user._id;
      var createdAt = Date.now();
      var groupJoinReq = { groupId, userId, createdAt };
      this.$store.dispatch({ type: "sendGroupJoinReq", groupJoinReq }).then(()=>{
      var userMsg = {
        txt: "Join Request Sent!",
        type: "success"
      };
      EventBusService.$emit(SHOW_MSG, userMsg);
      });
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: Magettas Regular DEMO;
  src: url("../../public/fonts/magettas-demo/Magettas Regular DEMO.otf");
}
.card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  cursor: pointer;
  border: 1px solid rgba(226, 226, 226, 0.548);
  background-color: white;
  position: relative;
}
.userInfo{
  bottom:0;
  left:0;
  right:0;
  top:0;
  position: absolute;
  cursor: pointer;
  opacity:0;
  transition: all .5s;
  background-color: rgba(255, 166, 0, 0.747)
}
.card:hover .userInfo{
  opacity:1;
}
.card:hover .user-image img{
  transform: scale(1.125);
  transition: all .5s;
}
.user-image{
  overflow:hidden;
}
.user-image img{
  
  width:100%;
}
.card-bottom {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
}

h2 {
  font-family: Shrikhand-Regular;
 color: #ffffff;
  font-size: 1.7em;
  font-weight: bold;
  margin: 0;
  width:100%;
  height: 41px;
 margin-bottom: 30%;
}

.button {
    line-height: 50%;
    border: 2px solid rgba(226, 226, 226, 0.548);
    padding: 10px;
    color: orange;
    font-family: Magettas Regular DEMO;
    height: 30px;
    width: 234px;
    border-radius: 50px;
    font-size: 1.2em;
    background-color: white;
    margin-bottom: 15px;
    cursor: pointer;
    align-self: center;
}

.icons{
  display:flex;
}
.image {
  display: block;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.talents-container {
 display:flex;
flex-direction: column;
width:100%;
margin: 0 auto;
background:rgba(255, 255, 255, 0.719);
align-items: center;
justify-content: center;
}

h3 {
  font-size: 1em;
  color: gray;
}
.icon {
  margin-bottom: 12px;
  margin-left: 5px;
  margin-right: 5px;
}
</style>