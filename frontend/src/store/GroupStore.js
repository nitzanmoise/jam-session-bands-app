import GroupService from "../services/GroupService.js";

export default {
  state: {
    groups : [],
    groupFilter: '',
  },
  mutations: {
    setGroupFilter(state, { filter }) {
      console.log('filter', filter)
      state.groupFilter = filter;
     
    },
   
    deleteGroup(state, { groupId }) {
      state.groups = state.groups.filter(group => group.id !== groupId);
    },
    setSelectedGroup(state, { group }) {
      state.selectedGroup = group;
    },
    addGroup(state, { group }) {
      state.groups = [group, ...state.groups];
    },
    updateGroup(state, { group }) {
      const groupIdx = state.groups.findIndex(
        currGroup => currGroup.id === group.id
      );
      state.groups.splice(groupIdx, 1, group);
    },
    setGroups(state, { groups }) {
      state.groups = groups;
    }
  },
  getters: {
    groupsForDisplay(state) {
      return state.groups;
    },
    search(state){
        var search = (group => {
            return group.content.toLowerCase().includes(state.search)
        })
        return search
    }
  },
  actions: {
  

    loadGroups(store) {
      console.log('loadGroups', store.state.groupFilter)
      return GroupService.getGroups(store.state.groupFilter)
      .then(groups => {
          store.commit({ type: 'setGroups', groups });
      })
    },
    loadGroup(store, { groupId }) {
      return GroupService.getById(groupId).then(group => {
        store.commit({ type: "setSelectedGroup", group });
        return group;
      });
    },
    deleteGroup(store, { group }) {
      return GroupService.deleteGroup(groupId).then(() => {
        store.commit({ type: "deleteGroup", groupId });
      });
    },
    updateGroup(store, { groupId }) {
      return GroupService.updateGroup(groupId).then(group => {
      store.commit({ type: "updateGroup", group });
      
      });
    },  
    updateReqs(store, {joinReq, admins}){
         return GroupService.updateReqs(joinReq, admins).then(res => {
           console.log('this is updated reqs', res);
         })
    },
    addGroup(store, { group }){
      return GroupService.addGroup(group).then(group => {

        store.commit({ type: "addGroup", group });
        return group;
      })
    },
    getGroupMembers(store, {group}){
         return GroupService.getGroupMembers(group).then(members => {
           return members
         })
    },
    getGroupById(store, { groupId }) {
      return GroupService.getGroupById(groupId).then(group => {
        console.log('this is store group', group);
        
        return group;
      });
    }
  }
}
