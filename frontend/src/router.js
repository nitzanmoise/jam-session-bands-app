import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AppPage from './views/AppPage.vue'
import Login from './views/Login.vue'
import Join from './views/Join.vue'
import Profile from './views/Profile.vue'
import ProfileEdit from './views/ProfileEdit.vue'
import Group from './views/Group.vue'
import GroupEdit from './views/GroupEdit.vue'
import GroupList from './views/GroupList.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/AppPage',
      name: 'AppPage',
      component: AppPage
    },
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
      path: '/Group/:id',
      name: 'Group',
      component: Group
    },
    {
      path: '/Group/Edit/:id',
      name: 'GroupEdit',
      component: GroupEdit
    },
    {
      path: '/GroupList',
      name: 'GroupList',
      component: GroupList
    },
    
   
  ]
})
