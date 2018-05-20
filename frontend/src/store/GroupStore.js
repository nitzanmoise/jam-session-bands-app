import GroupService from "../services/GroupService.js";

export default {
  state: {
    groups: [],
    currGroup: [],
    selectedGroup: null,
    groupFilter: "",
    groupMembers: null
  },
  mutations: {
    removeMember(state, { memberId }) {
      state.selectedGroup.members = state.selectedGroup.members.filter(
        member => member.id !== memberId
      );
    },
    setGroupFilter(state, { filter }) {
      state.groupFilter = filter;
    },
    setGroupMembers(state, { members }) {
      state.groupMembers = members;
    },

    addPost(state, { groupId, newPost }) {
      if (groupId !== state.selectedGroup._id) return;
      state.selectedGroup.posts.push(newPost);
    },
    addAskerToGroupMembers(state, { askerId, groupId }) {
      state.selectedGroup.members.push(askerId);
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
    groupMembersToDisplay(state) {
      return state.groupMembers;
    },
    search(state) {
      var search = group => {
        return group.content.toLowerCase().includes(state.search);
      };
      return search;
    },
    currGroupForDisplay(state) {
      if (!state.selectedGroup) return null;
      if (!state.selectedGroup.posts.length) {
        return state.selectedGroup;
      } else {
        let reversedPosts = state.selectedGroup.posts.slice().reverse();
        let group = { ...state.selectedGroup, posts: reversedPosts };
        return group;
      }
    }
  },
  actions: {
    removeMember(store, { groupId, memberId }) {
      return GroupService.removeMmber(groupId, memberId).then(res => {
        store.commit({ type: "removeMember", memberId });
      });
    },
    loadGroups(store) {
      return GroupService.getGroups(store.state.groupFilter).then(groups => {
        store.commit({ type: "setGroups", groups });
      });
    },
    loadGroup(store, { groupId }) {
      return GroupService.getById(groupId).then(group => {
        store.commit({ type: "setSelectedGroup", group });
        return group;
      });
    },
    addPost(store, { groupId, newPost }) {
      GroupService.addPost(groupId, newPost).then(res => {
        store.commit({ type: "addPost", groupId, newPost });
      });
    },
    deleteGroup(store, { groupId }) {
      return GroupService.deleteGroup(groupId).then(() => {
        store.commit({ type: "deleteGroup", groupId });
      });
    },
    updateGroup(store, { group }) {
      return GroupService.updateGroup(group).then(group => {
        store.commit({ type: "updateGroup", group });
      });
    },
    addGroup(store, { group }) {
      return GroupService.addGroup(group).then(group => {
        store.commit({ type: "addGroup", group });
        return group;
      });
    },
    getGroupMembers(store, { group }) {
      return GroupService.getGroupMembers(group).then(res => {
        let members = res.data;
        store.commit({
          type: "setGroupMembers",
          members
        });

        return members;
      });
    },
    addAskerToGroupMembers(store, { askerId, groupId }) {
      return GroupService.addAskerToGroupMembers(askerId, groupId).then(res => {
        store.commit({ type: "addAskerToGroupMembers", askerId, groupId });
        store.commit({
          type: "addGroupToUser",
          askerId,
          groupId
        });
      });
    },
    getGroupById(store, { groupId }) {
      return GroupService.getGroupById(groupId).then(group => {
        store.commit({ type: "setSelectedGroup", group });
        return group;
      });
    }
  }
};
