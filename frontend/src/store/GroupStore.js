import GroupService from "../services/GroupService.js";

export default {
  state: {
    groups : []
  },
  mutations: {
    // setGroupFilter(state, { filter }) {
    //   state.groupFilter = filter;
    // },
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
    }
  },
  actions: {
    loadGroups(store) {
      console.log("nitzan");

      return GroupService.getGroups().then(groups => {
        console.log("groups", groups);

        store.commit({ type: "setGroups", groups });
      });
    },
    loadGroup(store, { groupId }) {
      return GroupService.getById(groupId).then(group => {
        store.commit({ type: "setSelectedGroup", group });
        return group;
      });
    },
    deleteGroup(store, { groupId }) {
      return GroupService.deleteGroup(groupId).then(() => {
        store.commit({ type: "deleteGroup", groupId });
      });
    },
    saveGroup(store, { group }) {
      const isEdit = !!group.id;
      return GroupService.saveGroup(group).then(group => {
        if (isEdit) store.commit({ type: "updateGroup", group });
        else store.commit({ type: "addGroup", group });
        return group;
      });
    },
    getGroupById(store, { groupId }) {
      return GroupService.getGroupById(groupId).then(group => {
        return group;
      });
    }
  }
};
