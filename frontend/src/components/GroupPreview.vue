<template>


  <div class="card">
    <div  @click="openGroupDetails(group._id)">
        <h2>{{group.name}}</h2>
    <div class="band-image">
      <img :src="group.image" class="image">
    </div>
          <div class="seeking-container">
              <h3>Seeking:</h3>
              <div v-for="need in group.need" :key="need._id">  
                <img class="icon" :src="'./img/instruments/'+need+'.png'" alt="" width="25px;" height="25px;">                        
              </div>
          </div>  
  </div>
          <el-button @click="sendJoinReq(group._id)" type="text" class="button">Join The Band</el-button>
          <el-button @click="openGroupDetails(group._id)" type="text" class="button">View Group Details</el-button>
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
        var askerId = this.loggedinUser._id;
        var askerName = this.loggedinUser.fullName;
        var createdAt = Date.now();
        var joinReq = { askerId, askerName, groupId, createdAt };
        console.log("thi is join req", joinReq);

        var admins = this.group.members.filter(({ isAdmin }) => isAdmin);
        this.$store.dispatch({ type: "updateReqs", joinReq, admins });
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
.card {

  margin: 20px;
  text-align: center;
  cursor: pointer;
  border-radius: 20px;
  /* border: solid 2px black; */
  box-shadow: 2px 4px 54px 0px rgba(0,0,0,0.62);
 background-color: #eeeeee;

}
h2 {
  /* font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; */
  font-size: 1.4em;
  font-weight: bold;
 margin:10px;
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
.band-image{
  margin-left: 20px;
  margin-right: 20px;
}

.seeking-container {
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


