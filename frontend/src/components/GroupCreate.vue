<template>
<section id="modal-template">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <button class="modal-default-button" @click="$emit('close')">&#10006;</button>
            <h2>Create New Group!</h2> 
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">

             <form @submit.prevent.stop="saveGroup">
              
                  <label for="name"> Name: </label> <input name="name" ref="name" type="text" placeholder="Enter New Group Name" v-model="group.name" />
                  <label for="about"> Description:  </label><input name= "about"  type="text" placeholder="Describe Your Group" v-model="group.about"/>
                  <label for="image"> Upload image:  </label><input name= "image" type="text" placeholder="insert an Image URL" v-model="group.image"/>
                  <label for="location"> Location:  </label><input name= "location" type="text" placeholder="Where Are You From?" v-model="group.location"/>
              

               
                  <label for="genre"> Genre:  </label>
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
                  
                  <label for="need"> Looking For:  </label>
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
export default {
  props: ["memberId"],

  data() {
    return {
      group: {
        name: "",
        about: "",
        image: "",
        location: "",
        genre: [],
        need: [],
        members: [{ id: this.memberId, isAdmin: true, position: "guitar" }],
        posts: []
      }
    };
  },
  created() {
    console.log("CreateGroup component created");
    console.log("member id", this.memberId);
  },
  methods: {
    saveGroup() {
      GroupService.addGroup(this.group)
        .then(addedGroup => {
          EventBusService.$emit(SHOW_MSG, {
            txt: "Group saved!",
            type: "success"
          });
          this.$emit("close");
          this.$router.push(`/GroupDetails/${addedGroup._id}`);
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
      // var loggedinUserId = this.$store.getters.loggedinUser._id;
      // console.log("loggedinUserId", loggedinUserId);

      return { isAdmin: true, position: "guitar" };
    }
  }
};
</script>

<style scoped>
/* CSS for MODAL */
.submit-button {
  margin-left: 30px;
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
  line-height: 50px;

  margin-left: 10px;
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
}

form {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  justify-items: flex-start;
  align-content: flex-start;
  align-items: flex-start;
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
