const GROUP_URL = "http://localhost:3000/data/group";
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

function updateGroup(groop) {
    return axios.put(GROUP_URL+'/'+group._id, group)
}

function addGroup(group) {
    return axios.post(GROUP_URL, group).then(res => {
      return res.data
    })  
}

function deleteGroup(groupId) {
  return axios.delete(_getGroupUrl(groupId));
}

function updateReqs(joinReq){
    return axios.put(_getGroupUrl(joinReq.groupId)+'/joinReq', req)
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
    updateReqs
}
