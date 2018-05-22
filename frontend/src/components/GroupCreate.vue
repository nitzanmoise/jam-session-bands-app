<template>
<section id="modal-template">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <button class="modal-default-button" @click="$emit('close')">&#10006;</button>
            <h2>Create A New Group!</h2> 
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">

             <form @submit.prevent.stop="saveGroup">
              
                  <label for="name"> Name: <input name="name" ref="name" type="text" placeholder="Enter New Group Name" v-model="group.name" /> </label>
                  <label for="about"> Description:  <input name= "about"  type="text" placeholder="Describe Your Group" v-model="group.about"/> </label>
                  <label for="image"> Copy cover image URL: <input name= "image" type="text" placeholder="insert an Image URL" v-model="group.coverImage"/> </label>
                  <label for="image"> Copy profile image URL: <input name= "image" type="text" placeholder="insert an Image URL" v-model="group.image"/> </label>
                   <!-- <div class="file-upload-form">
                    Upload an image file:
                   <input type="file" @change="previewImage" accept="image/*">
                   </div> -->
                  <label for="location"> Location:  <input name= "location" type="text" placeholder="Where Are You From?" v-model="group.location"/> </label>
                    <!-- <div class="image-preview" v-if="imageData.length > 0">
                        <img class="preview" :src="imageData">
                    </div> -->

               
                  <label for="genre"> Genre:  
                 <select name= "genre" type="text" placeholder="Genre of the Group" v-model="group.genre" multiple>
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
                   </label>
                  
                  <label for="need"> Looking For: 
                  <select v-model="group.need" multiple>
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
                   </label>
                
               
                <div class="submit-button">
                 <button class="submit" type="submit" :disabled="!this.group.name || !this.group.genre || !this.group.about">Save Group</button> 
                </div>
            </form>
            </slot>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>  
  </transition>
</section>

</template>

<script>
import GroupService from "../services/GroupService";
import EventBusService, { SHOW_MSG } from "../services/EventBusService.js";
import UserService from '../services/UserService';
export default {
  props: ["memberId"],

  data() {
    return {
      // imageData: "",

      group: {
        name: "",
        about: "",
        image: "https://www.proaudioland.com/wp/wp-content/uploads/2017/01/generic-band-e1483736893335.jpg",
        location: "",
        genre: [],
        need: [],
        members: [],
        coverImage:"http://mybatv.com/wp-content/uploads/2013/08/BATV-ShowHeader_music-generic-mic.jpg",
        embedLink: "",
        posts: []
      }
    };
  },
  created() {},
  methods: {
    // previewImage: function(event) {
    //   // Reference to the DOM input element
    //   var input = event.target;
    //   // Ensure that you have a file before attempting to read it
    //   if (input.files && input.files[0]) {
    //     // create a new FileReader to read this image and convert to base64 format
    //     var reader = new FileReader();
    //     // Define a callback function to run, when FileReader finishes its job
    //     reader.onload = e => {
    //       // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
    //       // Read image as base64 and set to imageData
    //       this.group.image = e.target.result;
    //       // this.currLocation.url = e.target.result;
    //     };
    //     // Start the reader job - read file as a data url (base64 format)
    //     reader.readAsDataURL(input.files[0]);
    //   }
    // },

    saveGroup() {
      GroupService.addGroup(this.group)
        .then(addedGroup => {
          var userId = this.$store.getters.loggedinUser
          // console.log("this is added group", addedGroup);
            // GroupService.addAskerToGroupMembers(userId, addedGroup._id)
          EventBusService.$emit(SHOW_MSG, { 
            txt: "Group saved!",
            type: "success"
          });
          setTimeout(()=>{
            this.$router.push(`/GroupDetails/${addedGroup._id}`);
            },1000)
          this.$emit("close");
          this.$store.dispatch({
            type: "addAskerToGroupMembers",
            askerId: this.memberId,
            groupId: addedGroup._id
          });
        })
        .catch(err => {
          this.$emit("close");
          var userMsg = { txt: "Groups Addition Failed!", type: "error" };
          EventBusService.$emit(SHOW_MSG, userMsg);
        });
    },
    setNeed(value) {
      this.group.need.push(value);
    },
    routeToUsers() {
      this.$router.push("/usersPage");
      var userMsg = {
        txt: "Check Out Our Users! Add Them To Your Band!",
        type: "info"
      };
      EventBusService.$emit(SHOW_MSG, userMsg);
      this.$emit("close");
    }
  },

  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    getMembers() {
      return { isAdmin: true, position: "guitar" };
    }
  }
};
</script>

<style scoped>
/* CSS for MODAL */
.submit-button {
  margin-left: 30px;
  align-self:flex-end;
  justify-self: flex-end;
 
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 725px;
  height: 320px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: lightgray;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: "Open Sans", Helvetica;
}

.modal-header h3 {
  margin-top: 0;
  color: #dd9b0d;
  font-family: "Open Sans", Helvetica;
}

h2 {
  font-family: "Open Sans", Helvetica;
}
h4 {
  align-self: center;
}
.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

label {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  justify-items: flex-start;
}

input {
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 0px;
  font-family: "Open Sans", Helvetica;
  width: 200px;
  border-radius: 25px;
}

form {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 10px;
   align-items: end;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

/* MODAL BUTTONS */

/* Reset */
button {
  background: transparent;
  border: 0;
  padding: 0;
  margin-right: 40px;
  cursor: pointer;
  outline: 0;
  -webkit-appearance: none;
}
.modal-default-button {
  background: red;
  margin: 0;
}

/* Custom */
button {
  display: inline-block;
  position: relative;
  padding: 10px 18px;
  top: 0;
  font-size: 20px;
  font-family: "Open Sans", Helvetica;
  border-radius: 4px;
  border-bottom: 1px solid rgba(3, 7, 255, 0.945);
  background: #dd9b0d;
  color: #fff;
  box-shadow: 0px 0px 0px rgba(15, 165, 60, 0.1);

  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);

  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  -ms-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

button:hover {
  top: -10px;
  box-shadow: 0px 10px 10px rgba(15, 165, 60, 0.2);

  -webkit-transform: rotateX(20deg);
  -moz-transform: rotateX(20deg);
  -ms-transform: rotateX(20deg);
  transform: rotateX(20deg);
}

button:active {
  top: 0px;
  box-shadow: 0px 0px 0px rgba(0, 60, 255, 0.979);
  background: rgb(0, 38, 255);
}
</style>
