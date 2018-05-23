import UserService from "../services/UserService.js";
import GroupService from "../services/GroupService.js";

export default {
  state: {
    loggedinUser: null,
    users: [],
    userFilter: "",
    userGroups: null,
    selectedUser: null
  },
  mutations: {
    addUserPost(state, { userId, newPost }) {
      if (userId !== state.selectedGroup._id) return;
      state.selectedGroup.posts.push(newPost);
    },
    setUserFilter(state, { filter }) {
      state.userFilter = filter;
    },
    addGroupToUser(state, { askerId, groupId }) {
      state.loggedinUser.groups.push({ id: groupId });
    },
    setUserGroups(state, { groups }) {
      state.userGroups = groups;
    },
    setUser(state, { user }) {
      state.loggedinUser = user;
    },
    deleteUser(state, { userId }) {
      state.users = state.users.filter(user => user.id !== userId);
    },
    // setSelectedUser(state, { user }) {
    //   state.selectedUser = user;
    // },
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
      state.loggedinUser.joinReqs = state.loggedinUser.joinReqs.filter(
        req => req.createdAt !== timeStamp
      );

      console.log("moshe ch", state.loggedinUser.joinReqs.length);

      sessionStorage.user = JSON.stringify(state.loggedinUser);
    },
    addRequest(state, { joinReq }) {
      state.loggedinUser.sentReqsToJoinBands.push(joinReq);
    }
  },
  getters: {
    loggedinUser(state) {
      return state.loggedinUser;
    },
    userGroups(state) {
      return state.userGroups;
    },
    usersForDisplay(state) {
      return state.users;
    },
    currUserForDisplay(state) {
      if (!state.selectedUser) return null;
      if (!state.selectedUser.posts.length) {
        return state.selectedUser;
      } else {
        let reversedPosts = state.selectedUser.posts.slice().reverse();
        let user = { ...state.selectedUser, posts: reversedPosts };
        return user;
      }
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
      return UserService.getUsers(store.state.userFilter).then(users => {
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
    addUserPost(store, { userId, newPost }) {
      UserService.addPost(userId, newPost).then(res => {
        store.commit({ type: "addPost", userId, newPost });
      });
    },
    register(store, { user }) {
      return UserService.register(user).then(user => {
        store.commit({ type: "addUser", user });
        return user;
      });
    },
    getUserGroups(store, { user }) {
      return UserService.getUserGroups(user).then(res => {
        console.log("in store res. data", res.data);
        var groups = res.data;

        store.commit({ type: "setUserGroups", groups });

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
    sendGroupJoinReq(store, { groupJoinReq }) {
      UserService.sendGroupJoinReq(groupJoinReq);
    },
    getUserById(store, { userId }) {
      return UserService.getUserById(userId).then(user => {
        // store.commit({ type: "setSelectedUser", user });

        return user;
      });
    },
    updateReqs(store, { joinReq, admins }) {
      console.log("elad");
      return GroupService.updateReqs(joinReq, admins).then(res => {
        console.log("befire the commit    ");
        store.commit({ type: "addRequest", joinReq });
        sessionStorage.user = JSON.stringify(store.state.loggedinUser);
      });
    }
  }
};
