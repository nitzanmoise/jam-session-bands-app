import UserStore from './UserStore.js'
import GroupStore from './GroupStore.js'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {},
  modules: {
    UserStore,
    GroupStore
  },
 
  
})
