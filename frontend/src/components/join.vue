<template>
<section id="modal-template">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
            <h2>Register!</h2> 
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
             <form @submit.prevent="register">
            Full-Name:
            <input type="text" placeholder="Enter Full-Name" v-model="user.fullName" />
            E-mail:
            <input type="email" placeholder="Enter E-mail" v-model="user.email" />
            Password:
            <input type="text" placeholder="Enter Password" v-model="user.password" />
            <!-- <input type="date" placeholder="Enter Date of Birth" v-model="user.dateOfBirth" />
            <input type="text" placeholder="Enter The Genre You Prefer" v-model="user.genre" />
            <input type="image" placeholder="Upload Image" v-model="user.image" />
            <input type="link" placeholder="Enter a video Link to Your Work" v-model="user.links" />
            <input type="link" placeholder="Enter an Audio Link to Your Work" v-model="user.audio" />
            <input type="Text" placeholder="Enter Where You Are From" v-model="user.links" />
            <input type="text" placeholder="Enter Your Talent (What Do You Play?)" v-model="user.image" /> -->
            <button type="submit">Register</button>
        </form>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <hr>
              <h4>Already have an Account? Log In!</h4>
              <button class="login" @click="$emit('openLogin', true)"> Log-in</button>
              <button class="modal-default-button" @click="$emit('close')">&#10006;</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</section>
</template>

<script>
import UserService from '../services/UserService.js'
import EventBusService, { SHOW_MSG } from '../services/EventBusService.js'

export default {
    props:['users'],
 created() {
        
    },
    data() {
        return {
            user: {
              email: '',
              password: '',
              fullName: '',
              image: "http://www.medicine20congress.com/ocs/public/profiles/5856.jpg",
              description: "",
              genre: [],
              links: "",
              location: "",
              talants: [],
              groups: [],
              dateOfBirth: null,
              audio: "",
              joinReqs: [],
              groupJoinReq: []
              }
        }
    },
    methods: {
        register() {
            UserService.register(this.user)
            .then(res => {
                console.log('Register Completed, Please Log In!')
                EventBusService.$emit(SHOW_MSG, {txt: 'Registration Completed! please login'});
                this.$emit('close')
                this.$emit('loginModal', true)

                
            })
            .catch(err => console.log('Register Failed!'))
        }
    },
    computed: {
    
    }
}
</script>

<style scoped>
/* CSS for MODAL */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: lightgray;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
 font-family: "Open Sans", Helvetica;
}

.modal-header h3 {
  margin-top: 0;
  color: #dd9b0d;
   font-family: "Open Sans", Helvetica;
}

h2{
   font-family: "Open Sans", Helvetica;
}
.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

input{
  padding-left: 10px;
  padding-top:5px;
  padding-bottom: 5px;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 0px;
  font-family: "Open Sans", Helvetica;
}
form{
  display: flex;
  flex-flow: column wrap;
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
  cursor: pointer;
  outline: 0;
  -webkit-appearance: none;
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
  background:  #dd9b0d;
  color: #fff;
  box-shadow: 0px 0px 0px rgba( 15, 165, 60, 0.1 );
  
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
  box-shadow: 0px 10px 10px rgba( 15, 165, 60, 0.2 );
  
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
