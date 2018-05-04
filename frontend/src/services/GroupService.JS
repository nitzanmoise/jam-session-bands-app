const GROUP_URL = 'http://localhost:3000/data/group';
import axios from 'axios'

function emptyGroup() {
    return {"name":"","details":""}
}

function getGroups() {
    // var criteria = {}
    // if (filter){
    //     criteria = `?name=${filter.text || ''}`
    // }
    return axios
            .get(GROUP_URL)
            .then(res => { 
                console.log('this is groups' ,res.data);
                
               return res.data 
            })
            .catch(e => console.log('No Groups', e))
}

function saveGroup(group) {
    if (group._id) return axios.put(GROUP_URL, group)
    else return axios.post(GROUP_URL, group);  
}

function deleteGroup(groupId) {
    return axios.delete(_getGroupUrl(groupId))
}


function getGroupById(groupId) {
    return axios
    .get(_getGroupUrl(groupId))
    .then(res => res.data)
}


function _getGroupUrl(groupId) {
    return `${GROUP_URL}/${groupId}`;
}

function getGroupMembers(group){
    return axios.post(`${GROUP_URL}/members`, group);
}

export default {
    getGroups,
    saveGroup,
    deleteGroup,
    emptyGroup,
    getGroupById,
    getGroupMembers
}