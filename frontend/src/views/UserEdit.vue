<template>
<section class="user-edit-container">
   <form @submit.prevent="saveUser">
              
                  <label for="name"> Full - Name: </label> <input name="name" ref="name" type="text" placeholder="Change Your User Name Here" v-model="user.fullName" />
                  <label for="email"> E-mail:  </label><input name= "email"  type="email" placeholder="Change Your Email here" v-model="user.email"/>
                  <label for="password"> Password:  </label><input name= "password" type="text" placeholder="Change Your Password Here" v-model="user.password"/>
                  <label for="image"> Your Image:  </label><input name="image" type="text" placeholder="Insert a Picture URL" v-model="user.image"/>
                  <label for="description"> Describe Yourself:  </label><input name="description" type="text" placeholder="Describe Yourself Here" v-model="user.description"/>
                  <label for="genre"> What Are Your Genres?  </label> <input name="genre" type="text" placeholder="Type your Genres here" v-model="user.genre"/>
                  <label for="links"> Insert A Video Link To Your Work:  </label> <input name="links" type="text" placeholder="Insert Link Here" v-model="user.links"/>
                  <label for="audio"> Insert An Audio Link To Your Work:  </label> <input name="audio" type="text" placeholder="Insert Link Here" v-model="user.audio"/>
                  <label for="location"> Where are you from?  </label> <input name="location" type="text" placeholder="Enter Country and City Here" v-model="user.location"/>
                  <label for="dob"> What is Your Date of Birth? </label> <input name="dob" type="date" value = "1990-02-09" placeholder="Date Of Birth" v-model="user.dateOfBirth"/>
                  <label for="talents"> Choose Your Talents (You can choose many with the "shift" key):  </label>
                  <select multiple>
                      <option value="guitar">guitar</option>
                      <option value="drums">drums</option>
                      <option value="keyboard">keyboard</option>
                      <option value="saxophone">saxophone</option>
                      <option value="accordion">accordion</option>
                      <option value="bass">bass</option>
                      <option value="harmonica">harmonica</option>
                      <option value="clarinet">clarinet</option>
                      <option value="french-horn">french-horn</option>
                      <option value="piano">piano</option>
                  </select>

             
                 <button class="submit" type="submit" :disabled="!this.user.fullName || !this.user.genre || !this.user.description">Save</button> 
            </form>
</section>
</template>

<script>
import UserService from "../services/UserService";
import EventBusService, { SHOW_MSG } from "../services/EventBusService.js";
export default {
  data() {
    return {
      user: {}
    };
  },

  created() {
    var userId = this.$route.params.id;
    this.$store.dispatch({ type: "getUserById", userId }).then(user => {
      this.user = user;
    });
  },

  methods: {
    saveUser() {
      var user = this.user;
      this.$store.dispatch({ type: "updateUser", user }).then(res => {
        var userMsg = { txt: "User Updated", type: "success" };
        EventBusService.$emit(SHOW_MSG, userMsg);
        this.$router.push(`/UserDetails/${user._id}`);
      });
    },
    routeToUsers() {
      this.$router.push("/usersPage");
      var userMsg = {
        txt: "Check Out Our Users! Add Them To Your Band!",
        type: "info"
      };
      EventBusService.$emit(SHOW_MSG, userMsg);
    }
  }
};
</script>

<style scoped>
form {
  margin: 100px;
  display: flex;
  flex-flow: column wrap;
}
input {
  padding-left: 10px;
  margin: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

select {
  padding-left: 10px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin-left: 20px;
}

button {
  margin-top: 40px;
  color: orange;
  border: 1px solid black;
  font-size: 1.5em;
  background: rgb(215, 236, 243);
  font-family: Magettas Regular DEMO;
  cursor: pointer;
  border-radius: 5px;
}


@font-face {
  font-family: Magettas Regular DEMO;
  src: url("../../public/fonts/magettas-demo/Magettas Regular DEMO.otf");
}
</style>