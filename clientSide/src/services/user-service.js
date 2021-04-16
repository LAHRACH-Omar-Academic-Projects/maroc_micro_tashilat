import axios from "axios";

const API_URL = "http://192.168.43.253:9091/users/";

const getUser = (id) => {
  return axios.get(API_URL + id);
}

const getUsers = () => {
  return axios.get(API_URL + "all")
}

const getUsersByKeyword = (keyword) => {
  return axios.get(API_URL + "search/" + keyword);
}

const updateUser = (userId, username, email, password, agencyName, agencyId, role, online) => {
  return axios.post(API_URL + "saveUser", {
    userId, 
    username, 
    email, 
    password, 
    agencyName, 
    agencyId,
    role,
    online
  })
}

const deleteUser = (userId) => {
  return axios.delete(API_URL + "deleteUser/" + userId);
}

export default {
  getUser,
  getUsers,
  getUsersByKeyword,
  updateUser,
  deleteUser
};
