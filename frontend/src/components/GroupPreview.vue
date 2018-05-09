<template>


  <div class="card" @click="openGroupDetails(group._id)">
        <h2>{{group.name}}</h2>
      <img :src="group.image" class="image">
          <div class="seeking-container">
              <h3>Seeking:</h3>
              <div v-for="need in group.need" :key="need._id">  
                <img class="icon" :src="'./img/instruments/'+need+'.png'" alt="" width="25px;" height="25px;">                        
              </div>
          </div>  
          <el-button @click="sendJoinReq(group._id)" type="text" class="button">Join The Band</el-button>
          <el-button @click="openGroupDetails(group._id)" class="button">View Group Details</el-button>
  </div>

 
</template>
  <script>
export default {
  props: ["group"],
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    }
  },
  methods: {
    openGroupDetails(groupId) {
      this.$router.push(`/GroupDetails/${groupId}`);
    },
    sendJoinReq(groupId) {
      if (!this.loggedinUser) {
        console.log("you not logged in");
      } else {
        console.log("yes you log in", this.group.members, this.loggedinUser);
        var askerId  = this.loggedinUser._id;
        var joinReq = { askerId, groupId };
        var admins = this.group.members.filter(({ isAdmin }) => isAdmin);
        this.$store.dispatch({ type: "updateReqs", joinReq, admins });
      }
    }
  }
};
</script>

<style>
@font-face {
  font-family: Magettas Regular DEMO;
  src: url("../../public/fonts/magettas-demo/Magettas Regular DEMO.otf");
}
.card {
  height: 400px;
  width: 300px;
  margin: 20px;
  text-align: center;
  cursor: pointer;
  border-radius: 20px;
  /* border: solid 2px black; */
  box-shadow: 2px 4px 54px 0px rgba(0,0,0,0.62);
}
h2 {
  /* font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; */
   margin: 20px;
  font-size: 1.7em;
  font-weight: bold;
}

.button {
  padding: 0px;
 justify-content: center;
  color: orange;
  font-family: Magettas Regular DEMO;
  font-size: 1.5em;
  margin-bottom: 10px;
}

.image {
  display: block;
  padding-left: 15%;
  width: 200px;
  height: 180px;
  margin-top: 10px;
}

.seeking-container {
  display: flex;
  justify-content: space-around;
  width: 200px;
  padding-left: 5%;
}

h3 {
  font-weight: normal;
}
.icon {
  margin-top: 12px;
}
</style>


