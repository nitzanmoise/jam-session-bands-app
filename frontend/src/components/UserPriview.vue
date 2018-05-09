<template>

  <div class="card">
    <div  @click="openUserDetails(user._id)">
        <h2>{{user.fullName}}</h2>
    <div class="user-image">
     <img :src="user.image" class="image">
    </div>
  </div>
          <div class="talents-container">
              <h3>Talents</h3>
              <div v-for="talant in user.talants" :key="talant._id">  
                <img class="icon" :src="'./img/instruments/'+talant+'.png'" alt="" width="25px;" height="25px;">                        
            </div>
          </div>  
         <el-button type="text" @click="sendJoinReq" class="button">Ask To Join Your Band!</el-button>
          <el-button @click.stop="openUserDetails(user._id)" type="text" class="button">View User Details</el-button>
  </div>
 
</template>


  <script>
export default {
  props: ["user"],
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    }
  },
  methods: {
    openUserDetails(userId) {
      this.$router.push(`/UserDetails/${userId}`);
    },
    sendJoinReq() {
      var groupId = this.$route.params.id;
      console.log("group idddd", groupId);
      var userId = this.user._id;
      console.log("user idddd", userId);
      var createdAt = Date.now();
      var groupJoinReq = { groupId, userId, createdAt };
      console.log("thi is join req", groupJoinReq);
      this.$store.dispatch({ type: "sendGroupJoinReq", groupJoinReq });

      // if (!this.loggedinUser) {
      //   console.log("you not logged in");
      // } else {
      //   console.log("yes you log in", this.group.members, this.loggedinUser);
      //   var askerId = this.loggedinUser._id;
      //   var askerName = this.loggedinUser.fullName;
      //   var createdAt = Date.now();
      //   var joinReq = { askerId, askerName, groupId, createdAt };
      //   console.log("thi is join req", joinReq);

      //   var admins = this.group.members.filter(({ isAdmin }) => isAdmin);
      //   this.$store.dispatch({ type: "updateReqs", joinReq, admins });
      // }
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
  margin: 20px;
  text-align: center;
  cursor: pointer;
  border-radius: 20px;
  /* border: solid 2px black; */
  box-shadow: 2px 4px 54px 0px rgba(0, 0, 0, 0.62);
  background-color: #eeeeee;
}
h2 {
  /* font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; */
  font-size: 1.4em;
  font-weight: bold;
  margin: 10px;
}

.button {
  padding: 0px;
  justify-content: center;
  color: orange;
  font-family: Magettas Regular DEMO;
  font-size: 1.2em;
  margin-bottom: 10px;
}

.image {
  display: block;
  width: 100%;
  height: 100%;
}
.user-image {
  margin-left: 20px;
  margin-right: 20px;
}

.talents-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

h3 {
  font-weight: normal;
  margin-top: 15px;
}
.icon {
  margin-top: 12px;
}
</style>