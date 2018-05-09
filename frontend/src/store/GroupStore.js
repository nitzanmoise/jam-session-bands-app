import GroupService from "../services/GroupService.js";

export default {
  state: {
    groups : [],
    currGroup:[],
    groupFilter: ''
,
  },
  mutations: {
    setGroupFilter(state, { filter }) {
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
        currGroup => currGroup._id === group._id
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
    },
    currGroupForDisplay(state){
      return state.currGroup
    }
  },
  actions: {
  

    loadGroups(store) {
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
    updateGroup(store, { group }) {
      return GroupService.updateGroup(group).then(group => {
      store.commit({ type: "updateGroup", group });
      
      });
    },  
    updateReqs(store, {joinReq, admins}){
         return GroupService.updateReqs(joinReq, admins).then(res => {

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
        
        return group;
      });
    }
  }
}
