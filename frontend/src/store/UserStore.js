import UserService from "../services/UserService.js";

export default {
  state: {
    loggedinUser: null,
    users: []
  },
  mutations: {
    setUser(state, { user }) {
      state.loggedinUser = user;
    },
    deleteUser(state, { userId }) {
      state.users = state.users.filter(user => user.id !== userId);
    },
    setSelectedUser(state, { user }) {
      state.selectedUser = user;
    },
    addUser(state, { user }) {
      state.users = [user, ...state.users];
    },
    updateUser(state, { user }) {
      const userIdx = state.users.findIndex(
        currUser => currUser.id === user.id
      );
      state.users.splice(userIdx, 1, user);
    },
    setUsers(state, { users }) {
      state.users = users;
    },
    updateReqs(state, { timeStamp }) {
      // make sure that userloogend in user reqs havea filterd arr
      // than ave loggedin innto ssesion stotage
      state.loggedinUser.joinReqs = state.loggedinUser.joinReqs.filter(
        req => req.createdAt !== timeStamp
      );
      console.log("moshe ch", state.loggedinUser.joinReqs.length);

      sessionStorage.user = JSON.stringify(state.loggedinUser);
    }
  },
  getters: {
    loggedinUser(state) {
      return state.loggedinUser;
    },
    usersForDisplay(state) {
      return state.users;
    }
  },
  actions: {
    login(store, { userCredentials }) {
      return UserService.login(userCredentials).then(user => {
        store.commit({ type: "setUser", user });
        return store.state.loggedinUser;
      });
    },
    logout(store) {
      return UserService.logout().then(() => {
        store.commit({ type: "setUser", user: null });
      });
    },
    loadUsers(store) {
      return UserService.getUsers().then(users => {
        store.commit({ type: "setUsers", users });
      });
    },
    loadUser(store, { userId }) {
      return UserService.getById(userId).then(user => {
        store.commit({ type: "setSelectedUser", user });
        return user;
      });
    },
    deleteUser(store, { userId }) {
      return UserService.deleteUser(userId).then(() => {
        store.commit({ type: "deleteUser", userId });
      });
    },
    register(store, { user }) {
      return UserService.register(user).then(user => {
        store.commit({ type: "addUser", user });
        return user;
      });
    },
    getUserGroups(store, { user }) {
      return UserService.getUserGroups(user).then(groups => {
        return groups;
      });
    },
    updateUser(store, { user }) {
      return UserService.updateUser(user).then(user => {
        store.commit({ type: "updateUser", user });
      });
    },
    deleteReq(store, { userId, timeStamp }) {
      return UserService.deleteReq(userId, timeStamp).then(res => {
        store.commit({ type: "updateReqs", timeStamp });
      });
    },
    getUserById(store, { userId }) {
      return UserService.getUserById(userId).then(user => {
        return user;
      });
    }
  }
};
