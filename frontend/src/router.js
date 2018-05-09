import Vue from "vue";
import Router from "vue-router";
import App from "./views/App.vue";
import Home from "./views/Home.vue";
// import Login from './views/Login.vue'
// import Join from './views/Join.vue'
import UsersPage from "./views/UsersPage.vue";
import UserDetails from "./views/UserDetails.vue";
import UserEdit from "./views/UserEdit.vue";
import GroupDetails from "./views/GroupDetails.vue";
import GroupEdit from "./views/GroupEdit.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/app",
      name: "app",
      component: App
    },
    {
      path: "/",
      name: "home",
      component: Home
    },

    {
      path: "/UserEdit/:id",
      name: "UserEdit",
      component: UserEdit
    },

    {
      path: "/GroupDetails/:id",
      name: "GroupDetails",
      component: GroupDetails
    },
    {
      path: "/Group/Edit/:id",
      name: "GroupEdit",
      component: GroupEdit
    },

    {
      path: "/UserDetails/:id",
      name: "UserDetails",
      component: UserDetails
    },
    {
      path: "/UsersPage/:id",
      name: "UsersPage",
      component: UsersPage
    }
  ]
});
