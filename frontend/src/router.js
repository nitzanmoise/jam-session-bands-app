import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Join from './views/Join.vue'
import Profile from './views/Profile.vue'
import ProfileEdit from './views/ProfileEdit.vue'
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
      path: '/Profile/:id',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/Profile/Edit/:id',
      name: 'ProfileEdit',
      component: ProfileEdit
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
  ]
})
