<template>

  <div class="card">
    <div  @click="openUserDetails(user._id)">
        
    <div class="user-image">
     <img :src="user.image" class="image">
    </div>
    <h2>{{user.fullName}}</h2>
  </div>

  
    <div class="card-bottom">
          <div class="talents-container">
              <h3>Talents</h3>
              <div v-for="talant in user.talants" :key="talant._id">  
                <img class="icon" :src="'./img/instruments/'+talant+'.png'" alt="" width="25px;" height="25px;">                        
            </div>
          </div>  
         <button type="text" @click="sendJoinReq" class="button">Ask To Join Your Band!</button>
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
}
.card-bottom {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
}

h2 {
  /* font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; */
  font-size: 1.4em;
  font-weight: bold;
  margin: 10px;
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

.image {
  display: block;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.talents-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0 auto;

  align-items: flex-end;
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