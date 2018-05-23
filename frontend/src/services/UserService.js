import axios from "axios";

let USER_URL = `http://localhost:3000/data/user`;

if (process.env.NODE_ENV !== "development") {
  USER_URL = "/data/user";
}

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

function addPost(userId, newPost) {
  return axios.put(_getUserUrl(userId) + "/addPost", { newPost });
}

function sendGroupJoinReq(groupJoinReq) {
  console.log("in service");
  return axios.put(USER_URL + "/groupJoinReq", {
    groupJoinReq
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

function getUsers(filter) {
  return axios
    .get(USER_URL)
    .then(res => {
      if (!filter) {
        return res.data;
      } else if (filter === "") {
        return res.data;
      } else {
        return res.data.filter(user => {
          return user.talants.some(talant => {
            return talant.toLowerCase().includes(filter.toLowerCase());
          });
        });
      }
    })
    .catch(e => console.log("No Groups", e));
}

function updateUser(user) {
  return axios
    .put(USER_URL + "/" + user._id, user)
    .then(res => {
      return res.data;
    })
    .catch(e => {
      var userMsg = { txt: "User Update Failed!", type: "error" };
      EventBusService.$emit(SHOW_MSG, userMsg);
      console.log("Failed to Update", e);
    });
}
function deleteUser(userId) {
  console.log("inside service delete user", userId);
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
  deleteReq,
  sendGroupJoinReq,
  addPost
};
