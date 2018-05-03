import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Join from './views/Join.vue'
import UserSearch from './views/UserSearch.vue'
import UserDetails from './views/UserDetails.vue'
import UserEdit from './views/UserEdit.vue'
import GroupDetails from './views/GroupDetails.vue'
import GroupEdit from './views/GroupEdit.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'login',
      component: Login
    },
    {
      path: '/Join',
      name: 'Join',
      component: Join
    },
    
    {
      path: '/UserEdit/:id',
      name: 'UserEdit',
      component: UserEdit
    },
    {
      path: '/GroupDetails/:id',
      name: 'GroupDetails',
      component: GroupDetails
    },
    {
      path: '/Group/Edit/:id',
      name: 'GroupEdit',
      component: GroupEdit
    },
    {
      path: '/UserSearch',
      name: 'UserSearch',
      component: UserSearch
    },
    {
      path: '/UserDetails/:id',
      name: 'UserDetails',
      component: UserDetails
    },
  ]
})
