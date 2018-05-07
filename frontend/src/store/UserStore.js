import UserService from '../services/UserService.js'


export default {
    state: {
        loggedinUser: null,
        users : []
      },
      mutations: {
        setUser(state, {user}) {
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
        login(store, {userCredentials}) {
          return UserService.login(userCredentials)
          .then(user=>{
            store.commit({type: 'setUser', user});
            return store.state.loggedinUser
          })
        },
        logout(store) {
            console.log(store);
            return UserService.logout()
            .then(()=>{
              store.commit({type: 'setUser', user: null});
            })
          },
          loadUsers(store) {
            console.log("nitzan");
      
            return UserService.getUsers().then(users => {
              console.log("users", users);
      
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
         register(store, {user}){
          return UserService.register(user).then(user => {
            store.commit({ type: "addUser", user });
            return user;            
          })
         },
         getUserGroups(store, {user}){
          return UserService.getUserGroups(user).then(groups => {
            return groups
          })
     },
          updateUser(store, { user }) {
            return UserService.updateUser(user).then(user => {
               store.commit({ type: "updateUser", user });
            });
          },
          getUserById(store, { userId }) {
            return UserService.getUserById(userId).then(user => {
              return user;
            });
          }
        }
      
}