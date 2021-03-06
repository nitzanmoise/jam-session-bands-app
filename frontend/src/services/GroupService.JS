let GROUP_URL = "http://localhost:3000/data/group";

if (process.env.NODE_ENV !== "development") {
  GROUP_URL = "/data/group";
}
import axios from "axios";

function emptyGroup() {
  return { name: "", description: "" };
}

function getGroups(filter) {
  return axios
    .get(GROUP_URL)
    .then(res => {
      if (!filter) {
        return res.data;
      } else if (filter === "") {
        return res.data;
      } else {
        return res.data.filter(group => {
          return group.need.some(need => {
            return need.toLowerCase().includes(filter.toLowerCase());
          });
        });
      }
    })
    .catch(e => console.log("No Groups", e));
}

function addAskerToGroupMembers(askerId, groupId) {
  return axios.put(GROUP_URL + "/addMember", { askerId, groupId });
}

function updateGroup(group) {
  return axios
    .put(GROUP_URL + "/" + group._id, group)
    .then(res => {
      return res.data;
    })
    .catch(e => {
      var userMsg = { txt: "Groups Update Failed!", type: "error" };
      EventBusService.$emit(SHOW_MSG, userMsg);
      console.log("Failed to Update", e);
    });
}

function addGroup(group) {
  return axios.post(GROUP_URL, group).then(res => {
    return res.data;
  });
}

function removeMmber(groupId, memberId) {
  return axios.put(_getGroupUrl(groupId) + "/removeMember", { memberId });
}

function deleteGroup(groupId) {
  return axios.delete(_getGroupUrl(groupId));
}

function addPost(groupId, newPost) {
  return axios.put(_getGroupUrl(groupId) + "/addPost", { newPost });
}

function updateReqs(joinReq, admins) {
  console.log("in service");
  return axios.put(_getGroupUrl(joinReq.groupId) + "/joinReq", {
    joinReq,
    admins
  });
}

function getGroupById(groupId) {
  return axios.get(_getGroupUrl(groupId)).then(res => res.data);
}

function _getGroupUrl(groupId) {
  return `${GROUP_URL}/${groupId}`;
}

function getGroupMembers(group) {
  return axios.post(`${GROUP_URL}/members`, group);
}

export default {
  getGroups,
  updateGroup,
  addGroup,
  deleteGroup,
  emptyGroup,
  getGroupById,
  getGroupMembers,
  updateReqs,
  addAskerToGroupMembers,
  addPost,
  removeMmber
};
