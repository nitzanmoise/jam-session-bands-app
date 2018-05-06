<template>
<section id="modal-template">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
             Log In!
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
             <form @submit.prevent="checkLogin">
                <div class="email">
             Email:<input ref="txtUserName" type="text" placeholder="User name" v-model="user.name" name="email" />
               </div>
               Password: <input type="password" placeholder="Enter your Password" v-model="user.password"/>
                <button type="submit" :disabled="!this.user.name || !this.user.password">Login</button>
            </form>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="login" @click="$emit('login')"> Log In</button>
              <button class="modal-default-button" @click="$emit('close')">X</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</section>

</template>

<script>
import UserService from '../services/UserService'
import EventBusService, { SHOW_MSG } from '../services/EventBusService.js'

export default {

 data() {
        return {
            user: {name: 'muki', password: 'muki'}
        }
    },
    created() {
        console.log('login component ccreated')
        
    },
    methods: {
        checkLogin() {

            this.$store.dispatch({type: 'login', userCredentials:this.user})
            .then(res => {
                console.log('You have been logged-in!')
                EventBusService.$emit(SHOW_MSG, {txt: `Welcome ${this.user.name}`});
                this.$router.push('/chat');
            })
            .catch(err => {
                console.log('Login Failed!');
                EventBusService.$emit(SHOW_MSG, {txt: `Wrong Credentials, please try again`, type: 'danger'});
                this.$refs.txtUserName.focus();
            })
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
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
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


/* CSS GENERAL */

.login-page{
    border: solid 2px black;
    background-color:orange;
    margin: 20px;
    text-align: center;
  width:300px;
  display:flex;
  align-self: center;
  flex-flow: column wrap;
  justify-content: space-between;
  align-content: left;
}
h2{
    margin:0;
}
input{
    padding-left: 10px;
}

</style>
