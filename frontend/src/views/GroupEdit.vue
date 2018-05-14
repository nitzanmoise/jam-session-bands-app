<template>
<section class="group-edit-container">
   <form @submit.prevent="saveGroup">
              
                  <label for="name"> Name: </label> <input name="name" ref="name" type="text" placeholder="Enter New Group Name" v-model="group.name" />
                  <label for="about"> Description:  </label><input name= "about"  type="text" placeholder="Describe Your Group" v-model="group.about"/>
                  <label for="image"> Insert an Image URL:  </label><input name= "image" type="text" placeholder="insert an Image URL" v-model="group.image"/>
                  <label for="bgImage"> Your Groups' Background Image:  </label><input name="bgImage" type="text" placeholder="Insert a Background Picture URL" v-model="group.bgImage"/>
                  <label for="location"> Location:  </label><input name="location" type="text" placeholder="Where Are You From?" v-model="group.location"/>
                       <label for="genre"> Genre:  </label>
                 <select name= "genre" placeholder="Genre of the Group" v-model="group.genre" multiple>
                      <option value="rock">Rock</option>
                      <option value="pop">Pop</option>
                      <option value="Jazz">Jazz</option>
                      <option value="classic">Classic</option>
                      <option value="metal">Metal</option>
                      <option value="funk">Funk</option>
                      <option value="punk">Punk</option>
                      <option value="fusion">Fusion</option>
                      <option value="indie">Indie</option>
                      <option value="alt">Alternative</option>
                      <option value="electronic">Electronic</option>
                  </select>
                  <br>
                  <label for="need"> Looking For:  </label>
                  <select multiple v-model="group.need">
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

             
                 <button class="submit" type="submit" :disabled="!this.group.name || !this.group.genre || !this.group.about">Save Group</button> 
            </form>
</section>
</template>

<script>
import GroupService from "../services/GroupService";
import EventBusService, { SHOW_MSG } from "../services/EventBusService.js";
export default {
  data() {
    return {
      group: {    
        name: "",
        about: "",
        image: "",
        location: "",
        genre: [],
        need: [],
        members: [],
        posts: []}
    };
  },

  created() {
    var groupId = this.$route.params.id;
    this.$store.dispatch({ type: "getGroupById", groupId }).then(groupToUpdate => {
      this.group = {...groupToUpdate};
    });
  },

  methods: {
    saveGroup() {
      var group = this.group;
      this.$store.dispatch({ type: "updateGroup", group }).then(x => {
        console.log("in the then of the dispatch");
        var userMsg = { txt: "Group Updated", type: "success" };
        EventBusService.$emit(SHOW_MSG, userMsg);
        this.$router.push(`/GroupDetails/${group._id}`);
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
  font-family: Magettas Regular DEMO;
}

select {
  padding-left: 10px;
  font-family: Magettas Regular DEMO;
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
@font-face {
  font-family: Magettas Regular DEMO;
  src: url("../../public/fonts/magettas-demo/Magettas Regular DEMO.otf");
}
</style>