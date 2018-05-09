const USER_URL = "http://localhost:3000/data/user";
import axios from "axios";

function login(user) {
  return axios
    .post("http://localhost:3000/login", user)
    .then(res => {
      sessionStorage.user = JSON.stringify(res.data.user);
      return res.data.user;
    })
    .catch(err => {
      throw new Error("Login Failed");
    });
}

function register(user) {
  return axios
    .post(USER_URL, user)
    .then(res => console.log(res.data))
    .catch(err => {
      throw new Error("Register Failed");
    });
}

function logout() {
  return axios
    .post("http://localhost:3000/logout")
    .then(res => {
      delete sessionStorage.user;
    })
    .catch(err => {
      throw new Error("Logout Failed");
    });
}

function emptyUser() {
  return { name: "", details: "" };
}

function getUsers() {
  // var criteria = {}
  // if (filter){
  //     criteria = `?name=${filter.text || ''}`
  // }
  return axios
    .get(USER_URL)
    .then(res => {
      return res.data;
    })
    .catch(e => console.log("No Users", e));
}

function updateUser(user) {
  return axios.put(USER_UR, user);
}

function deleteUser(userId) {
  return axios.delete(_getUserUrl(userId));
}

function deleteReq(userId, timeStamp) {
  console.log("in user ervice front", userId, timeStamp);

  return axios.put(`${USER_URL}/deleteReq`, { userId, timeStamp });
}

function getUserById(userId) {
  return axios.get(_getUserUrl(userId)).then(res => res.data);
}

function _getUserUrl(userId) {
  return `${USER_URL}/${userId}`;
}

function getUserGroups(user) {
  return axios.post(`${USER_URL}/groups`, user);
}

export default {
  login,
  register,
  logout,
  getUsers,
  updateUser,
  deleteUser,
  emptyUser,
  getUserById,
  getUserGroups,
  deleteReq
};
