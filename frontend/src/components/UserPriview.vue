<template>

  <div class="card">
    <div  @click="openUserDetails(user._id)">
        <h2>{{user.fullName}}</h2>
    <div class="user-image">
     <img :src="user.image" class="image">
    </div>
          <div class="talents-container">
              <h3>Talents</h3>
              <div v-for="talant in user.talants" :key="talant._id">  
                <img class="icon" :src="'./img/instruments/'+talant+'.png'" alt="" width="25px;" height="25px;">                        
            </div>
          </div>  
         <el-button type="text" class="button">Ask To Join Your Band!</el-button>
          <el-button @click="openUserDetails(user._id)" type="text" class="button">View User Details</el-button>
  </div>
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
    // sendJoinReq(userId) {
    //   console.log(
    //     "THIS IS DROUP ID DDDDDDDDDDDDDDDDDDDDDD",
    //     userId,
    //     this.loggedinUser
    //   );
    //   if (!this.loggedinUser) {
    //     console.log("you not logged in");
    //   } else {
    //     console.log("yes you log in", this.user.members, this.loggedinUser);
    //     var askerId  = this.loggedinUser._id;
    //     var joinReq = { askerId, userId };
    //     var admins = this.user.members.filter(({ isAdmin }) => isAdmin);
    //     this.$store.dispatch({ type: "updateReqs", joinReq, admins });
    //   }
    // }
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
.user-image{
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